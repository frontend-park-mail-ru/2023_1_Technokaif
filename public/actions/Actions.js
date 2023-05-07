import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';

/**
 * Global Action creator object.
 */
const Actions = {
    /** Router changes item in Store state */
    sendStoreState(item) {
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_STORE,
            item,
        });
    },

    /** Router changes item in Store state */
    sendId(id, nameOfPage) {
        Dispatcher.dispatch({
            type: ActionTypes.ID_PROVIDED,
            id,
            nameOfPage,
        });
    },

    /** Check if ID for page was placed in Store state */
    checkID(nameOfPage) {
        Dispatcher.dispatch({
            type: ActionTypes.ID_VIEW_REQUEST,
            nameOfPage,
        });
    },

    /** Get data after restart */
    getDataAfterRestart() {
        Dispatcher.dispatch({
            type: ActionTypes.FIRST_START_AFTER_RESTART,
        });
    },

    clearStore(name) {
        Dispatcher.dispatch({
            type: ActionTypes.CLEAR_STORE,
            name,
        });
    },
};

export default Actions;
