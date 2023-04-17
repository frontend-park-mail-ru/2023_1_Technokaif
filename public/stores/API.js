import { loginAjax } from '../api/auth/loginAjaxReq';
import { registerAjax } from '../api/auth/registerAjaxReq';
import IStore from './IStore';
import ActionTypes from '../actions/ActionTypes';
import { feedAlbumsAjax } from '../api/albums/feedAlbumsAjaxRequest';
import Actions from '../actions/Actions';
import { logoutAjax } from '../api/auth/logoutAjaxReq';
import { EventTypes } from '../utils/config/EventTypes';
import { feedTracksAjax } from '../api/tracks/feedTracksAjaxRequest';
import { feedArtistsAjax } from '../api/artists/feedArtistsAjaxRequest';
import { artistAjax } from '../api/artists/artistAjaxRequest';
import { artistTracksAjax } from '../api/tracks/artistTracksAjaxRequest';
import { artistAlbumsAjax } from '../api/albums/artistAlbumsAjaxRequest';
import { trackAjax } from '../api/player/trackRequest';
import { albumAjax } from '../api/player/album';
import { trackOneAjax } from '../api/player/track';
import { userAjax } from '../api/user/userRequestAjax';
import { userUpdateAjax } from '../api/user/userUpdateAjaxReq';
import { userUpdatePasswordAjax } from '../api/user/userUpdatePasswordAjaxReq';
import { userUpdateAvatarAjax } from '../api/user/uploadAvatarAjax';
import { getAlbumById } from '../api/albums/getAlbumById.ts';

/**
 * Class using for getting data from backend.
 */
class API extends IStore {
    /**
     * Constructor for api store.
     */
    constructor() {
        super('api');
    }

    /**
     * Switches over the action's type when an action is dispatched.
     * @param action
     */
    dispatch(action) {
        super.dispatch();

        switch (action.type) {
        case ActionTypes.LOGIN:
            this.#loginRequest(action.username, action.password);
            break;
        case ActionTypes.REGISTER:
            this.#registerRequest(action.data);
            break;
        case ActionTypes.LOGOUT:
            this.#logoutRequest();
            break;
        case ActionTypes.FEED:
            this.#feedRequest();
            break;
        case ActionTypes.PROFILE:
            this.#profileRequest(action.id);
            break;
        case ActionTypes.ARTIST:
            this.#artistRequest(action.id);
            break;
        case ActionTypes.ARTIST_TRACKS:
            this.#artistTracksRequest(action.id);
            break;
        case ActionTypes.ARTIST_ALBUMS:
            this.#artistAlbumsRequest(action.id);
            break;
        case ActionTypes.PLAY_TRACK:
        case ActionTypes.QUEUE_TRACK:
            this.#trackRequestFromServer(action.id);
            break;
        case ActionTypes.PLAY_ALBUM:
        case ActionTypes.QUEUE_ALBUM:
            this.#albumsRequestFromServer(action.id);
            break;
        case ActionTypes.PLAY_ARTIST:
        case ActionTypes.QUEUE_ARTIST:
            this.#artistRequestFromServer(action.id);
            break;
        case ActionTypes.DOWNLOAD_TRACK:
            this.#downloadTrack(action.id);
            break;
        case ActionTypes.USER_UPDATE_API:
            this.#updateUser(action.id, action.userData);
            break;
        case ActionTypes.USER_UPDATE_PASSWORD:
            this.#updatePasswordForUser(action.userData);
            break;
        case ActionTypes.USER_UPDATE_AVATAR:
            this.#updateUserAvatar(action.id, action.avatar);
            break;
        case ActionTypes.GET_ALBUM:
            this.#getAlbum(action.id);
            break;
        case ActionTypes.GET_ONE_ALBUM:
            this.#getOneAlbum(action.id);
            break;
        default:
        }
    }

    /**
     * Function to post login and password to server.
     * @param login
     * @param password
     */
    #loginRequest(login, password) {
        loginAjax(login, password).then(
            (message) => this.jsEmit(EventTypes.LOGIN_STATUS, message),
        );
    }

    /**
     * Function to post registration data to server.
     * @param data
     */
    #registerRequest(data) {
        registerAjax(data).then(
            (message) => this.jsEmit(EventTypes.REGISTER_STATUS, message),
        );
    }

    /**
     * Function to log out and request about to server.
     */
    #logoutRequest() {
        logoutAjax().then(
            (message) => this.jsEmit(EventTypes.LOGOUT_STATUS, message),
        );
    }

    /**
     * Function to get feed page data from server.
     */
    #feedRequest() {
        feedTracksAjax().then((tracks) => Actions.feedAddContent({ Tracks: tracks }));
        feedArtistsAjax().then((artists) => Actions.feedAddContent({ Artists: artists }));
        feedAlbumsAjax().then((albums) => Actions.feedAddContent({ Albums: albums }));
    }

    /**
     * Function to get profile page data from server.
     */
    #profileRequest(id) {
        userAjax(id).then((userData) => {
            Actions.userAddContent(userData);
        });
    }

    /**
     * Function to get an artist from server
     */
    #artistRequest(id) {
        artistAjax(id).then((artist) => {
            Actions.artistAddContent(artist, 'artist');
        });
    }

    /**
     * Function to get an artist tracks from server
     */
    #artistTracksRequest(id) {
        artistTracksAjax(id).then((tracks) => {
            Actions.artistAddContent(tracks, 'tracks');
        });
    }

    /**
     * Function to get an artist albums from server
     */
    #artistAlbumsRequest(id) {
        artistAlbumsAjax(id).then((albums) => {
            Actions.artistAddContent(albums, 'albums');
        });
    }

    /** Download track song to browser */
    #downloadTrack(id) {
        trackOneAjax(id).then((track) => {
            this.jsEmit(EventTypes.LOAD_TRACK, { track });
        });
    }

    /** Function to get Tracks from server */
    #trackRequestFromServer(id) {
        trackAjax(id).then((tracks) => {
            Actions.loadMoreLine(tracks);
        });
    }

    /** Function to get Albums from server */
    #albumsRequestFromServer(id) {
        albumAjax(id).then((tracks) => {
            Actions.loadMoreLine(tracks);
        });
    }

    /** Function to get Artists from server */
    #artistRequestFromServer(id) {
        artistTracksAjax(id).then((tracks) => {
            Actions.loadMoreLine(tracks);
        });
    }

    /** User update data to server */
    #updateUser(id, userData) {
        userUpdateAjax(id, userData).then((message) => this.jsEmit(
            EventTypes.UPDATE_DATA_RECEIVED,
            message,
        ));
    }

    /** User update data to server */
    #updatePasswordForUser(userData) {
        userUpdatePasswordAjax(userData).then((message) => this.jsEmit(
            EventTypes.UPDATE_DATA_WITH_PASS_RECEIVED,
            message,
        ));
    }

    /** User update avatar post request to server */
    #updateUserAvatar(id, avatar) {
        userUpdateAvatarAjax(id, avatar).then((message) => this.jsEmit(
            EventTypes.UPDATE_DATA_WITH_AVATAR_RECEIVED,
            message,
        ));
    }

    /** Get album from API */
    #getAlbum(id) {
        albumAjax(id).then((message) => Actions.addAlbumToContent(message));
    }

    /** Get one album */
    #getOneAlbum(id) {
        getAlbumById(id).then((message) => Actions.addOneAlbum(message));
    }
}

export default new API();
