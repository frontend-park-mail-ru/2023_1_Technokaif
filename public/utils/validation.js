'use strict';
// todo transfer in config
import { MONTHS } from './config.js';

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
export function validatePassword (password) {
        return (!(/[\'\"\ \:]/g).test(password) &&
    (/.{8,30}/g).test(password)) &&
    (/[A-Z]/g).test(password) &&
    (/[0-9]/g).test(password) &&
    (/[a-z]/g).test(password);
}

/**
 *
 * @param {string} day -- day to check
 * @returns {bool} --return true if day is correct:
 * in the range 1-31
 */
export function validateDay (day) {
    // todo: check not similar mounth
    // todo check for empty string
    return day > 1 && day <= 31;
}

/**
 *
 * @param {string} year -- year to validate
 * @returns {bool} -- return true if year >= 0 and year <= current year
 */
export function validateYear (year) {
    // todo check for empty string
    return year >= 0 && year <= new Date(Date.now()).getFullYear();
}

export function validateMonth (month) {
    return MONTHS.includes(month);
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
export function validateEmail (email, confirmEmail = '') {
    // todo async
    if (confirmEmail !== '') {
        if (email !== confirmEmail) {
            return false;
        }
    }

    if (email.length < 8 || email.length > 30) {
        return false;
    }

    if (email.search('..') === -1) {
        return false;
    }

    const lastSymb = email[email.length];
    if (lastSymb === '.' || lastSymb === '-' || lastSymb === '_') {
        return false;
    }

    return ((/^[\w]+[\w\.\-]*@{1}[\w]+[\.]*[\w\.\-]*/gmi).test(email) && // symbols check
    (!(/[\<\>\(\)\[\]\,\;\:\\\/\"]/gmi).test(email))); // check for forbiden symbols
}

export function validateCheckbox (...boxes) {
    let isInputCorrect = false;
    boxes.forEach((box) => {
        if (box) {
            if (isInputCorrect) {
                return false;
            }
            isInputCorrect = true;
        }
    });

    return isInputCorrect;
}

/**
 *
 * @param {string} username -- username to validate
 * @returns {bool} -- return true if:
 * username len 4-30 and contains only _, letters, digits
 */
export function validateUsername (username) {
    return (/^[\w]{4,20}$/gmi).test(username) &&
    !(/[^\w]/gmi).test(username);
}

/**
 *
 * @param {string} name -- name to validate
 * @returns {bool} -- return true if len 2-20 and contains only letters
 */
export function validateName (name) {
    return ((/^[a-z]{2,20}$/gmi).test(name) &&
    !(/[^a-z]/gmi).test(name));
}

export function validateAll (...params) {
    const result = [];

    validateEmail(params[0]) ? '' : result.push('email');
    validateEmail(params[0], params[1]) ? '' : result.push('emailConf');
    validatePassword(params[2]) ? '' : result.push('password');
    validateName(params[3]) ? '' : result.push('first-name');
    validateName(params[4]) ? '' : result.push('last-name');
    validateUsername(params[5]) ? '' : result.push('username');
    validateDay(params[6]) ? '' : result.push('day');
    validateMonth(params[7]) ? '' : result.push('month');
    validateYear(params[8]) ? '' : result.push('year');
    validateCheckbox(params[9], params[10], params[11]) ? '' : result.push('sex');

    return result;
}