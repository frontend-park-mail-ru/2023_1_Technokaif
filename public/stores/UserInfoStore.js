import IStore from './IStore';

import {
    getUsernameError, getPasswordError, getDayError, getYearError, getMonthError, getEmailError,
    getSexError, getNameError, checkIsEmail, translateMonthStrToInt,
} from '../utils/functions/validation.js';
import ActionTypes from '../actions/ActionTypes';
import { EventTypes } from './EventTypes';
import { checkForEmpty, getSexInString } from '../utils/functions/utils';

/**
 * Class for user data storing.
 */
class UserInfoStore extends IStore {
    /**
     * Constructor for user store.
     */
    constructor() {
        super('userInfo');
        const state = super.state;
        state.errors = {};
    }

    /**
     * Dispatching func.
     * @param {json} action
     */
    dispatch(action) {
        super.dispatch();

        switch (action.type) {
        case ActionTypes.VALIDATION_CHECK_CORRECT_ALL:
        case ActionTypes.VALIDATION_FIELD:
            this.#validationDispatch(action.nameOfField, action.content);
            break;
            // todo check for message 'OK' or error
            // resolved
        case ActionTypes.REGISTER_STATUS:
            // action.message
            if (action.message !== 'OK') {
                this.jsEmit('REGISTER_STATUS', action.message);
            } else {
                this.jsEmit('REGISTER_STATUS');
            }
            break;
        case ActionTypes.LOGIN_STATUS:
            if (action.message !== 'OK') {
                this.jsEmit('LOGIN_STATUS', action.message);
            } else {
                this.jsEmit('LOGIN_STATUS');
            }
            break;
        case ActionTypes.LOGOUT_STATUS:
            if (action.message !== 'OK') {
                this.jsEmit('LOGOUT_STATUS', action.message);
            } else {
                this.jsEmit('LOGOUT_STATUS');
            }
            break;
        default:
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
            this.#getSexError(value);
            break;
        case 'firstname':
            super.changeFieldInState('firstName', value);
            this.#getFirstNameError();
            break;
        case 'lastname':
            super.changeFieldInState('lastName', value);
            this.#getLastNameError();
            break;
        case 'validate_register':
            this.#checkForAllErrors(value);
            break;
        case 'validate_login':
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
        this.jsEmit('CHANGE_FIELD'.concat(nameOfField));
    }

    /**
     * Get username error
     */
    #getErrorsUsername() {
        const { username } = super.state;

        let status;
        if (checkForEmpty(username)) {
            status = 'BAD';
        } else {
            status = getUsernameError(username);
        }

        this.#emitResponse('username', status);
    }

    /**
     * Check for errors in password value
     * @param {string} password - password value
     */
    #getPasswordError(password) {
        let status;
        if (!checkForEmpty(password)) {
            status = getPasswordError(password);
        } else {
            status = 'BAD';
        }

        this.#emitResponse('password', status);
    }

    /**
     * Get day error
     */
    #getDayError() {
        const { day } = super.state;

        let status;
        if (checkForEmpty(day)) {
            status = 'BAD';
        } else {
            status = getDayError(day);
        }

        this.#emitResponse('day', status);
    }

    /**
     * Get year error
     */
    #getYearError() {
        const { year } = super.state;
        let status;
        if (checkForEmpty(year)) {
            status = 'BAD';
        } else {
            status = getYearError(year);
        }

        this.#emitResponse('year', status);
    }

    /**
     * Get month error
     */
    #getMonthError() {
        const { month } = super.state;
        let status;
        if (checkForEmpty(month)) {
            status = 'BAD';
        } else {
            status = getMonthError(month);

            if (!status) {
                super.state.monthInt = translateMonthStrToInt(month);
            }
        }

        this.#emitResponse('month', status);
    }

    /**
     * Get email error
     */
    #getEmailError() {
        const { email } = super.state;
        let status;
        if (checkForEmpty(email)) {
            status = 'BAD';
        } else {
            status = getEmailError(email, email);
        }

        this.#emitResponse('email', status);
    }

    /**
     * Get confEmail error
     */
    #getConfEmailError() {
        const { email } = super.state;
        const { confEmail } = super.state;
        let status;
        if (checkForEmpty(email) || checkForEmpty(confEmail)) {
            status = 'BAD';
        } else {
            status = getEmailError(email, confEmail);
        }

        this.#emitResponse('confEmail', status);
    }

    /**
     * Get sex error
     */
    #getSexError(sex) {
        if (!sex) {
            this.#emitResponse('gender', 'BAD');
            return;
        }

        const { gender } = sex;
        let status;
        if (gender.length < 2 && !checkForEmpty(gender)) {
            status = getSexError(...gender);
        } else {
            status = 'false';
        }

        if (!status) {
            super.changeFieldInState('gender', getSexInString(gender[0]));
        }

        this.#emitResponse('gender', status);
    }

    /**
     * Get first name error
     */
    #getFirstNameError() {
        const { firstName } = super.state;
        let status;
        if (checkForEmpty(firstName)) {
            status = 'BAD';
        } else {
            status = getNameError(firstName);
        }

        this.#emitResponse('firstName', status);
    }

    /**
     * Get last name error
     */
    #getLastNameError() {
        const { lastName } = super.state;
        let status;

        if (checkForEmpty(lastName)) {
            status = 'BAD';
        } else {
            status = getNameError(lastName);
        }

        this.#emitResponse('lastName', status);
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
        this.#getFirstNameError();
        this.#getLastNameError();
        this.#checkValueGender();

        let isErrorsExist = false;
        const { errors } = super.state;

        for (const element in errors) {
            if (errors[element].error && errors[element].nameOfField !== 'login') {
                isErrorsExist = true;
            }
        }

        let status = 'OK';
        if (isErrorsExist) {
            status = 'BAD';
        }

        // todo subscribe api request to this
        this.jsEmit(EventTypes.SEND_DATA, status);
    }

    /** if gender is 'M/S/O' then OK' */
    #checkValueGender() {
        switch (super.state.gender) {
        case 'O':
        case 'F':
        case 'M':
            super.state.errors.gender = false;
            break;
        default:
            super.state.errors.gender = true;
        }
    }

    /**
     * Check if field in authorization is correct
     * @param {string} password - value of password
     */
    #checkForErrorsInAuthorization(password) {
        this.#getLoginError();
        this.#getPasswordError(password);

        const errors = super.getValueInState('errors');
        let status;
        if (errors.login || errors.password) {
            status = 'BAD';
        } else {
            status = 'OK';
        }

        this.jsEmit(EventTypes.SEND_DATA, status);
    }

    /**
     * Check if login is incorrect and emit signal if incorrect
     */
    #getLoginError() {
        const login = super.getValueInState('login');

        let errors;
        let nameOfField = 'username';
        if (checkForEmpty(login)) {
            errors = 'error';
        } else if (checkIsEmail(login)) {
            errors = getEmailError(login, login);
            nameOfField = 'email';
        } else {
            errors = getUsernameError(login);
            nameOfField = 'username';
        }

        if (errors) {
            super.state.errors.login = true;
        } else {
            super.state.errors.login = false;
        }

        this.#emitResponse(nameOfField, errors);
    }

    /**
     * If status exist then errors also exist
     * @param {string} nameOfField - where error was
     * @param {*} status - errors
     */
    #emitResponse(nameOfField, status) {
        const state = super.state;
        if (!status) {
            this.jsEmit(EventTypes.VALIDATION_RESPONSE, nameOfField, 'OK');
            // super.changeFieldInState('errors', { name: nameOfField, error: false });
            state.errors[nameOfField] = false;
        } else {
            this.jsEmit(EventTypes.VALIDATION_RESPONSE, nameOfField, 'BAD');
            // super.changeFieldInState('errors', { name: nameOfField, error: true });
            state.errors[nameOfField] = true;
        }
    }
}

export default new UserInfoStore();
