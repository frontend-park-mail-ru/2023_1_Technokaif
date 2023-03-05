'use strict';

import { unAuthNavConfig } from '../../utils/config.js';
import { checkIsEmail, getUsernameError, getPasswordError, getEmailError } from '../../utils/validation.js';
import { loginAjax } from '../../api/auth/loginAjaxReq.js';
import { redirect } from '../../modules/redirects.js';
import { ERRORS_LOG as ERRORS } from '../../utils/errors.js';
import { ID_LOG as ID } from '../../utils/id.js';
import { CLASS_LOG as CLASS, logFormSetup } from './authSetup.js';
import { clearField } from '../../utils/clearFields.js';

/**
 *
 * @param {HTMLElement} parent -- where to place Login page
 */
export function renderLogin (parent) {
    const template = Handlebars.compile(document.getElementById('form-template').innerHTML);
    const textElements = template(logFormSetup());

    parent.innerHTML = textElements;

    const loginField = parent.querySelector(`#${ID.login}`);
    loginField.addEventListener('focusout', (e) => {
        const errLogin = document.querySelectorAll(`.${CLASS.errorDiv}`)[0];

        setLoginErrors(errLogin, loginField.value.trim());
    });

    const passwordField = parent.querySelector(`#${ID.password}`);
    passwordField.addEventListener('focusout', (e) => {
        const errPass = document.querySelectorAll(`.${CLASS.errorDiv}`)[1];

        setPassErrors(errPass, passwordField.value);
    });

    parent.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        redirect(unAuthNavConfig.registration, parent);
    });

    const form = parent.querySelector('.log-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const errorPlac = document.querySelector(`.${CLASS.errorDiv}`);
        clearField(errorPlac);

        const errLogin = document.querySelectorAll(`.${CLASS.errorDiv}`)[0];
        const errPass = document.querySelectorAll(`.${CLASS.errorDiv}`)[1];

        const loginValue = loginField.value.trim();
        const passwordValue = passwordField.value;

        let notValidFields = false;
        if (setLoginErrors(errLogin, loginValue)) {
            notValidFields = true;
        };

        if (setPassErrors(errPass, passwordValue) || notValidFields) {
            notValidFields = true;
        }

        if (notValidFields) {
            return null;
        }

        loginAjax(loginValue, passwordValue);
    });
}

/**
 *
 * @param {HTMLElement} errPlace -- where to place error
 * @param {string} loginValue -- value to check
 * @returns true if error is set else false
 */
function setLoginErrors (errPlace, loginValue) {
    clearField(errPlace);

    if (checkIsEmail(loginValue)) {
        if (getEmailError(loginValue, loginValue)) {
            errPlace.innerHTML = `<p class="error">${ERRORS.email}</p>`;
            return true;
        }
        return false;
    }

    if (getUsernameError(loginValue)) {
        errPlace.innerHTML = `<p class="error">${ERRORS.username}</p>`;
        return true;
    }

    return false;
}

/**
 *
 * @param {HTMLElement} errPlace -- where to place error
 * @param {string} passwordValue -- value to check
 * @returns true if error is set else false
 */
function setPassErrors (errPlace, passwordValue) {
    clearField(errPlace);

    if (getPasswordError(passwordValue)) {
        errPlace.innerHTML = `<p class="error">${ERRORS.password}</p>`;
        return true;
    }
    return false;
}
