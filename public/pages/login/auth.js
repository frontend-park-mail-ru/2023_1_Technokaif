'use strict';

import { unAuthNavConfig } from '../../utils/config.js';
import { checkIsEmail, validateUsername, validatePassword, validateEmail } from '../../api/auth/validation.js';
import { loginAjax } from '../../api/auth/loginAjaxReq.js';
import { redirect } from '../../modules/redirects.js';

const ID = {
    login: 'loginField',
    password: 'passwordField'
};

const ERRORS = {
    password: 'Your password is incorrect or empty. Forbiden: \' \" space \:. One big letter, one small letter, one digit minimum. Len 8-30',
    email: 'Enter a correct email address. Contains one @. Forbiden: .. , <> () [] \',\' ; : \\ \/. .-_ at end of email. Len 8-30',
    username: 'Your username is incorrect. Contains (a-z), (0-9), _ and len 8-30'
};

const CLASS = {
    errorTop: 'error-server'
};

export function renderLogin (parent) {
    const template = Handlebars.compile(document.getElementById('form-template').innerHTML);
    const textElements = template(
        {
            errorTop: CLASS.errorTop,
            topID: null,
            content: 'content',
            header: 'header',
            title: 'title',
            titleClass: 'page-title',
            titleName: 'Fluire',
            descriptionClass: 'page-description',
            descriptionLabelClass: 'descriptionLabel',
            descriptionName: 'Log in to continue',
            divBeforeForm: 'log',
            formDiv: 'log-form',
            inputs: [
                {
                    divBeforeInput: 'log-field',
                    typeOfInput: 'text',
                    nameOfField: 'username',
                    placeholder: 'Username',
                    classInp: 'log-input',
                    id: ID.login,
                    errorDiv: 'log-error',
                    errorId: null
                },
                {
                    divBeforeInput: 'log-field',
                    typeOfInput: 'password',
                    nameOfField: 'password',
                    placeholder: 'Password',
                    classInp: 'log-input',
                    id: ID.password,
                    errorDiv: 'log-error',
                    errorId: null
                }
            ],
            placementClass: null,
            placementId: null,
            divButton: 'log-btn auth-btn',
            buttonType: 'submit',
            buttonClass: 'log-but',
            textButton: 'Sign In',
            hrClass: 'auth-form-hr',
            bottomClass: 'log-bottom',
            divBottomLabel: 'have-acc-label',
            bottomLabelClass: 'have-acc',
            bottomLabelText: 'Don\'t have an account?',
            linkDiv: 'linkDiv',
            linkHref: '/',
            linkClass: 'log-reg-btn auth-btn',
            linkText: 'Registration'
        });

    parent.innerHTML = textElements;

    const loginField = parent.querySelector(`#${ID.login}`);
    loginField.addEventListener('focusout', (e) => {
        const errLogin = document.querySelectorAll('.log-error')[0];
        errLogin.innerHTML = '';
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
        const errPass = document.querySelectorAll('.log-error')[1];
        errPass.innerHTML = '';
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

        const errorPlac = document.querySelector(`.${CLASS.errorTop}`);
        errorPlac.innerHTML = '';

        const errLogin = document.querySelectorAll('.log-error')[0];
        const errPass = document.querySelectorAll('.log-error')[1];

        let notValidFields = false;

        const loginValue = loginField.value.trim();
        const passwordValue = passwordField.value;

        errLogin.innerHTML = '';
        if (!validateUsername(loginValue) && !validateEmail(loginValue)) {
            if (checkIsEmail(loginValue)) {
                errLogin.innerHTML = `<p class="error">${ERRORS.email}</p>`;
            } else {
                errLogin.innerHTML = `<p class="error">${ERRORS.username}</p>`;
            }
        }

        errPass.innerHTML = '';
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
