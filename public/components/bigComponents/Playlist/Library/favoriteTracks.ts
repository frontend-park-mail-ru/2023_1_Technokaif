import { setupLibraryTracks } from '@setup/libraryTracksSetup';
import { EventTypes } from '@config/EventTypes';
import { pageNames } from '@config/pageNames';
import UserActions from '@API/UserActions';
import { runAfterFramePaint } from '@functions/renderAfterPaintDone';
import { SearchContent } from '@bigComponents/searchContent/searchContent';
import { componentsNames } from '@config/componentsNames';
import SearchActions from '@API/SearchActions';
import { Playlist } from '../playlist';

/**
 * Class of favorite tracks playlist
 */
export class FavoriteTracks extends Playlist {
    /**
     * Create Favorite tracks. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place favorite tracks
     * @param {string} componentName
     */
    constructor(parent, componentName) {
        super(parent, componentName, setupLibraryTracks());
    }

    /**
     * Function to make some internal actions
     * @private
     */
    private actionsOnRender() {
        const navbarElements = document.querySelectorAll('.library-list__item');
        navbarElements.forEach((element) => {
            if (element.classList.contains('library-list__tracks')) {
                element.classList.add('library-active');
            } else {
                element.classList.remove('library-active');
            }
        });
    }

    /**
     * Function to render favorite tracks
     */
    renderFavoriteTracks() {
        const renderProcess = new Promise((resolve) => {
            super.renderPlaylist();
            runAfterFramePaint(() => {
                const placeSearch = document.querySelector('.js__placement__search');
                if (!placeSearch) {
                    console.error('Error at finding place for search in playlist');
                    return;
                }

                const textOfSearch = document.createElement('p');
                textOfSearch.classList.add('usualText');
                textOfSearch.style.paddingBottom = '5px';
                textOfSearch.innerText = 'Search for tracks to add';
                placeSearch.appendChild(textOfSearch);

                new SearchContent(
                    placeSearch,
                    componentsNames.SEARCH_LINE,
                    'favorite',
                    { mainDiv: 'search-content search-content-embedded' },
                    (value) => {
                        if (value === '') {
                            SearchActions.emptySearch();
                            return;
                        }

                        SearchActions.searchTracks(value);
                    },
                ).render();
            });
            resolve(true);
        });

        renderProcess.then(() => {
            UserActions.favoriteTracks(localStorage.getItem('userId'));
            this.actionsOnRender();
            super.subscribeBaseLogic(EventTypes.GOT_FAVORITE_TRACKS, pageNames.LIBRARY_TRACKS);
        });
        document.title = 'Favourite Tracks';
    }
}
