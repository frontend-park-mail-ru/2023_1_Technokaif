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

    addElementOnPage(name) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_COMPONENT_ON_PAGE,
            name,
        });
    },

    removeElementFromPage(name) {
        Dispatcher.dispatch({
            type: ActionTypes.REMOVE_COMPONENT_FROM_PAGE,
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

    feedAddContent(items) {
        Dispatcher.dispatch({
            type: ActionTypes.FEED_GOT_CONTENT,
            items,
        });
    },

    sendStoreState(item) {
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_STORE,
            item,
        });
    },
};

export default Actions;
