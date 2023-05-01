import Dispatcher from '../dispatcher/Dispatcher.js';
import ActionTypes from './ActionTypes.js';

/**
 * Global Api actions creator
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

    likeTrack(id) {
        Dispatcher.dispatch({
            type: ActionTypes.LIKE_TRACK,
            id,
        });
    },

    unlikeTrack(id) {
        Dispatcher.dispatch({
            type: ActionTypes.UNLIKE_TRACK,
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

    /** Get one album by it id */
    getAlbum(id) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_ALBUM,
            id,
        });
        Dispatcher.dispatch({
            type: ActionTypes.GET_ALBUM_TRACKS,
            id,
        });
    },

    /** Like album */
    likeAlbum(id) {
        Dispatcher.dispatch({
            type: ActionTypes.LIKE_ALBUM,
            id,
        });
    },

    /** Unlike album */
    unLikeAlbum(id) {
        Dispatcher.dispatch({
            type: ActionTypes.UNLIKE_ALBUM,
            id,
        });
    },

    /** Like album */
    likeArtist(id) {
        Dispatcher.dispatch({
            type: ActionTypes.LIKE_ARTIST,
            id,
        });
    },

    /** Unlike album */
    unLikeArtist(id) {
        Dispatcher.dispatch({
            type: ActionTypes.UNLIKE_ARTIST,
            id,
        });
    },

    /** Favorite tracks page api */
    favoriteTracks(userId) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_USER_FAVORITE_TRACKS,
            userId,
        });
    },

    /** Favorite artists page api */
    favoriteArtists(userId) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_USER_FAVORITE_ARTISTS,
            userId,
        });
    },

    /** Favorite albums page api */
    favoriteAlbums(userId) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_USER_FAVORITE_ALBUMS,
            userId,
        });
    },

    /** User playlists page api */
    userPlaylists(userId) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_USER_PLAYLISTS,
            userId,
        });
    },

    /** Favorite playlists page api */
    userFavoritePlaylists(userId) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_USER_FAVORITE_PLAYLISTS,
            userId,
        });
    },

    /** User playlists page api */
    playlist(playlistId) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_PLAYLIST,
            playlistId,
        });
    },

    /** User playlists page api */
    playlistTracks(playlistId) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_PLAYLIST_TRACKS,
            playlistId,
        });
    },

    /** Playlists like page api */
    likePlaylist(playlistId) {
        Dispatcher.dispatch({
            type: ActionTypes.LIKE_PLAYLIST,
            playlistId,
        });
    },

    /** Playlists like page api */
    unlikePlaylist(playlistId) {
        Dispatcher.dispatch({
            type: ActionTypes.UNLIKE_PLAYLIST,
            playlistId,
        });
    },

    /** User playlists page api */
    createPlaylist(playlistData) {
        Dispatcher.dispatch({
            type: ActionTypes.CREATE_PLAYLIST,
            playlistData,
        });
    },

    /** User playlists page api */
    updatePlaylist(id, playlistData) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_PLAYLIST,
            id,
            playlistData,
        });
    },

    /** User playlists page api */
    uploadPlaylistCover(id, cover) {
        Dispatcher.dispatch({
            type: ActionTypes.UPLOAD_PLAYLIST_COVER,
            id,
            cover,
        });
    },

    /** search server */
    search(searchString) {
        Dispatcher.dispatch({
            type: ActionTypes.SEARCH_WITH_NAME,
            searchString,
        });
    },
};

export default ApiActions;
