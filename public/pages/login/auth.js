'use strict';

import { unAuthNavConfig } from '../../utils/config.js';
import { checkIsEmail, validateUsername, validatePassword, validateEmail } from '../../utils/validation.js';
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
        clearField(errLogin);

        if (!validateUsername(loginField.value.trim()) && !validateEmail(loginField.value.trim())) {
            if (checkIsEmail(loginField.value.trim())) {
                errLogin.innerHTML = `<p class="error">${ERRORS.email}</p>`;
            } else {
                errLogin.innerHTML = `<p class="error">${ERRORS.username}</p>`;
            }
        }
    });

    const passwordField = parent.querySelector(`#${ID.password}`);
    passwordField.addEventListener('focusout', (e) => {
        const errPass = document.querySelectorAll(`.${CLASS.errorDiv}`)[1];
        clearField(errPass);

        if (!validatePassword(passwordField.value)) {
            errPass.innerHTML = `<p class="error">${ERRORS.password}</p>`;
        }
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

        let notValidFields = false;

        const loginValue = loginField.value.trim();
        const passwordValue = passwordField.value;

        clearField(errLogin);
        if (!validateUsername(loginValue) && !validateEmail(loginValue)) {
            if (checkIsEmail(loginValue)) {
                errLogin.innerHTML = `<p class="error">${ERRORS.email}</p>`;
            } else {
                errLogin.innerHTML = `<p class="error">${ERRORS.username}</p>`;
            }
        }

        clearField(errPass);
        if (!validatePassword(passwordValue)) {
            errPass.innerHTML = `<p class="error">${ERRORS.password}</p>`;
            notValidFields = true;
        }

        if (notValidFields) {
            return null;
        }

        loginAjax(loginValue, passwordValue);
    });
}
