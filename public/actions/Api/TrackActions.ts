import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';

/** Tracks Actions */
class ApiTrackActions {
    /** Get track
     * @param id
     */
    getTrack(id: string) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_TRACK,
            id,
        });
    }

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

    /** Listened track */
    trackListen(id) {
        Dispatcher.dispatch({
            type: ActionTypes.LISTEN_TRACK,
            id,
        });
    }
}

export default new ApiTrackActions();
