import IStore from './IStore';

import {
    getUsernameError, getPasswordError, getDayError, getYearError, getMonthError, getEmailError,
    getSexError, getNameError, checkIsEmail, translateMonthStrToInt,
} from '../utils/functions/validation.js';
import ActionTypes from '../actions/ActionTypes';
import { EventTypes } from '../utils/config/EventTypes';
import { checkForEmpty, getSexInString } from '../utils/functions/utils';

const EMPTY_ERROR = 'EMPTY';
const OK_RESPONSE = 'OK';
const BAD_RESPONSE = 'BAD';

/**
 * Class for User information.
 * Can validate information.
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
            this.#checkName('firstName');
            break;
        case 'lastname':
            super.changeFieldInState('lastName', value);
            this.#checkName('lastName');
            break;
        case 'validate_register':
            this.#checkForErrorsInRegistration(value);
            break;
        case 'validate_login':
            this.#checkForErrorsInLogin(value);
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
     * If username correct will emit 'OK' else 'BAD'
     * If field is empty will return 'OK' without loginType flag
     * @param {boolean} loginType if true will return 'BAD' when empty field
     */
    #getErrorsUsername(loginType = false) {
        const { username } = super.state;

        let status;
        if (checkForEmpty(username)) {
            status = EMPTY_ERROR;
        } else {
            status = getUsernameError(username);
        }

        if (status !== EMPTY_ERROR || loginType) {
            this.#emitResponse('username', status);
        }

        if (status === EMPTY_ERROR && !loginType) {
            this.#emitResponse('username', OK_RESPONSE);
        }
    }

    /**
     * If password correct will emit 'OK' else 'BAD'
     * If field is empty will return 'OK' without loginType flag
     * @param {string} password value to check for error
     * @param {boolean} loginType if true will return 'BAD' when empty field
     */
    #getPasswordError(password, loginType = false) {
        let status;
        if (!checkForEmpty(password)) {
            status = getPasswordError(password);
        } else {
            status = EMPTY_ERROR;
        }

        if (status !== EMPTY_ERROR || loginType) {
            this.#emitResponse('password', status);
        }
        if (status === EMPTY_ERROR && !loginType) {
            this.#emitResponse('password', OK_RESPONSE);
        }
    }

    /**
     * If day correct will emit 'OK' else 'BAD'
     * If field is empty will return 'OK' without loginType flag
     * @param {boolean} loginType if true will return 'BAD' when empty field
     */
    #getDayError(loginType = false) {
        const { day } = super.state;

        let status;
        if (checkForEmpty(day)) {
            status = EMPTY_ERROR;
        } else {
            status = getDayError(day);
        }

        if (status !== EMPTY_ERROR || loginType) {
            this.#emitResponse('day', status);
        }
        if (status === EMPTY_ERROR && !loginType) {
            this.#emitResponse('day', OK_RESPONSE);
        }
    }

    /**
     * If year correct will emit 'OK' else 'BAD'
     * If field is empty will return 'OK' without loginType flag
     * @param {boolean} loginType if true will return 'BAD' when empty field
     */
    #getYearError(loginType = false) {
        const { year } = super.state;
        let status;
        if (checkForEmpty(year)) {
            status = EMPTY_ERROR;
        } else {
            status = getYearError(year);
        }

        if (status !== EMPTY_ERROR || loginType) {
            this.#emitResponse('year', status);
        }
        if (status === EMPTY_ERROR && !loginType) {
            this.#emitResponse('year', OK_RESPONSE);
        }
    }

    /**
     * If month correct will emit 'OK' else 'BAD'
     * If field is empty will return 'OK' without loginType flag
     * @param {boolean} loginType if true will return 'BAD' when empty field
     */
    #getMonthError(loginType = false) {
        const { month } = super.state;
        let status;
        if (checkForEmpty(month) && !loginType) {
            status = EMPTY_ERROR;
        } else {
            status = getMonthError(month);

            if (!status) {
                super.state.monthInt = translateMonthStrToInt(month);
            }
        }

        if (status !== EMPTY_ERROR) {
            this.#emitResponse('month', status);
        }
        if (status === EMPTY_ERROR) {
            this.#emitResponse('month', OK_RESPONSE);
        }
    }

    /**
     * If email correct will emit 'OK' else 'BAD'
     * If field is empty will return 'OK' without loginType flag
     *
     * Emit confEmail signal with 'BAD' status if confEmail not correct
     * or empty with loginType flag
     * @param {boolean} loginType if true will return 'BAD' when empty field
     */
    #getEmailError(loginType = false) {
        const { email } = super.state;
        const { confEmail } = super.state;
        let status;
        if (checkForEmpty(email) && !loginType) {
            status = EMPTY_ERROR;
        } else {
            status = getEmailError(email, confEmail) || [];
            if (Array.isArray(status) && status.length === 0) {
                status = OK_RESPONSE;
            }
        }

        if (status !== EMPTY_ERROR) {
            if (status.indexOf('email') < 0) {
                this.#emitResponse('email', OK_RESPONSE);
            } else {
                this.#emitResponse('email', BAD_RESPONSE);
            }

            if (status.indexOf('emailConf') < 0 || (!loginType && checkForEmpty(confEmail))) {
                this.#emitResponse('confEmail', OK_RESPONSE);
            } else {
                this.#emitResponse('confEmail', BAD_RESPONSE);
            }
        } else {
            this.#emitResponse('email', OK_RESPONSE);
            this.#emitResponse('confEmail', OK_RESPONSE);
        }
    }

    /**
     * If confirmation email correct will emit 'OK' else 'BAD'
     * If field is empty will return 'OK' without loginType flag
     * If email field is empty will return 'OK' without loginType flag
     *
     * Emit confEmail signal with 'BAD' status if confEmail not correct
     * or empty with loginType flag
     * @param {boolean} loginType if true will return 'BAD' when empty field
     */
    #getConfEmailError(loginType = false) {
        const { email } = super.state;
        const { confEmail } = super.state;
        let status;
        if (checkForEmpty(email) && !loginType) {
            status = EMPTY_ERROR;
        } else {
            status = getEmailError(email, confEmail) || [];
            if (Array.isArray(status) && status.length === 0) {
                status = OK_RESPONSE;
            }
        }

        if (status !== EMPTY_ERROR) {
            this.#emitResponse('confEmail', status);
        } else {
            this.#emitResponse('confEmail', OK_RESPONSE);
        }
    }

    /**
     * If gender correct will emit 'OK' else 'BAD'
     * If gender field is empty will return 'OK' without loginType flag
     *
     * @param {string} sex value from user
     * @param {boolean} loginType if true will return 'BAD' when empty field
     */
    #getSexError(sex, loginType = false) {
        if (!sex) {
            this.#emitResponse('gender', BAD_RESPONSE);
            return;
        }

        const { gender } = sex;
        let status;
        if (checkForEmpty(gender) && !loginType) {
            status = EMPTY_ERROR;
        } else if (gender.length < 2) {
            status = getSexError(...gender);
        } else {
            status = BAD_RESPONSE;
        }

        if (!status) {
            super.changeFieldInState('gender', getSexInString(gender[0]));
            status = OK_RESPONSE;
        }

        if (status !== EMPTY_ERROR) {
            this.#emitResponse('gender', status);
        }
        if (status === EMPTY_ERROR) {
            this.#emitResponse('gender', OK_RESPONSE);
        }
    }

    /**
     * Get value from state with name of nameOfField
     * If name correct then emit 'OK' signal else 'BAD'
     *
     * If empty field without loginType flag emit 'OK'
     * @param {string} nameOfField what field to check
     * @param {boolean} loginType
     */
    #checkName(nameOfField, loginType = false) {
        const valueOfField = super.state[nameOfField];
        let status;

        if (checkForEmpty(valueOfField) && !loginType) {
            status = EMPTY_ERROR;
        } else {
            status = getNameError(valueOfField);
            if (!status) {
                status = OK_RESPONSE;
            }
        }

        if (status !== EMPTY_ERROR) {
            this.#emitResponse(nameOfField, status);
        }
        if (status === EMPTY_ERROR) {
            this.#emitResponse(nameOfField, OK_RESPONSE);
        }
    }

    /**
     * If gender in Store is 'M'/'F'/'O' then change state errors gender to false
     * else change to true
     * */
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
     * If login is incorrect emit signal 'BAD' else 'OK'
     *
     * If login isn't email or username it will generate 'BAD' signal
     * @param {boolean} loginType if true then emit signal on empty field else not emit
     */
    #getLoginError(loginType = false) {
        const login = super.getValueInState('login');

        let errors;
        let nameOfField = 'username';
        if (checkForEmpty(login) && !loginType) {
            errors = EMPTY_ERROR;
        } else if (checkIsEmail(login)) {
            errors = getEmailError(login, login);
            nameOfField = 'email';
        } else {
            errors = getUsernameError(login);
            nameOfField = 'username';
        }

        super.state.errors.login = !!errors;

        if (errors !== EMPTY_ERROR) {
            this.#emitResponse(nameOfField, errors);
        }
        if (errors === EMPTY_ERROR) {
            this.#emitResponse(nameOfField, OK_RESPONSE);
        }
    }

    /**
     * If status not exist or exist and its value equal 'OK' then it will emit
     * signal with value VALIDATION_RESPONSE, nameOfField, 'OK'
     * Update error state with nameOfField to false
     *
     * If status exist or not equal 'OK' then it will emit
     * signal with value VALIDATION_RESPONSE, nameOfField, 'BAD'
     * Update error state with nameOfField to true
     *
     * @param {string} nameOfField what field is emit signal
     * @param status status of validation
     */
    #emitResponse(nameOfField, status) {
        const state = super.state;
        if (!status || status === OK_RESPONSE) {
            this.jsEmit(EventTypes.VALIDATION_RESPONSE, nameOfField, OK_RESPONSE);
            state.errors[nameOfField] = false;
        } else {
            this.jsEmit(EventTypes.VALIDATION_RESPONSE, nameOfField, BAD_RESPONSE);
            state.errors[nameOfField] = true;
        }
    }

    /**
     * Check for errors in login fields. Fields must be upload before this method.
     * If all fields without errors then it will emit signal 'OK'
     * If errors exist then it will emit 'BAD'
     * @param {string} password - value of password
     */
    #checkForErrorsInLogin(password) {
        this.#getLoginError(true);
        this.#getPasswordError(password, true);

        const errors = super.getValueInState('errors');
        let status = OK_RESPONSE;
        for (const errorField in errors) {
            if (errors[errorField] === true && (errorField === 'login' || errorField === 'password')) {
                status = BAD_RESPONSE;
            }
        }

        this.jsEmit(EventTypes.SEND_DATA, status);
    }

    /**
     * Check for errors in registration fields. Fields must be upload before this method.
     * If all fields without errors then it will emit signal 'OK'
     * If errors exist then it will emit 'BAD'
     * @param {string} password - password value to check
     */
    #checkForErrorsInRegistration(password) {
        this.#getErrorsUsername(true);
        this.#getPasswordError(password, true);
        this.#getDayError(true);
        this.#getYearError(true);
        this.#getMonthError(true);
        this.#getEmailError(true);
        this.#getConfEmailError(true);
        this.#checkName('firstName', true);
        this.#checkName('lastName', true);
        this.#checkValueGender();

        const { errors } = super.state;

        let status = OK_RESPONSE;
        for (const errorField in errors) {
            if (errorField !== 'login' && errors[errorField] === true) {
                status = BAD_RESPONSE;
            }
        }

        this.jsEmit(EventTypes.SEND_DATA, status);
    }
}

export default new UserInfoStore();
