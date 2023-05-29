import { BaseComponent } from '@components/BaseComponent';
import templateHtml from './favorite.handlebars';
import './favorite.less';
import { pageNames } from '@config/pageNames';
import { BaseComponentInTape, setupTape } from '@setup/artistSetup';
import { EventTypes } from '@config/EventTypes';
import UserActions from '@API/UserActions';
import { Tape } from '@bigComponents/Tape/tape';
import ContentStore from '@store/ContentStore';

const playlistsTypes = {
    PERSONAL_PLAYLISTS: 'Your playlists',
    FAVORITE_PLAYLISTS: 'Favorite playlists',
};

/**
 * Class for favorite playlists page
 */
export class LibraryPlaylists extends BaseComponent {
    /**
     * Create Favorite playlists page. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place page
     * @param {string} componentName
     */
    constructor(parent, componentName) {
        super(parent, { category: componentName }, templateHtml, componentName);
    }

    /**
     * Method to render tape of playlists
     * @private
     * @param playlists
     * @param name
     */
    private renderTape(playlists: BaseComponentInTape[], name: string) {
        let element: HTMLDivElement;
        let textForNothing = '';
        if (name === playlistsTypes.PERSONAL_PLAYLISTS) {
            textForNothing = 'No personal playlists';
            element = document.querySelector('.js__user-playlists-placement') as HTMLDivElement;
        } else {
            textForNothing = 'No liked playlists';
            element = document.querySelector('.js__favorite-playlists-placement') as HTMLDivElement;
        }
        const nothingPlacement = document.querySelector('.js__placement-nothing');
        if (!element || !nothingPlacement) {
            return;
        }
        if (playlists.length === 0) {
            element.innerHTML = '';
        }

        if (playlists.length === 0) {
            const nothingElements = nothingPlacement.querySelectorAll('.library__nothing-text');
            let indexOfSimilar = -1;
            for (let i = 0; i < nothingElements.length; i++) {
                // @ts-ignore
                if (nothingElements[i].textContent === textForNothing) {
                    indexOfSimilar = i;
                }
            }

            if (indexOfSimilar === -1 && nothingPlacement.children.length < 2) {
                const textOfNothing = document.createElement('p');
                textOfNothing.innerText = textForNothing;
                textOfNothing.classList.add('library__nothing-text');
                nothingPlacement.appendChild(textOfNothing);
                return;
            }
        }

        if (playlists.length) {
            nothingPlacement.innerHTML = '';
        } else {
            return;
        }
        if (!element) {
            return;
        }
        const artistsTapes = new Tape(element, setupTape('Playlists', name, playlists), 'Playlists');
        artistsTapes.appendElement();
    }

    /**
     * Method to subscribe on tape data fill
     * @private
     */
    private subscribeForStores() {
        ContentStore.subscribe(
            (instance) => {
                const element: HTMLDivElement|null = document.querySelector('.js__user-playlists-placement');
                if (element?.children.length) {
                    return;
                }
                const playlists = ContentStore.state[pageNames.LIBRARY_PLAYLISTS][instance];
                this.renderTape(playlists, playlistsTypes.PERSONAL_PLAYLISTS);
                UserActions.userFavoritePlaylists(localStorage.getItem('userId'));
            },
            EventTypes.GOT_USER_PLAYLISTS,
            this.name,
        );

        ContentStore.subscribe(
            (instance) => {
                const element: HTMLDivElement|null = document.querySelector('.js__favorite-playlists-placement');
                if (element?.children.length) {
                    return;
                }
                const playlists = ContentStore.state[pageNames.LIBRARY_PLAYLISTS][instance];
                this.renderTape(playlists, playlistsTypes.FAVORITE_PLAYLISTS);
            },
            EventTypes.GOT_FAVORITE_PLAYLISTS,
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
            if (element.classList.contains('library-list__playlists')) {
                element.classList.add('library-active');
            } else {
                element.classList.remove('library-active');
            }
        });
        // const elementForDivider = document.querySelector('.js__divider__placement');
        // elementForDivider?.classList.add('divider');
    }

    /**
     * Base function to render page
     */
    renderFavoritePlaylists() {
        super.appendElement();
        this.subscribeForStores();
        this.actionsOnRender();
        UserActions.userPlaylists(localStorage.getItem('userId'));

        document.title = 'Favourite Playlists';
    }
}
