import { BaseComponent } from '@components/BaseComponent';
import templateHtml from './favorite.handlebars';
import './favorite.less';
import ContentStore from '@store/ContentStore';
import { pageNames } from '@config/pageNames';
import { setupTape } from '@setup/artistSetup';
import { EventTypes } from '@config/EventTypes';
import { Tape } from '@bigComponents/Tape/tape';
import UserActions from '@API/UserActions';

/**
 * Class for favorite artists page
 */
export class FavoriteArtists extends BaseComponent {
    /**
     * Create Favorite Artists page. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place page
     * @param {string} componentName
     */
    constructor(parent, componentName) {
        super(parent, { category: componentName }, templateHtml, componentName);
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
        const artistsTapes = new Tape(element as HTMLElement, setupTape('Artists', 'Favorite artists', artists), 'Artists');
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
        super.appendElement();
        this.subscribeForStores();
        this.actionsOnRender();
        UserActions.favoriteArtists(localStorage.getItem('userId'));

        document.title = 'Favourite Artists';
    }
}
