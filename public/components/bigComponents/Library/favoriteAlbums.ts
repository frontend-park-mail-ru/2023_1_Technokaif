import { BaseComponent } from '../../BaseComponent';
import templateHtml from './favorite.handlebars';
import './favorite.less';
import ApiActions from '../../../actions/ApiActions';
import ContentStore from '../../../stores/ContentStore';
import { pageNames } from '@config/pageNames';
import { setupTape } from '@setup/artistSetup';
import { EventTypes } from '@config/EventTypes';
import { Tape } from '../Tape/tape';

/**
 * Class for favorite albums page
 */
export class FavoriteAlbums extends BaseComponent {
    /**
     * Create Favorite Album page. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place page
     * @param {string} componentName
     */
    constructor(parent, componentName) {
        super(parent, { category: componentName }, templateHtml, componentName);
    }

    /**
     * Method to render tape of artists
     * @param albums
     * @private
     */
    private renderTape(albums) {
        const element = document.querySelector(`.${this.name}`);
        if (!element) {
            return;
        }
        const albumsTapes = new Tape(element as HTMLElement, setupTape('Albums', 'Favorite albums', albums), 'Albums');
        albumsTapes.appendElement();
    }

    /**
     * Method to subscribe on tape data fill
     * @private
     */
    private subscribeForStores() {
        ContentStore.subscribe(
            (instance) => {
                const artists = ContentStore.state[pageNames.LIBRARY_ALBUMS][instance];
                this.renderTape(artists);
            },
            EventTypes.GOT_FAVORITE_ALBUMS,
            this.name,
        );
    }

    /**
     * Function to make some internal actions
     * @private
     */
    private actionsOnRender() {
        const navbarElements = document.querySelectorAll('.library-list__item');
        navbarElements.forEach((element) => {
            if (element.classList.contains('library-list__albums')) {
                element.classList.add('library-active');
            } else {
                element.classList.remove('library-active');
            }
        });
    }

    /**
     * Base function to render page
     */
    renderFavoriteAlbums() {
        const renderProcess = new Promise((resolve) => {
            super.appendElement();
            resolve(true);
        });

        renderProcess.then(() => {
            this.subscribeForStores();
            this.actionsOnRender();
            ApiActions.favoriteAlbums(localStorage.getItem('userId'));
        });

        document.title = 'Favourite Albums';
    }
}
