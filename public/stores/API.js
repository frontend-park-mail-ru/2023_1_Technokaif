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
            this.loginRequest(action.username, action.password);
            break;
        case ActionTypes.REGISTER:
            this.registerRequest(action.data);
            break;
        case ActionTypes.LOGOUT:
            this.logoutRequest();
            break;
        case ActionTypes.FEED:
            this.feedRequest();
            break;
        default:
        }
    }

    /**
     * Function to post login and password to server.
     * @param login
     * @param password
     */
    loginRequest(login, password) {
        loginAjax(login, password).then(
            (message) => this.jsEmit(EventTypes.LOGIN_STATUS, message),
        );
    }

    /**
     * Function to post registration data to server.
     * @param data
     */
    registerRequest(data) {
        registerAjax(data).then(
            (message) => this.jsEmit(EventTypes.REGISTER_STATUS, message),
        );
    }

    /**
     * Function to log out and request about to server.
     */
    logoutRequest() {
        logoutAjax().then(
            (message) => this.jsEmit(EventTypes.LOGOUT_STATUS, message),
        );
    }

    /**
     * Function to get feed page data from server.
     */
    feedRequest() {
        feedTracksAjax().then((tracks) => Actions.feedAddContent({ Tracks: tracks }));
        feedArtistsAjax().then((artists) => Actions.feedAddContent({ Artists: artists }));
        feedAlbumsAjax().then((albums) => Actions.feedAddContent({ Albums: albums })).then(() => {
            Actions.feedAllDataReceived();
        });
    }
}

export default new API();
