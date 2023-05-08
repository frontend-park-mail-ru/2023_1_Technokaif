import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';

/** Work with artist */
class ApiArtistActions {
    /** Artist Page */
    artist(id) {
        Dispatcher.dispatch({
            type: ActionTypes.ARTIST,
            id,
        });
    }

    /** Get Artist albums */
    artistAlbums(id) {
        Dispatcher.dispatch({
            type: ActionTypes.ARTIST_ALBUMS,
            id,
        });
    }

    /** Get Artist tracks */
    artistTracks(id) {
        Dispatcher.dispatch({
            type: ActionTypes.ARTIST_TRACKS,
            id,
        });
    }

    /** Like artist */
    likeArtist(id) {
        Dispatcher.dispatch({
            type: ActionTypes.LIKE_ARTIST,
            id,
        });
    }

    /** Unlike artist */
    unLikeArtist(id) {
        Dispatcher.dispatch({
            type: ActionTypes.UNLIKE_ARTIST,
            id,
        });
    }
}

export default new ApiArtistActions();
