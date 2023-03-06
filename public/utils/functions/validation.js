'use strict';

import { MONTHS } from '../config/config.js';
import { ERRORS_VALIDATE as ERRORS } from '../config/validateConf.js';

const alphabetBig = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphabetSmall = 'abcdefghijklmnopqrstuvwxyz';
const digits = '0123456789';
const forbidenEmailSymb = '<>()[],;:\\/';

/**
 *
 * @param {string} login -- string to check
 * @returns {bool} -- return true if login contains @
 */
export function checkIsEmail (login) {
    return login.includes('@');
}

/**
 *
 * @param {string} password -- password to validate
 * @returns return null if password correct else return 'password'
 * @description
 * correct password contains:
 *  1 or more big letters like 'A';
 *  1 or more small letters lie 'a';
 *  1 or more digits like '0';
 *  length between 8 and 30;
 *
 * don't contain:
 *
 *  symbols: ' " : space";
 */
export function getPasswordError (password) {
    if (password.includes('\'') || password.includes('\"') ||
        password.includes('\ ') || password.includes('\:')) {
        return ERRORS.password;
    }

    if (password.length < 8 || password.length > 30) {
        return ERRORS.password;
    }

    let isBigExist = false;
    let isSmallExist = false;
    let isDigitsExist = false;

    for (let i = 0; i < password.length; i++) {
        if (alphabetBig.includes(password[i])) {
            isBigExist = true;
        }

        if (alphabetSmall.includes(password[i])) {
            isSmallExist = true;
        }

        if (digits.includes(password[i])) {
            isDigitsExist = true;
        }
    }

    if (isBigExist && isSmallExist && isDigitsExist) {
        return null;
    }

    return ERRORS.password;
};

/**
 *
 * @param {string} day -- day to check
 * @returns return null if day is correct:
 * in the range 1-31
 *
 * else return 'day'
 */
export function getDayError (day) {
    if (day >= 1 && day <= 31) {
        return null;
    }

    return ERRORS.day;
}

/**
 *
 * @param {string} year -- year to validate
 * @returns return null if year > 0 and year <= current year
 *
 * else 'year'
 */
export function getYearError (year) {
    if (year > 0 && year <= new Date(Date.now()).getFullYear()) {
        return null;
    };

    return ERRORS.year;
}

/**
 *
 * @param {string} month
 * @returns null if month in MONTHS struct else return 'month'
 */
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
 * @returns nill if email is correct and 'email' if not correct
 *
 * if confirmEmail given then return 'confemail' if email != confirmEmail
 *
 * Correct email:
 *  Length 8-30;
 *
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

    for (let i = 0; i < email.length; i++) {
        if (forbidenEmailSymb.includes(email[i])) {
            result.push(ERRORS.email);
            return result;
        }

        if (!(alphabetBig.includes(email[i]) || alphabetSmall.includes(email[i]) ||
            digits.includes(email[i]) || '.-_'.includes(email[i]))) {
            result.push(ERRORS.email);
        }
    }

    if (result.length === 0) {
        result = null;
    }

    return result;
}

/**
 *
 * @param  {...any} boxes -- true of false values
 * @returns null if correct else return 'sex'
 *
 * Correct:
 *  Only one true value;
 *  One true value exist;
 */
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
 * @returns null if correct else 'username'
 *
 * Correct:
 * username length 4-20 and contains only _, letters, digits
 */
export function getUsernameError (username) {
    if (username.length < 4 || username.length > 20) {
        return ERRORS.username;
    }

    for (let i = 0; i < username.length; i++) {
        if (!(alphabetBig.includes(username[i]) || alphabetSmall.includes(username[i]) ||
            digits.includes(username[i]))) {
            return ERRORS.username;
        }
    }

    return null;
}

/**
 *
 * @param {string} name -- name to validate
 * @returns null if correct else return 'name'
 *
 * Correct: if length 2-20 and contains only letters
 */
export function getNameError (name) {
    if (name.length < 2 || name.length > 20) {
        return ERRORS.name;
    }

    for (let i = 0; i < name.length; i++) {
        if (!(alphabetBig.includes(name[i]) || alphabetSmall.includes(name[i]))) {
            return ERRORS.name;
        }
    }

    return ERRORS.name;
}

/**
 *
 * @param  {...any} params -- all params to check
 * [0, 1] -- email and confirm email
 * [2] -- password
 * [3] -- firstName
 * [4] -- lastName
 * [5] -- username
 * [6] -- day
 * [7] -- month
 * [8] -- year
 * [9-11] -- sex
 * @returns null if correct else return array of strings with error elements
 */
export function getAllErrors (...params) {
    const result = [];

    const emailErrors = getEmailError(params[0], params[1]);
    if (emailErrors) {
        emailErrors.forEach((el) => {
            result.push(el);
        });
    }

    result.push(getPasswordError(params[2]));

    const firstErr = getNameError(params[3]);
    const lastErr = getNameError(params[4]);

    if (firstErr) {
        result.push('first' + firstErr);
    }

    if (firstErr) {
        result.push('last' + lastErr);
    }

    result.push(getUsernameError(params[5]));
    result.push(getDayError(params[6]));
    result.push(getMonthError(params[7]));
    result.push(getYearError(params[8]));
    result.push(getSexError(params[9], params[10], params[11]));

    return result.filter(Boolean);
}
