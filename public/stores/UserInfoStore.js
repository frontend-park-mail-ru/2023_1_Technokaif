import IStore from './IStore';
import {
    getUsernameError, getPasswordError, getDayError, getYearError, getMonthError, getEmailError, getSexError, getNameError, getAllErrors,
} from '../utils/functions/validation.js';
import Actions from '../actions/Actions';

/**
 * Class for user data storing.
 */
class UserInfoStore extends IStore {
    #info;

    #username;

    #day;

    #year;

    #month;

    #email;

    #confEmail;

    #firstName;

    #lastName;

    #sex;

    dispatch(action) {
        super.dispatch();
        switch (action.nameOfField) {
        case 'username':
            this.#username = action.content;
            this.#getErrorsUsername();
            break;
        case 'password':
            this.#getPasswordError(action.content);
            break;
        case 'day':
            this.#day = action.content;
            this.#getDayError();
            break;
        case 'month':
            this.#month = action.content;
            this.#getMonthError();
            break;
        case 'year':
            this.#year = action.content;
            this.#getYearError();
            break;
        case 'email':
            this.#email = action.content;
            this.#getEmailError();
            break;
        case 'confEmail':
            this.#confEmail = action.content;
            this.#getConfEmailError();
            break;
        case 'sex':
            this.#sex = action.content;
            this.getSexError();
            break;
        case 'firstName':
            this.#firstName = action.content;
            this.#getFirstNameError();
            break;
        case 'lastName':
            this.#lastName = action.content;
            this.#getLastNameError();
            break;
        case 'all':
            this.#checkForAllErrors(action.content);
            break;
        default:
        }
    }

    #getErrorsUsername() {
        const status = getUsernameError(username);

        emitResponse('username', status);
    }

    #getPasswordError(password) {
        const status = getPasswordError(password);

        emitResponse('password', status);
    }

    #getDayError() {
        const status = getDayError(day);

        emitResponse('day', status);
    }

    #getYearError() {
        const status = getYearError(year);

        emitResponse('year', status);
    }

    #getMonthError() {
        const status = getMonthError(month);

        emitResponse('month', status);
    }

    #getEmailError() {
        const status = getEmailError(email, email);

        emitResponse('email', status);
    }

    #getConfEmailError() {
        const status = getEmailError(email, confEmail);

        emitResponse('confEmail', status);
    }

    #getSexError() {
        const status = getSexError(boxes);

        emitResponse(username, status);
    }

    #getFirstNameError() {
        const status = getNameError(firstName);

        emitResponse(firstName, status);
    }

    #getLastNameError() {
        const status = getNameError(lastName);

        emitResponse(lastName, status);
    }

    #checkForAllErrors(password) {
        const status = getAllErrors(
            this.#email,
            this.#confEmail,
            password,
            this.#firstName,
            this.#lastName,
            this.#username,
            this.#day,
            this.#month,
            this.#year,
            this.#sex,
        );

        this.#emitResponse('all', status);
    }

    #emitResponse(nameOfField, status) {
        if (!status) {
            Actions.validationResponse(nameOfField, 'GOOD');
        } else {
            Actions.validationResponse(nameOfField, 'BAD');
        }
    }
}
