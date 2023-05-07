import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';

class ApiTrackActions {
    likeTrack(id) {
        Dispatcher.dispatch({
            type: ActionTypes.LIKE_TRACK,
            id,
        });
    }

    unlikeTrack(id) {
        Dispatcher.dispatch({
            type: ActionTypes.UNLIKE_TRACK,
            id,
        });
    }
}

export default new ApiTrackActions();
