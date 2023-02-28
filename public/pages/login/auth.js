'use strict';

import { unAuthNavConfig } from '../../utils/config.js';
import { checkIsEmail, validateUsername, validatePassword } from '../../api/auth/validation.js';
import { loginAjax } from '../../api/auth/loginAjaxReq.js';
import { redirect } from '../../modules/redirects.js';

const ID = {
    form: 'idForm',
    login: 'loginField',
    password: 'passwordField',
    errorLogin: 'errorPlace'
};

export function renderLogin (parent) {
    const template = Handlebars.compile(document.getElementById('form-template').innerHTML);
    const textElements = template(
        {
            errorTop: 'error-login-all',
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
                    id: ID.loginField,
                    errorDiv: 'errorDiv',
                    errorId: null
                },
                {
                    divBeforeInput: 'divBeforeInput',
                    typeOfInput: 'password',
                    nameOfField: 'password',
                    placeholder: 'Password',
                    classInp: 'classInp',
                    id: ID.passwordField,
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

    const form = document.getElementsById(ID.form);
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const login = document.getElementById(ID.login);
        const password = document.getElementById(ID.password);

        const errorPlac = document.getElementById(ID.errorLogin);
        errorPlac.innerHTML = '';

        const loginValue = login.value.trim();
        if (!checkIsEmail(loginValue)) {
            if (!validateUsername(loginValue)) {
                // todo string can be global const
                errorPlac.innerHTML = '<p> Invalid data</p>';
                return null;
            }
        }

        if (!validatePassword(password.value)) {
            errorPlac.innerHTML = '<p> Invalid data</p>';
            return null;
        }

        loginAjax(login, password);
    });

    // todo check if className same
    console.log('elements');
    parent.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        alert('Alert');
        // redirect(unAuthNavConfig.registration, parent);
    });
}
