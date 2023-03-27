import IStore from './IStore';

import {
    getUsernameError, getPasswordError, getDayError, getYearError, getMonthError, getEmailError,
    getSexError, getNameError,
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
        case 'all':
            this.#checkForAllErrors(value);
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

        if (isErrorsExist) {
            this.#emitResponse('all');
        }

        this.jsEmit('VALIDATE_ALL', isErrorsExist);
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
