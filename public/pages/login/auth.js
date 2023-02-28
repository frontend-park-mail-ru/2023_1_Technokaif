'use strict';

import { unAuthNavConfig } from '../../utils/config.js';
import { checkIsEmail, validateUsername, validatePassword } from '../../api/auth/validation.js';
import { loginAjax } from '../../api/auth/loginAjaxReq.js';
import { redirect } from '../../modules/redirects.js';

const ID = {
    login: 'loginField',
    password: 'passwordField'
};

const CLASS = {
    errorTop: 'error-login-all'
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
            titleClass: 'titleClass',
            titleName: 'Fluire',
            descriptionClass: 'descriptionClass',
            descriptionLabelClass: 'descriptionLabelClass',
            descriptionName: 'Log in to continue',
            divBeforeForm: null,
            formDiv: 'formDiv',
            inputs: [
                {
                    divBeforeInput: 'divBeforeInput',
                    typeOfInput: 'text',
                    nameOfField: 'username',
                    placeholder: 'Username',
                    classInp: 'classInp',
                    id: ID.login,
                    errorDiv: 'errorDiv',
                    errorId: null
                },
                {
                    divBeforeInput: 'divBeforeInput',
                    typeOfInput: 'password',
                    nameOfField: 'password',
                    placeholder: 'Password',
                    classInp: 'classInp',
                    id: ID.password,
                    errorDiv: 'errorDiv',
                    errorId: null
                }
            ],
            placementClass: null,
            placementId: null,
            divButton: 'divButton',
            buttonType: 'submit',
            buttonClass: 'buttonClass',
            textButton: 'LOG IN',
            hrClass: null,
            bottomClass: 'bottomClass',
            divBottomLabel: 'divBottomLabel',
            bottomLabelClass: 'bottomLabelClass',
            bottomLabelText: 'Don\'t have an account?',
            linkDiv: 'linkDiv',
            linkHref: '/',
            linkClass: 'linkClass',
            linkText: 'Registration'
        });

    parent.innerHTML = textElements;

    const loginField = parent.querySelector(`#${ID.login}`);
    loginField.addEventListener('focusout', (e) => {
        const errLogin = parent.querySelectorAll('.errorDiv')[0];
        errLogin.innerHTML = '';
        if (!validateUsername(loginField.value.trim())) {
            errLogin.innerHTML = 'Login is invalid';
        }
    });

    const passwordField = parent.querySelector(`#${ID.password}`);
    passwordField.addEventListener('focusout', (e) => {
        const errPass = parent.querySelectorAll('.errorDiv')[1];
        errPass.innerHTML = '';
        if (!validatePassword(passwordField.value)) {
            errPass.innerHTML = 'Password is invalid';
        }
    });

    parent.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        redirect(unAuthNavConfig.registration, parent);
    });

    const form = parent.querySelector('.formDiv');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const errorPlac = parent.querySelector(`.${CLASS.errorTop}`);
        errorPlac.innerHTML = '';

        const errLogin = parent.querySelectorAll('.errorDiv')[0];
        const errPass = parent.querySelectorAll('.errorDiv')[1];

        let notValidFields = false;

        const loginValue = loginField.value.trim();
        const passwordValue = passwordField.value;

        errLogin.innerHTML = '';
        if (!checkIsEmail(loginValue)) {
            if (!validateUsername(loginValue)) {
                errLogin.innerHTML = 'Login is invalid';
                notValidFields = true;
            }
        }

        errPass.innerHTML = '';
        if (!validatePassword(passwordValue)) {
            errPass.innerHTML = 'Password is invalid';
            notValidFields = true;
        }

        if (notValidFields) {
            return null;
        }

        loginAjax(loginValue, passwordValue);
    });
}
