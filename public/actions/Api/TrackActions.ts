import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';

/** Tracks Actions */
class ApiTrackActions {
    /** Like track */
    likeTrack(id) {
        Dispatcher.dispatch({
            type: ActionTypes.LIKE_TRACK,
            id,
        });
    }

    /** Dislike track */
    unlikeTrack(id) {
        Dispatcher.dispatch({
            type: ActionTypes.UNLIKE_TRACK,
            id,
        });
    }
}

export default new ApiTrackActions();
