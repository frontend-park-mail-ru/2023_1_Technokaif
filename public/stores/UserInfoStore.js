import IStore from './IStore';

import {
    getUsernameError, getPasswordError, getDayError, getYearError, getMonthError, getEmailError,
    getSexError, getNameError, checkIsEmail,
} from '../utils/functions/validation.js';
import ActionTypes from '../actions/ActionTypes';

/**
 * Class for user data storing.
 */
class UserInfoStore extends IStore {
    /**
     * Constructor for user store.
     */
    constructor() {
        super('userInfo');
    }

    /**
     * Function to handle dispatcher behaviour.
     * @param action
     */
    #info;

    /**
     * Dispatching func.
     * @param {json} action
     */
    dispatch(action) {
        super.dispatch();

        switch (action.type) {
        case ActionTypes.VALIDATION_FIELD:
            this.#validationDispatch(action.nameOfField, action.content);
            break;
            // todo check for message 'OK' or error
        case ActionTypes.REGISTER_STATUS:
            // action.message
            break;
        case ActionTypes.LOGIN_STATUS:
            break;
        case ActionTypes.LOGOUT_STATUS:
            break;
        default:
            console.error('undefined userInfo store action:', action.type);
        }
    }

    /**
     * Get errors of field
     * @param {string} nameOfField - name of field
     * @param {*} value - value of field
     */
    #validationDispatch(nameOfField, value) {
        switch (nameOfField) {
        case 'username':
            super.changeFieldInState('username', value);
            this.#getErrorsUsername();
            break;
        case 'password':
            this.#getPasswordError(value);
            break;
        case 'day':
            super.changeFieldInState('day', value);
            this.#getDayError();
            break;
        case 'month':
            super.changeFieldInState('month', value);
            this.#getMonthError();
            break;
        case 'year':
            super.changeFieldInState('year', value);
            this.#getYearError();
            break;
        case 'email':
            super.changeFieldInState('email', value);
            this.#getEmailError();
            break;
        case 'confEmail':
            super.changeFieldInState('confEmail', value);
            this.#getConfEmailError();
            break;
        case 'sex':
            super.changeFieldInState('sex', value);
            this.#getSexError();
            break;
        case 'firstName':
            super.changeFieldInState('firstName', value);
            this.#getFirstNameError();
            break;
        case 'lastName':
            super.changeFieldInState('lastName', value);
            this.#getLastNameError();
            break;
        case 'all_reg':
            this.#checkForAllErrors(value);
            break;
        case 'all_log':
            this.#checkForErrorsInAuthorization(value);
            break;
        case 'log_username':
            super.changeFieldInState('login', value);
            this.#getLoginError();
            break;
        case 'log_password':
            this.#getPasswordError(value);
            break;
        default:
        }
    }

    /**
     * Get username error
     */
    #getErrorsUsername() {
        const status = getUsernameError(username);

        this.#emitResponse('username', status);
    }

    /**
     * Check for errors in password value
     * @param {string} password - password value
     */
    #getPasswordError(password) {
        const status = getPasswordError(password);

        this.#emitResponse('password', status);
    }

    /**
     * Get day error
     */
    #getDayError() {
        const status = getDayError(day);

        this.#emitResponse('day', status);
    }

    /**
     * Get year error
     */
    #getYearError() {
        const status = getYearError(year);

        this.#emitResponse('year', status);
    }

    /**
     * Get month error
     */
    #getMonthError() {
        const status = getMonthError(month);

        this.#emitResponse('month', status);
    }

    /**
     * Get email error
     */
    #getEmailError() {
        const status = getEmailError(email, email);

        this.#emitResponse('email', status);
    }

    /**
     * Get confEmail error
     */
    #getConfEmailError() {
        const status = getEmailError(email, confEmail);

        this.#emitResponse('confEmail', status);
    }

    /**
     * Get sex error
     */
    #getSexError() {
        const status = getSexError(boxes);

        this.#emitResponse(username, status);
    }

    /**
     * Get first name error
     */
    #getFirstNameError() {
        const status = getNameError(firstName);

        this.#emitResponse(firstName, status);
    }

    /**
     * Get last name error
     */
    #getLastNameError() {
        const status = getNameError(lastName);

        this.#emitResponse(lastName, status);
    }

    /**
     * Check for existence of errors in fields
     * @param {string} password - password value
     */
    #checkForAllErrors(password) {
        this.#getErrorsUsername();
        this.#getPasswordError(password);
        this.#getDayError();
        this.#getYearError();
        this.#getMonthError();
        this.#getEmailError();
        this.#getConfEmailError();
        this.#getSexError();
        this.#getFirstNameError();
        this.#getLastNameError();

        let isErrorsExist = false;
        const errors = super.getValueInState('errors');

        errors.forEach((element) => {
            if (element.error) {
                isErrorsExist = true;
            }
        });

        let status = 'OK';
        if (isErrorsExist) {
            status = 'BAD';
        }

        // todo subscribe api request to this
        this.jsEmit('VALIDATE_ALL', status);
    }

    /**
     * Check if field in authorization is correct
     * @param {string} password - value of password
     */
    #checkForErrorsInAuthorization(password) {
        this.#getLoginError();
        this.#getPasswordError(password);

        const errors = super.getValueInState('errors');
        if (errors.login || errors.password) {
            this.jsEmit('VALIDATE_ALL', 'BAD');
        } else {
            this.jsEmit('VALIDATE_ALL', 'OK');
        }
    }

    /**
     * Check if login is incorrect and emit signal if incorrect
     */
    #getLoginError() {
        const login = super.getValueInState('login');
        let errors;
        if (checkIsEmail(login)) {
            errors = getEmailError(login, login);
        } else {
            errors = getUsernameError(login);
        }

        this.#emitResponse('login', errors);
    }

    /**
     * If status exist then errors also exist
     * @param {string} nameOfField - where error was
     * @param {*} status - errors
     */
    #emitResponse(nameOfField, status) {
        if (!status) {
            this.jsEmit('VALIDATION'.concat('_', nameOfField), 'OK');
            super.changeFieldInState('errors', { name: nameOfField, error: false });
        } else {
            this.jsEmit('VALIDATION'.concat('_', nameOfField), 'BAD');
            super.changeFieldInState('errors', { name: nameOfField, error: true });
        }
    }
}

export default new UserInfoStore();
