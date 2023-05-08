import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';

/** Work with User */
class ApiUserActions {
    /** Login user with password and username */
    login(username, password) {
        Dispatcher.dispatch({
            type: ActionTypes.LOGIN,
            username,
            password,
        });
    }

    /** Register user */
    register(data) {
        Dispatcher.dispatch({
            type: ActionTypes.REGISTER,
            data,
        });
    }

    /** Logout from account */
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
