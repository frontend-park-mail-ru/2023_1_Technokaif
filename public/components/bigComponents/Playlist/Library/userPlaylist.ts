import { Playlist } from '../playlist';
import ApiActions from '../../../../actions/ApiActions';
import { EventTypes } from '../../../../utils/config/EventTypes';
import { pageNames } from '../../../../utils/config/pageNames';
import Actions from '../../../../actions/Actions';
import ContentStore from '../../../../stores/ContentStore';
import {
    playlistTypes, setupModalWindow,
    setupPlaylist,
    setupUserPlaylist,
} from '../../../../utils/setup/playlistSetup';
import API from '../../../../stores/API';
import { componentsJSNames } from '../../../../utils/config/componentsJSNames';
import { ModalWindow } from '../../../smallComponents/ModalWindow/modalWindow';
import { componentsNames } from '../../../../utils/config/componentsNames';

/**
 * Class of favorite tracks playlist
 */
export class UserPlaylist extends Playlist {
    /** Parent element */
    private parent: HTMLDivElement;

    /** Input file for playlist cover */
    private fileInput;

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
        console.log(ContentStore.state[pageNames.PLAYLIST].playlist);
        const modalWindow = new ModalWindow(root, setupModalWindow(ContentStore.state[pageNames.PLAYLIST].playlist), componentsNames.PLAYLIST_MODAL_WINDOW);
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
        const descriptionElement: HTMLDivElement|null = document.querySelector('.author__place');
        if (!root || !coverElement || !nameElement || !descriptionElement) {
            console.error('Cannot get cover element');
            return;
        }

        coverElement.addEventListener('click', () => {
            root.appendChild(this.fileInput);
            this.fileInput.click();
        });

        this.fileInput.addEventListener('change', () => {
            const file = this.fileInput.files[0];

            const formData = new FormData();
            formData.append('cover', file);

            ApiActions.uploadPlaylistCover(ContentStore.state[pageNames.PLAYLIST].id, formData);
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
        ContentStore.subscribe(
            () => {
                const { id } = ContentStore.state[pageNames.PLAYLIST];

                if (id !== undefined) {
                    ApiActions.playlist(id);
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

                const numUserId: number = +userId;
                const state = ContentStore.state[pageNames.PLAYLIST];
                if (state.playlist.users.filter((user) => user.id === numUserId).length !== 0) {
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
                    ApiActions.playlistTracks(state.id);
                    this.setListeners();
                });
            },
            EventTypes.GOT_PLAYLIST,
            this.name,
        );

        API.subscribe(
            (message) => {
                if (message !== 'OK') {
                    console.error(message);
                } else {
                    const avatarImg: HTMLImageElement|null = this.parent.querySelector('.user-profile__img');
                    if (!avatarImg) {
                        console.error('Error in avatar element');
                        return;
                    }
                    const blob = new Blob(this.fileInput.files, { type: 'image/jpeg' });
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
