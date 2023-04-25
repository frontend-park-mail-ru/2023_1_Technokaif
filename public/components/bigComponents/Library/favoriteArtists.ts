import { BaseComponent } from '../../BaseComponent';
import templateHtml from './favorite.handlebars';
import './favorite.less';
import ApiActions from '../../../actions/ApiActions';
import ContentStore from '../../../stores/ContentStore';
import { pageNames } from '../../../utils/config/pageNames';
import { setupTape } from '../../../utils/setup/artistSetup';
import { EventTypes } from '../../../utils/config/EventTypes';
import { Tape } from '../Tape/tape';
import { componentsNames } from '../../../utils/config/componentsNames';

/**
 * Class for favorite artists page
 */
export class FavoriteArtists extends BaseComponent {
    /**
     * Parent where to render
     */
    // @ts-ignore
    private parent : Element;

    /**
     * Create Favorite Artists page. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place page
     * @param {string} componentName
     */
    constructor(parent, componentName) {
        super(parent, { category: componentName }, templateHtml, componentName);
        this.parent = parent;
    }

    /**
     * Method to render tape of artists
     * @param artists
     * @private
     */
    private renderTape(artists) {
        const element = document.querySelector(`.${this.name}`);
        if (!element) {
            return;
        }
        const artistsTapes = new Tape(element as HTMLElement, setupTape('Favorite artists', artists), componentsNames.FAVORITE_ARTISTS_TAPE);
        artistsTapes.appendElement();
    }

    /**
     * Method to subscribe on tape data fill
     * @private
     */
    private subscribeForStores() {
        ContentStore.subscribe(
            (instance) => {
                const artists = ContentStore.state[pageNames.LIBRARY_ARTISTS][instance];
                this.renderTape(artists);
            },
            EventTypes.GOT_FAVORITE_ARTISTS,
            // @ts-ignore
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
            if (element.classList.contains('library-list__artists')) {
                element.classList.add('library-active');
            } else {
                element.classList.remove('library-active');
            }
        });
    }

    /**
     * Base function to render page
     */
    renderFavoriteArtists() {
        const renderProcess = new Promise((resolve) => {
            super.appendElement();
            resolve(true);
        });

        renderProcess.then(() => {
            this.subscribeForStores();
            this.actionsOnRender();
            ApiActions.favoriteArtists(localStorage.getItem('userId'));
        });
    }
}
