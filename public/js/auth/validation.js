'use strict'

function validatePassword(password) {

}

function validateDay(password) {

}

function validateYear(password) {

}
function validateEmail(email, confirmEmail) {
    if (email !== confirmEmail) {
        return false;
    }

    return true;
}

function validateCheckbox(checked) {
    return checked;
}