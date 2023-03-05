'use strict';

import { MONTHS } from './config.js';
import { ERRORS_VALIDATE as ERRORS } from './validateConf.js';

// TODO Rewrite docs

/**
 *
 * @param {string} login -- string to check
 * @returns {bool} -- return true if login contains @
 */
export function checkIsEmail (login) {
    return !!login.match('@');
}

/**
 *
 * @param {string} password -- password to validate
 * @returns {bool} -- return true if password contains:
 * only digits and symbols from a to z
 * has 1 or more big letters like 'A'
 * has 1 or more digits like '0'
 * has length between 8 and 20
 */
export function getPasswordError (password) {
    if ((!(/[\'\"\ \:]/g).test(password) &&
    (/.{8,30}/g).test(password)) &&
    (/[A-Z]/g).test(password) &&
    (/[0-9]/g).test(password) &&
    (/[a-z]/g).test(password)) {
        return null;
    };

    return ERRORS.password;
}

/**
 *
 * @param {string} day -- day to check
 * @returns {bool} --return true if day is correct:
 * in the range 1-31
 */
export function getDayError (day) {
    // todo: check not similar mounth
    // todo check for empty string
    if (day > 1 && day <= 31) {
        return null;
    }

    return ERRORS.day;
}

/**
 *
 * @param {string} year -- year to validate
 * @returns {bool} -- return true if year >= 0 and year <= current year
 */
export function getYearError (year) {
    // todo check for empty string
    if (year > 0 && year <= new Date(Date.now()).getFullYear()) {
        return null;
    };

    return ERRORS.year;
}

export function getMonthError (month) {
    if (MONTHS.includes(month)) {
        return null;
    };

    return ERRORS.month;
}

/**
 *
 * @param {string} email -- email to validate
 * @param {string} confirmEmail --if confirmEmail empty, function only validate email.
 * if not empty, function check for email and confirmEmail to be equal
 * @returns {bool} -- true if email is correct and false if not correct
 * Correct email:
 *  Len 8-30;
 *  Don't have:
 *   ..;
 *   .-_ in end;
 *   <>()[],;:\/"
 */
export function getEmailError (email, confirmEmail = '') {
    let result = [];

    if (email !== confirmEmail || confirmEmail === '') {
        result.push(ERRORS.emailConf);
    }

    if (email.length < 8 || email.length > 30) {
        result.push(ERRORS.email);
        return result;
    }

    if (email.search('..') === -1) {
        result.push(ERRORS.email);
        return result;
    }

    const lastSymb = email[email.length];
    if (lastSymb === '.' || lastSymb === '-' || lastSymb === '_') {
        result.push(ERRORS.email);
        return result;
    }

    if (!((/^[\w]+[\w\.\-]*@{1}[\w]+[\.]*[\w\.\-]*/gmi).test(email) && // symbols check
    (!(/[\<\>\(\)\[\]\,\;\:\\\/\"]/gmi).test(email)))) {
        result.push(ERRORS.email);
    }; // check for forbiden symbols

    if (result.length === 0) {
        result = null;
    }

    return result;
}

export function getSexError (...boxes) {
    let isInputCorrect = false;
    boxes.forEach((box) => {
        if (box) {
            if (isInputCorrect) {
                return ERRORS.sex;
            }
            isInputCorrect = true;
        }
    });

    if (!isInputCorrect) {
        return ERRORS.sex;
    }

    return null;
}

/**
 *
 * @param {string} username -- username to validate
 * @returns {bool} -- return true if:
 * username len 4-30 and contains only _, letters, digits
 */
export function getUsernameError (username) {
    if ((/^[\w]{4,20}$/gmi).test(username) &&
    !(/[^\w]/gmi).test(username)) {
        return null;
    };

    return ERRORS.username;
}

/**
 *
 * @param {string} name -- name to validate
 * @returns {bool} -- return true if len 2-20 and contains only letters
 */
export function getNameError (name) {
    if ((/^[a-z]{2,20}$/gmi).test(name) &&
    !(/[^a-z]/gmi).test(name)) {
        return null;
    };

    return ERRORS.name;
}

export function getAllErrors (...params) {
    const result = [];

    const emailErrors = getEmailError(params[0], params[1]);
    if (emailErrors) {
        emailErrors.forEach((el) => {
            result.push(el);
        });
    }

    result.push(getPasswordError(params[2]));
    result.push('first' + getNameError(params[3]));
    result.push('last' + getNameError(params[4]));
    result.push(getUsernameError(params[5]));
    result.push(getDayError(params[6]));
    result.push(getMonthError(params[7]));
    result.push(getYearError(params[8]));
    result.push(getSexError(params[9], params[10], params[11]));

    return result.filter(Boolean);
}
