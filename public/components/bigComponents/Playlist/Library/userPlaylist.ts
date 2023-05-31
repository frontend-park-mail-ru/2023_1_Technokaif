import { EventTypes } from '@config/EventTypes';
import { pageNames } from '@config/pageNames';
import {
    playlistTypes, setupModalWindow,
    setupPlaylist,
    setupUserPlaylist,
} from '@setup/playlistSetup';
import { componentsJSNames } from '@config/componentsJSNames';
import { ModalWindow } from '@smallComponents/ModalWindow/modalWindow';
import { componentsNames } from '@config/componentsNames';
import { routingUrl } from '@config/routingUrls';
import PlaylistActions from '@API/PlaylistActions';
import API from '@store/API';
import ContentStore from '@store/ContentStore';
import Actions from '@actions/Actions';
import Router from '@router/Router';
import { PlaylistContent } from '@api/playlists/createPlaylistAjaxRequest';
import { runAfterFramePaint } from '@functions/renderAfterPaintDone';
import { SearchContent } from '@bigComponents/searchContent/searchContent';
import SearchActions from '@API/SearchActions';
import { Notification, TypeOfNotification } from '@smallComponents/notification/notification';
import { Playlist } from '../playlist';

/**
 * Class of favorite tracks playlist
 */
export class UserPlaylist extends Playlist {
    /** Input file for playlist cover */
    private fileInput: HTMLInputElement;

    /**
     * Create playlist. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place favorite tracks
     * @param componentName
     */
    constructor(parent, componentName: string) {
        super(parent, componentName, {});
        this.fileInput = document.createElement('input');
        this.fileInput.setAttribute('type', 'file');
        this.fileInput.setAttribute('id', 'file');
        this.fileInput.style.display = 'none';
    }

    /**
     * Function to render modal window
     * @private
     */
    private callModalWindow() {
        const root = document.querySelector(`#${componentsJSNames.ROOT}`);

        const { playlist } = ContentStore.state[pageNames.PLAYLIST];
        const modalWindow = new ModalWindow(root, setupModalWindow(playlist), componentsNames.PLAYLIST_MODAL_WINDOW);
        modalWindow.appendElement();
    }

    /**
     * Error rendering notification
     * @param text
     * @private
     */
    private renderErrorNotification(text: string) {
        const notification = new Notification(
            document.querySelector('.js__navbar'),
            text,
            'image-error',
            TypeOfNotification.failure,
        );
        notification.appendElement();
    }

    /**
     * Function to set listeners
     * @private
     */
    private setListeners() {
        const root = document.querySelector(`#${componentsJSNames.ROOT}`);
        const coverElement: HTMLDivElement|null = document.querySelector('.cover');
        const nameElement: HTMLDivElement|null = document.querySelector('.headerNameOfElementClass');
        const descriptionElement: HTMLDivElement|null = document.querySelector('.js__description-album');
        const deleteElement: HTMLDivElement|null = document.querySelector('.playlist-delete');
        if (!root || !coverElement || !nameElement || !descriptionElement || !deleteElement) {
            console.error('Cannot get cover element');
            return;
        }

        deleteElement.addEventListener('click', () => {
            PlaylistActions.deletePlaylist(ContentStore.state[pageNames.PLAYLIST].id);
        });

        coverElement.addEventListener('click', () => {
            root.appendChild(this.fileInput);
            this.fileInput.click();
        });

        this.fileInput.addEventListener('change', () => {
            // @ts-ignore
            const file: File = this.fileInput.files[0];

            if (!file) {
                console.error('Invalid photo');
                this.renderErrorNotification('Invalid photo');
                return;
            }

            const fileSizeLimit = 5 * 1024 * 1024;
            const allowedExtensions = ['jpg', 'jpeg', 'png'];

            if (file.size > fileSizeLimit) {
                console.error('Invalid photo size');
                this.renderErrorNotification('Invalid photo size');
                return;
            }

            // @ts-ignore
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                console.error('Invalid photo extension');
                this.renderErrorNotification('Invalid photo extension');
                return;
            }

            const formData = new FormData();
            // @ts-ignore
            formData.append('cover', file);

            PlaylistActions.uploadPlaylistCover(ContentStore.state[pageNames.PLAYLIST].id, formData);
            root.removeChild(this.fileInput);
        });

        coverElement.addEventListener('click', () => this.callModalWindow());
        nameElement.addEventListener('click', () => this.callModalWindow());
        descriptionElement.addEventListener('click', () => this.callModalWindow());
    }

    /**
     * Function to make some internal actions
     * @private
     */
    private subscribes() {
        API.subscribe(
            () => {
                Router.go(routingUrl.LIBRARY_PLAYLISTS);
            },
            EventTypes.DELETED_PLAYLIST,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                const { id } = ContentStore.state[pageNames.PLAYLIST];

                if (id !== undefined) {
                    PlaylistActions.playlist(id);
                }
            },
            EventTypes.ID_CAN_BE_VIEWED,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                const userId: string|null = localStorage.getItem('userId');
                if (!userId) {
                    console.error('Cannot get user id');
                    return;
                }
                const numUserId = Number(userId);

                const state = ContentStore.state[pageNames.PLAYLIST];
                if (state.playlist.users.find((user) => user.id === numUserId)) {
                    this.setType(playlistTypes.USER_PLAYLIST);
                    super.setConfig(setupUserPlaylist(state.playlist));
                } else {
                    this.setType(playlistTypes.PLAYLIST);
                    super.setConfig(setupPlaylist(state.playlist));
                }

                const pr = new Promise((resolve) => {
                    this.renderPlaylist();
                    if (this.type === playlistTypes.USER_PLAYLIST) {
                        runAfterFramePaint(() => {
                            const placeSearch = document.querySelector('.js__placement__search');
                            if (!placeSearch) {
                                console.error('Error at finding place for search in playlist');
                                return;
                            }

                            const textOfSearch = document.createElement('p');
                            textOfSearch.classList.add('usualText');
                            textOfSearch.style.paddingBottom = '5px';
                            textOfSearch.innerText = 'Search for tracks to add';
                            placeSearch.appendChild(textOfSearch);

                            new SearchContent(
                                placeSearch,
                                componentsNames.SEARCH_LINE,
                                'playlist',
                                { mainDiv: 'search-content search-content-embedded' },
                                (value) => {
                                    if (value === '') {
                                        SearchActions.emptySearch();
                                        return;
                                    }

                                    SearchActions.searchTracks(value);
                                },
                            ).render();
                        });
                    }
                    resolve(true);
                });
                pr.then(() => {
                    PlaylistActions.playlistTracks(state.id);
                    this.setListeners();
                });
            },
            EventTypes.GOT_PLAYLIST,
            this.name,
        );

        API.subscribe(
            (message: string, playlistData: PlaylistContent) => {
                if (message !== 'OK') {
                    console.error('Error in playlist update api');
                    return;
                }

                const nameElement: HTMLDivElement|null = document.querySelector('.headerNameOfElementClass');
                const descriptionElement: HTMLDivElement|null = document.querySelector('.js__description-album');
                if (!nameElement || !descriptionElement) {
                    console.error('Cannot get name or description element');
                    return;
                }

                nameElement.innerText = playlistData.name;
                descriptionElement.innerText = playlistData.description;
            },
            EventTypes.UPDATED_PLAYLIST,
            this.name,
        );

        API.subscribe(
            (message, playlistId) => {
                if (message !== 'OK') {
                    console.error(message);
                } else {
                    PlaylistActions.playlistTracks(playlistId);
                }
            },
            EventTypes.ADDED_TRACK_IN_PLAYLIST,
            this.name,
        );

        API.subscribe(
            (message, cover) => {
                if (message !== 'OK') {
                    console.error(message);
                } else {
                    const avatarImg: HTMLImageElement|null = this.parent.querySelector('.user-profile__img');
                    if (!avatarImg) {
                        console.error('Error in avatar element');
                        return;
                    }
                    // @ts-ignore
                    const blob = new Blob([cover], { type: 'image/jpeg' });
                    const imageUrl = URL.createObjectURL(blob);
                    avatarImg.src = imageUrl;
                }
            },
            EventTypes.UPLOADED_PLAYLIST_COVER,
            this.name,
        );
    }

    /**
     * Function to render favorite tracks
     */
    override render() {
        Actions.checkID(pageNames.PLAYLIST);
        this.subscribes();
        super.subscribeBaseLogic(EventTypes.GOT_PLAYLIST_TRACKS, pageNames.PLAYLIST);
        document.title = 'Playlist';
    }
}
