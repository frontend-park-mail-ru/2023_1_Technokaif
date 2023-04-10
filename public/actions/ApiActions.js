import Dispatcher from '../dispatcher/Dispatcher.js';
import ActionTypes from './ActionTypes.js';

/**
 * Global Api actions creator
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

    logout() {
        Dispatcher.dispatch({
            type: ActionTypes.LOGOUT,
        });
    },
    /** Feed page */
    feed() {
        Dispatcher.dispatch({
            type: ActionTypes.FEED,
        });
    },

    /** Artist Page */
    artist(id) {
        Dispatcher.dispatch({
            type: ActionTypes.ARTIST,
            id,
        });
    },

    artistAlbums(id) {
        Dispatcher.dispatch({
            type: ActionTypes.ARTIST_ALBUMS,
            id,
        });
    },

    artistTracks(id) {
        Dispatcher.dispatch({
            type: ActionTypes.ARTIST_TRACKS,
            id,
        });
    },

    /** User page */
    user(id) {
        Dispatcher.dispatch({
            type: ActionTypes.PROFILE,
            id,
        });
    },

    /** Action to ask for user update of data */
    userUpdateData(id, userData) {
        Dispatcher.dispatch({
            type: ActionTypes.USER_UPDATE_API,
            id,
            userData,
        });
    },

    /** Action to ask for user update of data */
    userUpdatePassword(userData) {
        Dispatcher.dispatch({
            type: ActionTypes.USER_UPDATE_PASSWORD,
            userData,
        });
    },

    /** Action to ask for user update of data */
    userUpdateAvatar(id, avatar) {
        Dispatcher.dispatch({
            type: ActionTypes.USER_UPDATE_AVATAR,
            id,
            avatar,
        });
    },

};

export default ApiActions;
