'use strict'

function checkIsEmail(login) {
    return validateEmail(login, login);
}

function validatePassword(password) {
    return !!((/^.{8,20}$/).test(password) &&
        !(/[^a-z0-9]/i).test(password) &&
        password.search(/[A-Z]/g) &&
        password.search(/[0-9]/g));
}

function validateDay(day) {
    return day >=0 && day <= 31;
}

function validateYear(year) {
    return year >= 1920 && year <= new Date(Date.now()).getFullYear();
}

function validateEmail(email, confirmEmail) {
    if (email !== confirmEmail) {
        return false;
    }

    return /(?:[a-z0-9+!#$%&'*/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(email);
}

function validateCheckbox(checked) {
    return checked;
}

function validateUsername(username) {
    const reg = /^[a-z0-9_]{8,20}$/;
    return reg.test(String(username).toLowerCase());
}
