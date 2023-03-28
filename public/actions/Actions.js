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

    whatRender(name) {
        Dispatcher.dispatch({
            type: ActionTypes.CHECK_WHAT_RENDER,
            name,
        });
    },

    validationField(nameOfField, content) {
        Dispatcher.dispatch({
            type: ActionTypes.VALIDATION_FIELD,
            nameOfField,
            content,
        });
    },

    registerChangeState({
        message,
    }) {
        Dispatcher.dispatch({
            type: ActionTypes.REGISTER_STATUS,
            message,
        });
    },

    loginChangeState({
        message,
    }) {
        Dispatcher.dispatch({
            type: ActionTypes.LOGIN_STATUS,
            message,
        });
    },

    logoutChangeState({
        message,
    }) {
        Dispatcher.dispatch({
            type: ActionTypes.LOGOUT_STATUS,
            message,
        });
    },
};

export default Actions;
