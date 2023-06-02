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

    /** Feed page */
    feedCharts(days: number) {
        Dispatcher.dispatch({
            type: ActionTypes.FEED_CHARTS,
            days,
        });
    }
}

export default new ApiActions();
