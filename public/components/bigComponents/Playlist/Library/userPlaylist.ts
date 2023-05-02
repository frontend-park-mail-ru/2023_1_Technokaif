import { Playlist } from '../playlist';
import ApiActions from '../../../../actions/ApiActions';
import { EventTypes } from '../../../../utils/config/EventTypes';
import { pageNames } from '../../../../utils/config/pageNames';
import Actions from '../../../../actions/Actions';
import ContentStore from '../../../../stores/ContentStore';
import { setupPlaylist, setupUserPlaylist } from '../../../../utils/setup/playlistSetup';

export const playlistTypes = {
    USER_PLAYLIST: 'USER_PLAYLIST',
    PLAYLIST: 'PLAYLIST',
};

/**
 * Class of favorite tracks playlist
 */
export class UserPlaylist extends Playlist {
    /**
     * Create playlist. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place favorite tracks
     * @param componentName
     */
    constructor(parent, componentName: string) {
        super(parent, componentName, {});
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
                const userId: string|null = localStorage.getItem('userId');
                if (!userId) {
                    console.error('Cannot get user id');
                    return;
                }

                const numUserId: number = +userId;
                const state = ContentStore.state[pageNames.PLAYLIST];
                if (state.playlist.users.filter((user) => user.id === numUserId).length !== 0) {
                    this.setType(playlistTypes.USER_PLAYLIST);
                    super.setConfig(setupUserPlaylist(state.playlist));
                } else {
                    this.setType(playlistTypes.PLAYLIST);
                    super.setConfig(setupPlaylist(state.playlist));
                }

                this.renderPlaylist();
                ApiActions.playlistTracks(state.id);
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
