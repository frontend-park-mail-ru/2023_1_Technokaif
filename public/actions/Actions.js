import Dispatcher from '../dispatcher/Dispatcher.js';
import ActionTypes from './ActionTypes.js';

/**
 * Global Action creator object.
 * @type {{(*): void}}
 */
const Actions = {
    /** Action to emit two functions for ComponentsStore: what render on page and what
     *  to unrender by pageName */
    whatRender(name) {
        Dispatcher.dispatch({
            type: ActionTypes.CHECK_WHAT_RENDER,
            name,
        });
    },

    /** Action to add a component in ComponentsStore state */
    addElementOnPage(name) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_COMPONENT_ON_PAGE,
            name,
        });
    },

    /** Action to remove a component from ComponentsStore state */
    removeElementFromPage(name) {
        Dispatcher.dispatch({
            type: ActionTypes.REMOVE_COMPONENT_FROM_PAGE,
            name,
        });
    },

    /** Action to validate a named field in login or registration form and add it in state */
    validationField(nameOfField, content) {
        Dispatcher.dispatch({
            type: ActionTypes.VALIDATION_FIELD,
            nameOfField,
            content,
        });
    },

    /** Action to validate all login or registration form fields */
    validateAll(nameOfValidation, content) {
        const nameOfField = nameOfValidation;
        Dispatcher.dispatch({
            type: ActionTypes.VALIDATION_CHECK_CORRECT_ALL,
            nameOfField,
            content,
        });
    },

    /** Action to handle an error status after register post request */
    registerChangeState({
        message,
    }) {
        Dispatcher.dispatch({
            type: ActionTypes.REGISTER_STATUS,
            message,
        });
    },

    /** Action to handle an error status after login post request */
    loginChangeState({
        message,
    }) {
        Dispatcher.dispatch({
            type: ActionTypes.LOGIN_STATUS,
            message,
        });
    },

    /** Action to handle an error status after logout post request */
    logoutChangeState({
        message,
    }) {
        Dispatcher.dispatch({
            type: ActionTypes.LOGOUT_STATUS,
            message,
        });
    },

    /** Action to add items got from feed api in ContentStore */
    feedAddContent(items) {
        Dispatcher.dispatch({
            type: ActionTypes.FEED_GOT_CONTENT,
            items,
        });
    },

    /** Router changes item in Store state */
    sendStoreState(item) {
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_STORE,
            item,
        });
    },
};

export default Actions;
