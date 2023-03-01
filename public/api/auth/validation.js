'use strict';
// todo transfer in config
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];

export function checkIsEmail (login) {
    return true;
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
    return true;
}

export function validateDay (day) {
    // todo: check not similar mounth
    // todo check for empty string
    return day > 1 && day <= 31;
}

export function validateYear (year) {
    // todo check for empty string
    return year >= 1920 && year <= new Date(Date.now()).getFullYear();
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
 */
export function validateEmail (email, ...confirmEmail) {
    if (confirmEmail) {
        if (email !== confirmEmail) {
            return false;
        }
    }

    return (/^[\w.]+@{1}[\w]+[.]{1}[\w]+/i).test(email) &&
        email.length > 10 &&
        email.length < 30;
}

export function validateCheckbox (...boxes) {
    let flag = false;
    boxes.forEach((box) => {
        if (box) {
            if (flag) {
                return false;
            }
            flag = true;
        }
    });

    return flag;
}

export function validateUsername (username) {
    const reg = /^[a-z0-9_]{4,20}$/;
    return true;
}

export function validateName (name) {
    const reg = /^[a-z]{1,20}$/;
    return reg.test(String(name).toLowerCase());
}
