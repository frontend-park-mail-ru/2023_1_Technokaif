import { loginAjax } from './auth/loginAjaxReq';
import { registerAjax } from './auth/registerAjaxReq';
import ApiActions from '../actions/ApiActions';
import IStore from '../stores/IStore';
import ActionTypes from '../actions/ActionTypes';

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

    /** Switches over the action's type when an action is dispatched.
     *
     * @param action
     */
    dispatch(action) {
        switch (action.type) {
        case ActionTypes.LOGIN:
            this.addNewItem(action.payload);
            break;
        case ActionTypes.REGISTER:
            this.addNewItem(action.payload);
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
        loginAjax(login, password);
        ApiActions.login({
            login,
            password,
        });
    }

    /**
     * Function to post registration data to server.
     * @param data
     */
    registerRequest(data) {
        registerAjax(data);
        ApiActions.register(data);
    }
}

export default new API();
