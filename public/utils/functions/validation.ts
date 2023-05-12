import { MONTHS } from '@config/config';
import {
    ERRORS_VALIDATE as ERRORS,
    PASSWORD_ERROR,
    USERNAME_ERROR,
} from '@config/validateConf';

const ALPHABET_BIG = 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
const ALPHABET_SMALL = 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const DIGITS = '0123456789';
const FORBIDDEN_EMAIL_SYMBOLS = '<>()[],;:\\/';

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

    if (email.length < 8 || email.length > 30) {
        result.push(ERRORS.email);
        return result;
    }

    if (email.search('..') === -1) {
        result.push(ERRORS.email);
        return result;
    }

    if (!email.includes('@')) {
        result.push(ERRORS.email);
        return result;
    }

    if (email[email.indexOf('@') + 1] === '.') {
        result.push(ERRORS.email);
        return result;
    }
    const emailAfter = email.substring(email.indexOf('@') + 1);
    if (!(emailAfter.includes('.'))) {
        result.push(ERRORS.email);
        return result;
    }

    if (emailAfter.includes('@')) {
        result.push(ERRORS.email);
        return result;
    }

    const lastSymb = email[email.length];
    if (lastSymb === '.' || lastSymb === '-' || lastSymb === '_') {
        result.push(ERRORS.email);
        return result;
    }

    for (let i = 0; i < email.length; i++) {
        if (FORBIDDEN_EMAIL_SYMBOLS.includes(email[i])) {
            result.push(ERRORS.email);
            return result;
        }

        if (!(ALPHABET_BIG.includes(email[i]) || ALPHABET_SMALL.includes(email[i])
            || DIGITS.includes(email[i]) || '@.-_'.includes(email[i]))) {
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

    const date = new Date(`${year}-${month}-${day}`);
    if (date.getDate() !== Number(day) || MONTHS[date.getMonth()] !== month) {
        return ERRORS.dayIncorrect;
    }
    if (date.getTime() < Date.now()) {
        return null;
    }
    return ERRORS.date;
}
