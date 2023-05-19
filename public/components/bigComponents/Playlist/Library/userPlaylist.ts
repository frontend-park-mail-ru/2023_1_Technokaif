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
import { Playlist } from '../playlist';

/**
 * Class of favorite tracks playlist
 */
export class UserPlaylist extends Playlist {
    /** Parent element */
    private parent: HTMLDivElement;

    /** Input file for playlist cover */
    private fileInput: HTMLInputElement;

    /**
     * Create playlist. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place favorite tracks
     * @param componentName
     */
    constructor(parent, componentName: string) {
        super(parent, componentName, {});
        this.parent = parent;
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
            const file = this.fileInput.files[0];

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
