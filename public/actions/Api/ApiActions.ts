import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';

/**
 * Global Api actions creator
 */
class ApiActions {
    /** Feed page */
    feed() {
        Dispatcher.dispatch({
            type: ActionTypes.FEED,
        });
    }
}

export default new ApiActions();
