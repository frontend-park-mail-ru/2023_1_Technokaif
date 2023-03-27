import IStore from './IStore';

import {
    getUsernameError, getPasswordError, getDayError, getYearError, getMonthError, getEmailError,
    getSexError, getNameError, checkIsEmail,
} from '../utils/functions/validation.js';

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
        switch (action) {
        case VALIDATION_FIELD:
            this.#validationDispatch(action.nameOfField, action.content);
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
            super.chagneFieldInState('username', value);
            this.#getErrorsUsername();
            break;
        case 'password':
            this.#getPasswordError(value);
            break;
        case 'day':
            super.chagneFieldInState('day', value);
            this.#getDayError();
            break;
        case 'month':
            super.chagneFieldInState('month', value);
            this.#getMonthError();
            break;
        case 'year':
            super.chagneFieldInState('year', value);
            this.#getYearError();
            break;
        case 'email':
            super.chagneFieldInState('email', value);
            this.#getEmailError();
            break;
        case 'confEmail':
            super.chagneFieldInState('confEmail', value);
            this.#getConfEmailError();
            break;
        case 'sex':
            super.chagneFieldInState('sex', value);
            this.#getSexError();
            break;
        case 'firstName':
            super.chagneFieldInState('firstName', value);
            this.#getFirstNameError();
            break;
        case 'lastName':
            super.chagneFieldInState('lastName', value);
            this.#getLastNameError();
            break;
        case 'all_reg':
            this.#checkForAllErrors(value);
            break;
        case 'all_log':
            this.#checkForErrorsInAuthorization(value);
            break;
        case 'log_username':
            super.chagneFieldInState('login', value);
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
        const username = super.getValueInState('username');
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
        const day = super.getValueInState('day');
        const status = getDayError(day);

        this.#emitResponse('day', status);
    }

    /**
     * Get year error
     */
    #getYearError() {
        const year = super.getValueInState('year');
        const status = getYearError(year);

        this.#emitResponse('year', status);
    }

    /**
     * Get month error
     */
    #getMonthError() {
        const month = super.getValueInState('month');
        const status = getMonthError(month);

        this.#emitResponse('month', status);
    }

    /**
     * Get email error
     */
    #getEmailError() {
        const email = super.getValueInState('email');
        const status = getEmailError(email, email);

        this.#emitResponse('email', status);
    }

    /**
     * Get confEmail error
     */
    #getConfEmailError() {
        const email = super.getValueInState('email');
        const confEmail = super.getValueInState('confEmail');
        const status = getEmailError(email, confEmail);

        this.#emitResponse('confEmail', status);
    }

    /**
     * Get sex error
     */
    #getSexError() {
        const sex = super.getValueInState('sex');
        const status = getSexError(sex);

        this.#emitResponse(username, status);
    }

    /**
     * Get first name error
     */
    #getFirstNameError() {
        const firstName = super.getValueInState('firstName');
        const status = getNameError(firstName);

        this.#emitResponse(firstName, status);
    }

    /**
     * Get last name error
     */
    #getLastNameError() {
        const lastName = super.getValueInState('lastName');
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
            jsEmit('VALIDATE_ALL', 'BAD');
        } else {
            jsEmit('VALIDATE_ALL', 'OK');
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
            this.jsEmit('VALIDATION'.concat('_', nameOfField), 'GOOD');
            super.chagneFieldInState('errors', { name: nameOfField, error: false });
        } else {
            this.jsEmit('VALIDATION'.concat('_', nameOfField), 'BAD');
            super.chagneFieldInState('errors', { name: nameOfField, error: true });
        }
    }
}

export default new UserInfoStore();
