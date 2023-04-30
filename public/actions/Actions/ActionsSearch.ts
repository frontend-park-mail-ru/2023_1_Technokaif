import Dispatcher from '../../dispatcher/Dispatcher';
import ActionTypes from '../ActionTypes';

/** Global Action creator object. */
const ActionsSearch = {
    /** Albums found by search */
    gotAlbums(albums) {
        Dispatcher.dispatch({
            // @ts-ignore
            type: ActionTypes.GOT_ALBUMS_SEARCH,
            albums,
        });
    },

    /** Tracks found by search */
    gotTracks(tracks) {
        Dispatcher.dispatch({
            // @ts-ignore
            type: ActionTypes.GOT_TRACKS_SEARCH,
            tracks,
        });
    },

    /** Artists found by search */
    gotArtists(artists) {
        Dispatcher.dispatch({
            // @ts-ignore
            type: ActionTypes.GOT_ARTISTS_SEARCH,
            artists,
        });
    },
};

export default ActionsSearch;
