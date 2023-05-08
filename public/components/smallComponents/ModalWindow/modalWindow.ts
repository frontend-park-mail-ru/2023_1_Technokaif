import { BaseComponent } from '@components/BaseComponent';
import templateHTML from './modalWindow.handlebars';
import './modalWindow.less';
import { componentsJSNames } from '@config/componentsJSNames';
import API from '@store/API';
import { EventTypes } from '@config/EventTypes';
import ContentStore from '@store/ContentStore';
import { pageNames } from '@config/pageNames';
import unsubscribeFromAllStoresOnComponent from '@functions/unsubscribeFromAllStores';
import { METHOD } from '@config/config';
import PlaylistActions from '@API/PlaylistActions';

/**
 * Create element with track-oriented line with img, title, duration, optionally (listens).
 */
export class ModalWindow extends BaseComponent {
    /** Parent element */
    private parent: HTMLDivElement;

    /** Input file for playlist cover */
    private fileInput;

    /** config */
    private configA;

    /**
     * Create Line component.
     * @param {HTMLElement} parent - place where to render
     * @param {JSON} config - to template
     * @param name
     */
    constructor(parent, config, name) {
        super(parent, config, templateHTML, name);
        this.parent = parent;
        this.configA = config;
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
     * Function to add subscribes
     * @private
     */
    private addSubscribes() {
        const modal = document.querySelector(`.${this.name}`);
        const modalButton = document.querySelector('.modal-playlist-button');
        const root = document.querySelector(`#${componentsJSNames.ROOT}`);
        const coverElement: HTMLDivElement|null = document.querySelector('.playlist-cover-img');
        const nameElement: HTMLInputElement|null = document.querySelector('.playlist-name');
        const descriptionElement: HTMLTextAreaElement|null = document.querySelector('.playlist-description');
        const area = document.querySelectorAll('.playlist-description')[1] as HTMLTextAreaElement|null;
        if (!area) { return; }
        area.value = this.configA.textareaValue;

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
        const ff = (event) => {
            const element:HTMLElement = event.target as HTMLElement;
            if (element.classList.contains('headerNameOfElementClass')) {
                return;
            }
            const modal1 = document.querySelector('.modal') as HTMLElement;
            if (!modal1.contains(element) && !modalButton.contains(element)) {
                this.unrenderElement();
                document.removeEventListener(METHOD.BUTTON, ff);
            }
        };

        document.addEventListener('click', ff);

        modalButton.addEventListener(METHOD.BUTTON, (event) => {
            event.preventDefault();
            const nameElement1 = document.querySelector('#name-input') as HTMLTextAreaElement;
            const descriptionElement2 = document.querySelectorAll('.playlist-description');
            const descriptionElement1 = descriptionElement2[1] as HTMLTextAreaElement;

            PlaylistActions.updatePlaylist(ContentStore.state[pageNames.PLAYLIST].id, {
                name: nameElement1.value,
                description: descriptionElement1.value,
                users: ContentStore.state[pageNames.PLAYLIST]
                    .playlist.users.map((element) => element.id),
            });
        });

        coverElement.addEventListener('click', () => {
            // root.appendChild(this.fileInput);
            this.fileInput.click();
        });

        this.fileInput.addEventListener('change', () => {
            const file = this.fileInput.files[0];

            const formData = new FormData();
            formData.append('cover', file);

            PlaylistActions.uploadPlaylistCover(
                ContentStore.state[pageNames.PLAYLIST].id,
                formData,
            );
            // root.removeChild(this.fileInput);
        });

        API.subscribe(
            (message) => {
                if (message !== 'OK') {
                    console.error(message);
                } else {
                    const avatarImg: HTMLImageElement|null = this.parent.querySelector('.playlist-cover-img');
                    if (!avatarImg) {
                        console.error('Error in cover element');
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
     * Function to render Modal Window
     */
    override appendElement() {
        super.appendElement();
        this.addSubscribes();
    }
}
