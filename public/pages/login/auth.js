'use strict';

import {createInput} from "../../utils/utils.js"
import {renderSignup} from "../registration/registration.js";
import {unAuthNavConfig} from "../../utils/config.js";
import {checkIsEmail, validateUsername, validatePassword} from "../../api/auth/validation.js"
import {loginAjax} from "../../api/auth/loginAjaxReq.js"

export function renderLogin (parent) {
    const form = document.createElement('form');

    const mainLabelDiv = createElementAndAppend(form, 'div', 'blockMainLabel');

    createElementAndAppend(mainLabelDiv, 'p', 'whatOperation').textContent = 'Fluire';
    createElementAndAppend(mainLabelDiv, 'p', 'operationDescription').textContent = 'Log in to continue';

    const elements = createElementAndAppend(mainLabelDiv, 'div', 'blockMainLabel', 'elements');
    createElementAndAppend(elements, 'div', 'error-login');

    const loginInput = createInput('email', 'Email', 'email');
    const passwordInput = createInput('password', 'Password', 'password');

    const submitBtn = document.createElement('span');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Sign in';

    elements.appendChild(loginInput);
    elements.appendChild(passwordInput);
    elements.appendChild(submitBtn);

    form.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.type !== 'submit') {
            return;
        }

        const login = loginInput.value.trim();

        const password = passwordInput.value;

        const errorPlace = document.getElementsByClassName('error-login')[0];
        errorPlace.innerHTML = '';
        if (!checkIsEmail(login)) {
            if (!validateUsername(login)) {
                errorPlace.innerHTML += '<p class="error">Error</p>';
                return;
            }
        }

        if (!validatePassword(password)) {
            errorPlace.innerHTML += '<p class="error">Error</p>';
        }

        loginAjax(login, password);
    });

    parent.appendChild(form);
    const registration = document.createElement('a');
    registration.text = 'Dont have an account';
    registration.href = '/registration';
    registration.classList.add('register-link');
    elements.appendChild(registration);

    registration.addEventListener('click', (e) => {
        e.preventDefault();

        redirect(unAuthNavConfig['registration'], parent);
    });
}

function createElementAndAppend (parent, whatElement, ...classes) {
    const element = document.createElement(whatElement);
    classes.forEach((tag) => {
        element.classList.add(tag);
    });

    parent.appendChild(element);
    return element;
}
