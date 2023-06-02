import { MONTHS } from '@config/config';
import {
    ERRORS_VALIDATE as ERRORS,
    PASSWORD_ERROR,
    USERNAME_ERROR,
} from '@config/validateConf';

const ALPHABET_BIG = 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
const ALPHABET_SMALL = 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const DIGITS = '0123456789';
// const FORBIDDEN_EMAIL_SYMBOLS = '<>()[],;:\\/';

/**
 *
 * @param {string} login -- string to check
 * @return {boolean} -- return true if login contains @
 */
export function checkIsEmail(login) {
    if (!login || login === '') {
        return false;
    }
    return login.includes('@');
}

/**
 *
 * @param {string} password -- password to validate
 * @return return null if password correct else return 'password'
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
export function getPasswordError(password) {
    if (password === '') {
        return PASSWORD_ERROR.empty_field;
    }

    if (password.includes('\'') || password.includes('"')
        || password.includes(' ') || password.includes(':')) {
        return PASSWORD_ERROR.forbidden_symbols;
    }

    if (password.length < 8 || password.length > 30) {
        return PASSWORD_ERROR.length;
    }

    let isBigExist = false;
    let isSmallExist = false;
    let isDigitsExist = false;

    for (let i = 0; i < password.length; i++) {
        if (ALPHABET_BIG.includes(password[i])) {
            isBigExist = true;
        }

        if (ALPHABET_SMALL.includes(password[i])) {
            isSmallExist = true;
        }

        if (DIGITS.includes(password[i])) {
            isDigitsExist = true;
        }
    }

    if (isBigExist && isSmallExist && isDigitsExist) {
        return null;
    }

    return PASSWORD_ERROR.letters;
}

/**
 *
 * @param {string} day -- day to check
 * @return return null if day is correct:
 * in the range 1-31
 *
 * else return 'day'
 */
export function getDayError(day) {
    if (day >= 1 && day <= 31) {
        return null;
    }

    return ERRORS.day;
}

/**
 *
 * @param {string} year -- year to validate
 * @return return null if year > 0 and year <= current year
 *
 * else 'year'
 */
export function getYearError(year) {
    if (year > 1850 && year <= new Date(Date.now()).getFullYear()) {
        return null;
    }

    return ERRORS.year;
}

/**
 *
 * @param {string} month
 * @return null if month in MONTHS struct else return 'month'
 */
export function getMonthError(month) {
    if (MONTHS.includes(month)) {
        return null;
    }

    return ERRORS.month;
}

/**
 * Return integer value of month string
 * @param {string} monthStr
 * @returns {int}  month number
 */
export function translateMonthStrToInt(monthStr) {
    return MONTHS.findIndex((month) => monthStr === month) + 1;
}

/**
 *
 * @param {string} email -- email to validate
 * @param {string} confirmEmail --if confirmEmail empty, function only validate email.
 * if not empty, function check for email and confirmEmail to be equal
 * @return nill if email is correct and 'email' if not correct
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
export function getEmailError(email, confirmEmail = '') {
    let result:string[]|null = [];

    if (!email || email === '') {
        return ERRORS.email;
    }

    if (email !== confirmEmail || confirmEmail === '') {
        result.push(ERRORS.emailConf);
    }

    if (email.length < 8 || email.length > 255) {
        result.push(ERRORS.email);
        return result;
    }

    // RFC 2822 https://www.w3resource.com/javascript/form/email-validation.php
    // eslint-disable-next-line no-control-regex
    const regExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!regExp.test(email)) {
        result.push(ERRORS.email);
        return result;
    }

    if (result.length === 0) {
        result = null;
    }

    return result;
}

/**
 *
 * @param {string} username -- username to validate
 * @return null if correct else 'username'
 *
 * Correct:
 * username length 4-20 and contains only _, letters, digits
 */
export function getUsernameError(username) {
    if (!username || username === '') {
        return USERNAME_ERROR.empty_field;
    }
    if (username.length < 4 || username.length > 20) {
        return USERNAME_ERROR.length;
    }

    for (let i = 0; i < username.length; i++) {
        if (!(ALPHABET_BIG.includes(username[i]) || ALPHABET_SMALL.includes(username[i])
            || DIGITS.includes(username[i]) || '_'.includes(username[i]))) {
            return USERNAME_ERROR.letters;
        }
    }

    return null;
}

/**
 *
 * @param {string} name -- name to validate
 * returns null if correct else return 'name'
 *
 * Correct: if length 2-20 and contains only letters
 */
export function getNameError(name) {
    if (!name || name === '') {
        return ERRORS.name;
    }
    if (name.length < 2 || name.length > 20) {
        return ERRORS.name;
    }

    for (let i = 0; i < name.length; i++) {
        if (!(ALPHABET_BIG.includes(name[i]) || ALPHABET_SMALL.includes(name[i]))) {
            return ERRORS.name;
        }
    }

    return null;
}

/** Check if date is correct */
export function dateValidate(day, month, year) {
    if (!day || !month || !year) {
        return null;
    }

    const ind = MONTHS.findIndex((el) => el === month);
    const date = new Date(`${year}/${ind + 1}/${day}`);

    if (date.getDate() !== Number(day) || MONTHS[date.getMonth()] !== month) {
        return ERRORS.dayIncorrect;
    }
    if (date.getTime() < Date.now()) {
        return null;
    }
    return ERRORS.date;
}
