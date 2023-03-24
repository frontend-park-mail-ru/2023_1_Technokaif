import Dispatcher from '../dispatcher/Dispatcher.js';
import ActionTypes from './ActionTypes.js';

/**
 * Global Action creator object.
 * @type {{route(*): void}}
 */
const Actions = {
    route(url) {
        Dispatcher.dispatch({
            type: ActionTypes.ROUTE,
            url,
        });
    },

};

export default Actions;
