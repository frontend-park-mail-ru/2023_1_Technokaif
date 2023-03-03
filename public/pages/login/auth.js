'use strict';

import { unAuthNavConfig } from '../../utils/config.js';
import { checkIsEmail, getUsernameError, getPasswordError, getEmailError } from '../../utils/validation.js';
import { loginAjax } from '../../api/auth/loginAjaxReq.js';
import { redirect } from '../../modules/redirects.js';
import { ERRORS_LOG as ERRORS } from '../../utils/errors.js';
import { ID_LOG as ID } from '../../utils/id.js';
import { CLASS_LOG as CLASS, logFormSetup } from './authSetup.js';
import { clearField } from '../../utils/clearFields.js';

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
        console.log('here');

        const errorPlac = document.querySelector(`.${CLASS.errorDiv}`);
        clearField(errorPlac);

        const errLogin = document.querySelectorAll(`.${CLASS.errorDiv}`)[0];
        const errPass = document.querySelectorAll(`.${CLASS.errorDiv}`)[1];

        const loginValue = loginField.value.trim();
        const passwordValue = passwordField.value;

        let notValidFields = false;
        if (setLoginErrors(errLogin, loginValue) || setPassErrors(errPass, passwordValue)) {
            notValidFields = true;
        };

        if (notValidFields) {
            return null;
        }

        loginAjax(loginValue, passwordValue);
    });
}

function setLoginErrors (errPlace, loginValue) {
    clearField(errPlace);
    if (checkIsEmail(loginValue)) {
        if (getEmailError(loginValue)) {
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

function setPassErrors (errPlace, passwordValue) {
    clearField(errPlace);
    if (getPasswordError(passwordValue)) {
        errPlace.innerHTML = `<p class="error">${ERRORS.password}</p>`;
        return true;
    }
    return false;
}
