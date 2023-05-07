import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';

class ApiUserActions {
    login(username, password) {
        Dispatcher.dispatch({
            type: ActionTypes.LOGIN,
            username,
            password,
        });
    }

    register(data) {
        Dispatcher.dispatch({
            type: ActionTypes.REGISTER,
            data,
        });
    }

    logout() {
        Dispatcher.dispatch({
            type: ActionTypes.LOGOUT,
        });
    }

    /** User page */
    user(id) {
        Dispatcher.dispatch({
            type: ActionTypes.PROFILE,
            id,
        });
    }

    /** Action to ask for user update of data */
    userUpdateData(id, userData) {
        Dispatcher.dispatch({
            type: ActionTypes.USER_UPDATE_API,
            id,
            userData,
        });
    }

    /** Action to ask for user update of data */
    userUpdatePassword(userData) {
        Dispatcher.dispatch({
            type: ActionTypes.USER_UPDATE_PASSWORD,
            userData,
        });
    }

    /** Action to ask for user update of data */
    userUpdateAvatar(id, avatar) {
        Dispatcher.dispatch({
            type: ActionTypes.USER_UPDATE_AVATAR,
            id,
            avatar,
        });
    }

    /** User playlists page api */
    userPlaylists(userId) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_USER_PLAYLISTS,
            userId,
        });
    }

    /** Favorite playlists page api */
    userFavoritePlaylists(userId) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_USER_FAVORITE_PLAYLISTS,
            userId,
        });
    }

    /** Favorite tracks page api */
    favoriteTracks(userId) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_USER_FAVORITE_TRACKS,
            userId,
        });
    }

    /** Favorite artists page api */
    favoriteArtists(userId) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_USER_FAVORITE_ARTISTS,
            userId,
        });
    }

    /** Favorite albums page api */
    favoriteAlbums(userId) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_USER_FAVORITE_ALBUMS,
            userId,
        });
    }
}

export default new ApiUserActions();
