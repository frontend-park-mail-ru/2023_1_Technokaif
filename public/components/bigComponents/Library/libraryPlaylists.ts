import { BaseComponent } from '../../BaseComponent';
import templateHtml from './favorite.handlebars';
import './favorite.less';
import ApiActions from '../../../actions/ApiActions';
import ContentStore from '../../../stores/ContentStore';
import { pageNames } from '../../../utils/config/pageNames';
import { setupTape } from '../../../utils/setup/artistSetup';
import { EventTypes } from '../../../utils/config/EventTypes';
import { Tape } from '../Tape/tape';

/**
 * Class for favorite playlists page
 */
export class LibraryPlaylists extends BaseComponent {
    /**
     * Parent where to render
     */
    // @ts-ignore
    private parent : Element;

    /**
     * Create Favorite playlists page. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place page
     * @param {string} componentName
     */
    constructor(parent, componentName) {
        super(parent, { category: componentName }, templateHtml, componentName);
        this.parent = parent;
    }

    /**
     * Method to render tape of playlists
     * @private
     * @param playlists
     */
    private renderTape(playlists) {
        const element = document.querySelector(`.${this.name}`);
        if (!element) {
            return;
        }
        const artistsTapes = new Tape(element as HTMLElement, setupTape('Playlists', playlists), 'Playlists');
        artistsTapes.appendElement();
    }

    /**
     * Method to subscribe on tape data fill
     * @private
     */
    private subscribeForStores() {
        ContentStore.subscribe(
            (instance) => {
                const playlists = ContentStore.state[pageNames.LIBRARY_PLAYLISTS][instance];
                this.renderTape(playlists);
            },
            EventTypes.GOT_USER_PLAYLISTS,
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
            ApiActions.userPlaylists(localStorage.getItem('userId'));
        });

        document.title = 'Favourite Artists';
    }
}
