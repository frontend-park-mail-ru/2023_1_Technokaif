import { loginAjax } from './auth/loginAjaxReq';
import { registerAjax } from './auth/registerAjaxReq';
import IStore from '../stores/IStore';
import ActionTypes from '../actions/ActionTypes';
import { feedAjax } from './feed';
import Actions from '../actions/Actions';
import { logoutAjax } from './auth/logoutAjaxReq';

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
            this.feedRequest(action);
            break;
        default:
            console.error('invalid api type:', action.type);
        }
    }

    /**
     * Function to post login and password to server.
     * @param login
     * @param password
     */
    loginRequest(login, password) {
        const message = loginAjax(login, password);
        Actions.loginChangeState({
            message,
        });
    }

    /**
     * Function to post registration data to server.
     * @param data
     */
    registerRequest(data) {
        const message = registerAjax(data);
        Actions.registerChangeState({ message });
    }

    /**
     * Function to log out and request about to server.
     */
    logoutRequest() {
        const message = logoutAjax();
        Actions.logoutChangeState({
            message,
        });
    }

    /**
     * Function to get feed page data from server.
     */
    feedRequest() {
        const items = feedAjax();
        Actions.feedAddContent(items);
    }
}

export default new API();
