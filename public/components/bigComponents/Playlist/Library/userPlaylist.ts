import { Playlist } from '../playlist';
import ApiActions from '../../../../actions/ApiActions';
import { EventTypes } from '../../../../utils/config/EventTypes';
import { pageNames } from '../../../../utils/config/pageNames';
import Actions from '../../../../actions/Actions';
import ContentStore from '../../../../stores/ContentStore';
import { setupPlaylist } from '../../../../utils/setup/playlistSetup';

export const playlistTypes = {
    USER_PLAYLIST: 'USER_PLAYLIST',
    PLAYLIST: 'PLAYLIST',
};

/**
 * Class of favorite tracks playlist
 */
export class UserPlaylist extends Playlist {
    /**
     * Type of playlist
     * @private
     */
    // @ts-ignore
    private type: string;

    /**
     * Create playlist. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place favorite tracks
     * @param componentName
     * @param type
     */
    constructor(parent, componentName: string, type: string) {
        super(parent, componentName, {});

        this.type = type;
    }

    /**
     * Function to make some internal actions
     * @private
     */
    private subscribes() {
        ContentStore.subscribe(
            () => {
                const { id } = ContentStore.state[pageNames.PLAYLIST];

                if (id !== undefined) {
                    ApiActions.playlist(id);
                }
            },
            EventTypes.ID_CAN_BE_VIEWED,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                const state = ContentStore.state[pageNames.PLAYLIST];
                super.setConfig(setupPlaylist(state.playlist));
                super.render();

                if (state.playlist !== undefined) {
                    ApiActions.playlistTracks(state.id);
                }
            },
            EventTypes.GOT_PLAYLIST,
            this.name,
        );
    }

    /**
     * Function to render favorite tracks
     */
    override render() {
        Actions.checkID(pageNames.PLAYLIST);
        this.subscribes();
        super.subscribeBaseLogic(EventTypes.GOT_PLAYLIST_TRACKS, pageNames.PLAYLIST);
        document.title = 'Playlist';
    }
}
