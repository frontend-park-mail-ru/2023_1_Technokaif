import { BaseComponent } from '@components/BaseComponent';
import { componentsNames } from '@config/componentsNames';
import { routingUrl } from '@config/routingUrls';
import Router from '@router/Router';

import templateHTML from './libraryList.handlebars';
import './libraryList.less';

/**
 * Create Artist cover
 */
export class LibraryList extends BaseComponent {
    /**
     * Create Artist Cover component.
     * @param {HTMLElement} parent - place where to render
     */
    constructor(parent) {
        super(parent, {}, templateHTML, componentsNames.LIBRARY_LIST);
    }

    /**
     * Function to make routing on buttons
     * @private
     */
    private listenersOnButtons() {
        const parent = document.querySelector(`.${this.name}`)?.parentNode;
        if (!parent) {
            console.error('Error in library list rendering');
            return;
        }
        parent.addEventListener('click', (event) => {
            if (event.target) {
                const element = event.target;
                if (!(element instanceof HTMLElement)) return;
                switch (element.innerText) {
                case 'Tracks':
                    Router.go(routingUrl.LIBRARY_TRACKS);
                    break;
                case 'Artists':
                    Router.go(routingUrl.LIBRARY_ARTISTS);
                    break;
                case 'Albums':
                    Router.go(routingUrl.LIBRARY_ALBUMS);
                    break;
                case 'Playlists':
                    Router.go(routingUrl.LIBRARY_PLAYLISTS);
                    break;
                default:
                }
            }
        });
    }

    /**
     * Function to render component
     */
    override render() {
        const renderProcess = new Promise((resolve) => {
            super.render();
            resolve(true);
        });

        renderProcess.then(() => {
            this.listenersOnButtons();
        });
    }
}
