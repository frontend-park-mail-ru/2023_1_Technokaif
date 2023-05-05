import { setupLibraryTracks } from '@setup/libraryTracksSetup';
import { EventTypes } from '@config/EventTypes';
import { pageNames } from '@config/pageNames';
import ApiActions from '../../../../actions/ApiActions';
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
            resolve(true);
        });

        renderProcess.then(() => {
            ApiActions.favoriteTracks(localStorage.getItem('userId'));
            this.actionsOnRender();
            super.subscribeBaseLogic(EventTypes.GOT_FAVORITE_TRACKS, pageNames.LIBRARY_TRACKS);
        });
        document.title = 'Favourite Tracks';
    }
}
