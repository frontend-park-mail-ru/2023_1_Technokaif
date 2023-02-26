'use strict'

import {createInput} from "../../utils/utils.js"
import {renderSignup} from "./registration.js";

export function renderLogin(parent) {
    const form = document.createElement('loginForm');

    const loginInput = createInput('email', 'Email', 'email');
    const passwordInput = createInput('password', 'Password', 'password');

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Sign in';

    form.appendChild(loginInput);
    form.appendChild(passwordInput);
    form.appendChild(submitBtn);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const login = loginInput.value.trim();

        const password = passwordInput.value;

        // todo: refactor loh

        if (checkIsEmail(login)) {
            if (!validateEmail(login)) {
                alert('loh');
            }
        } else {
            if (!validateUsername(login)) {
                alert('lohx2');
            }
        }

        if (!validatePassword(password)) {
            alert('lohx3');
        }
    });

    parent.appendChild(form);
    const registration = document.createElement('a');
    registration.text = 'Dont have an account';
    registration.href = '/';
    parent.appendChild(registration);

    registration.addEventListener('click', (e) => {
        e.preventDefault();

        renderSignup(parent);
    });
}
