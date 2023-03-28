import Dispatcher from '../dispatcher/Dispatcher.js';
import ActionTypes from './ActionTypes.js';

/**
 * Global
 * @type {{login(): void}}
 */
const ApiActions = {
    login(username, password) {
        Dispatcher.dispatch({
            type: ActionTypes.LOGIN,
            username,
            password,
        });
    },

    register(data) {
        Dispatcher.dispatch({
            type: ActionTypes.REGISTER,
            data,
        });
    },

    feed(items) {
        Dispatcher.dispatch({
            type: ActionTypes.FEED,
            items,
        });
    },
};

export default ApiActions;
