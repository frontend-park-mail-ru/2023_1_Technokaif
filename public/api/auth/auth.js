'use strict'

import {createInput} from "../../utils/utils.js"
import {renderSignup} from "./registration.js";
import {checkIsEmail, validateUsername, validatePassword} from "./validation.js"

export function renderLogin(parent) {
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
        
        const error_place = document.getElementsByClassName('error-login')[0];
        error_place.innerHTML = '';
        if (!checkIsEmail(login)) {
            if (!validateUsername(login)) {
                error_place.innerHTML += '<p class="error">Error</p>';
                return;
            }
        }

        if (!validatePassword(password)) {
            error_place.innerHTML += '<p class="error">Error</p>';
            return;
        }
        
        // todo ajax

    });

    parent.appendChild(form);
    const registration = document.createElement('a');
    registration.text = 'Dont have an account';
    registration.href = '/';
    registration.classList.add('register-link');
    elements.appendChild(registration);

    registration.addEventListener('click', (e) => {
        e.preventDefault();

        renderSignup(parent);
    });
}

function createElementAndAppend(parent, whatElement,...classes) {
    const element = document.createElement(whatElement);
    classes.forEach((tag) => {
        element.classList.add(tag);
    });

    parent.appendChild(element);
    return element;
};
