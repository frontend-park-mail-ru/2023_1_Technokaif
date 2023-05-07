import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';

class ApiAlbumActions {
    /** Get one album by it id */
    getAlbum(id) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_ALBUM,
            id,
        });
        Dispatcher.dispatch({
            type: ActionTypes.GET_ALBUM_TRACKS,
            id,
        });
    }

    /** Like album */
    likeAlbum(id) {
        Dispatcher.dispatch({
            type: ActionTypes.LIKE_ALBUM,
            id,
        });
    }

    /** Unlike album */
    unLikeAlbum(id) {
        Dispatcher.dispatch({
            type: ActionTypes.UNLIKE_ALBUM,
            id,
        });
    }
}

export default new ApiAlbumActions();
