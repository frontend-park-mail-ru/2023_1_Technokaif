import { BaseComponent } from '@components/BaseComponent';
import { componentsJSNames } from '@config/componentsJSNames';
import API from '@store/API';
import { EventTypes } from '@config/EventTypes';
import ContentStore from '@store/ContentStore';
import { pageNames } from '@config/pageNames';
import unsubscribeFromAllStoresOnComponent from '@functions/unsubscribeFromAllStores';
import { METHOD } from '@config/config';
import PlaylistActions from '@API/PlaylistActions';

import templateHTML from './modalWindow.handlebars';
import './modalWindow.less';

/**
 * Create element with track-oriented line with img, title, duration, optionally (listens).
 */
export class ModalWindow extends BaseComponent {
    /** Input file for playlist cover */
    private fileInput;

    /**
     * Create Line component.
     * @param {HTMLElement} parent - place where to render
     * @param {JSON} config - to template
     * @param name
     */
    constructor(parent, config, name) {
        super(parent, config, templateHTML, name);
        this.fileInput = document.createElement('input');
        this.fileInput.setAttribute('type', 'file');
        this.fileInput.setAttribute('id', 'file');
        this.fileInput.style.display = 'none';
    }

    /**
     * Function to unrender modal window
     * @private
     */
    private unrenderElement() {
        unsubscribeFromAllStoresOnComponent(this.name);
        const element = document.querySelector('.modal-overlay');
        if (!element) {
            console.error('Cannot get element on modal window');
            return;
        }

        element.remove();
    }

    /**
     * Method to use like callback for inputs
     * @param event
     * @param nameElement
     * @param descriptionElement
     * @private
     */
    private updatePlaylistData(event, nameElement: HTMLInputElement|undefined, descriptionElement: HTMLTextAreaElement|undefined) {
        event.preventDefault();

        if (!nameElement || !descriptionElement) {
            console.error('Cannot get element on modal window');
            return;
        }

        PlaylistActions.updatePlaylist(ContentStore.state[pageNames.PLAYLIST].id, {
            name: nameElement.value,
            description: descriptionElement.value.trim(),
            users: ContentStore.state[pageNames.PLAYLIST]
                .playlist.users.map((element) => element.id),
        });
    }

    /**
     * Function to add subscribes
     * @private
     */
    private addSubscribes() {
        const modal = document.querySelector(`.${this.name}`);
        const modalButton = document.querySelector('.modal-playlist-button');
        const root = document.querySelector(`#${componentsJSNames.ROOT}`);
        const coverElement: Element|undefined = document.getElementsByClassName('playlist-cover-img')[0];
        const nameElement: Element|undefined = document.getElementsByClassName('playlist-name-input')[0];
        const descriptionElement: Element|undefined = document.getElementsByClassName('playlist-description-input')[0];

        coverElement?.appendChild(this.fileInput);
        if (!root
            || !coverElement
            || !modalButton
            || !modal
            || !nameElement
            || !descriptionElement) {
            console.error('Cannot get element on modal window');
            return;
        }

        // we append file input there because it could be removed from ff callback on close
        root.appendChild(this.fileInput);

        const avatarImg: HTMLImageElement|null = this.parent.querySelector('.user-profile__img');
        if (!avatarImg) {
            console.error('Error in avatar element');
            return;
        }

        (coverElement as HTMLImageElement).src = avatarImg.src;

        const ff = (event) => {
            const element:HTMLElement = event.target as HTMLElement;
            if (element.classList.contains('headerNameOfElementClass') || element.classList.contains('js__description-album') || element.id === 'file') {
                return;
            }
            const modal1 = document.querySelector('.modal') as HTMLElement;
            if (!modal1.contains(element) && !modalButton.contains(element)) {
                this.unrenderElement();
                root.removeChild(this.fileInput);
                document.removeEventListener(METHOD.BUTTON, ff);
            }
        };

        document.addEventListener('click', ff);

        modalButton.addEventListener(METHOD.BUTTON, (event) => {
            this.updatePlaylistData(
                event,
                nameElement as HTMLInputElement,
                descriptionElement as HTMLTextAreaElement,
            );

            this.unrenderElement();
            document.removeEventListener(METHOD.BUTTON, ff);
            root.removeChild(this.fileInput);
        });

        modal.addEventListener(METHOD.FORM, (event) => {
            this.updatePlaylistData(
                event,
                nameElement as HTMLInputElement,
                descriptionElement as HTMLTextAreaElement,
            );

            this.unrenderElement();
            document.removeEventListener(METHOD.BUTTON, ff);
            root.removeChild(this.fileInput);
        });

        coverElement.addEventListener('click', () => {
            this.fileInput.click();
        });

        this.fileInput.addEventListener('change', () => {
            const formData = new FormData();
            formData.append('cover', this.fileInput.files[0]);

            PlaylistActions.uploadPlaylistCover(
                ContentStore.state[pageNames.PLAYLIST].id,
                formData,
            );
        });

        API.subscribe(
            (message) => {
                if (message !== 'OK') {
                    console.error(message);
                } else {
                    const playlistImg: HTMLImageElement|null = this.parent.querySelector('.playlist-cover-img');
                    if (!playlistImg) {
                        console.error('Error in cover element');
                        return;
                    }
                    const blob = new Blob(this.fileInput.files, { type: 'image/jpeg' });
                    const imageUrl = URL.createObjectURL(blob);
                    playlistImg.src = imageUrl;
                }
            },
            EventTypes.UPLOADED_PLAYLIST_COVER,
            this.name,
        );
    }

    /**
     * Function to render Modal Window
     */
    override appendElement() {
        super.appendElement();
        this.addSubscribes();
    }
}
