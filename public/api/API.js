import { loginAjax } from './auth/loginAjaxReq';
import { registerAjax } from './auth/registerAjaxReq';
import ApiActions from '../actions/ApiActions';

/**
 * Class using for getting data from backend.
 */
class API {
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
