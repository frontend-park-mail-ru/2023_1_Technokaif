'use strict';
// todo transfer in config
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];

export function checkIsEmail (login) {
    return validateEmail(login, login);
}

export function validatePassword (password) {
    return ((/^.{8,20}$/).test(password) &&
        !(/[^a-z0-9]/i).test(password) &&
        password.search(/[A-Z]/g) &&
        password.search(/[0-9]/g));
}

export function validateDay (day) {
    // todo check not similar mounth
    // todo check for empty string
    return day >= 0 && day <= 31;
}

export function validateYear (year) {
    // todo check for empty string
    return year >= 1920 && year <= new Date(Date.now()).getFullYear();
}

export function validateMonth (mounth) {
    if (MONTHS.includes(mounth)) {
        return true;
    };
    return false;
}

export function validateEmail (email, confirmEmail) {
    if (confirmEmail) {
        if (email !== confirmEmail) {
            return false;
        }
    }

    return /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(email);
}

export function validateCheckbox (...boxes) {
    let flag = false;
    boxes.forEach((box) => {
        if (!box) {
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
    return reg.test(String(username).toLowerCase());
}
