'use strict'

import {createInput} from "../utils/utils.js"
import {renderSignup} from "./registration.js";

export function renderLogin(parent) {
    const form = document.createElement('loginForm');

    const emailInput = createInput('email', 'Email', 'email');
    const passwordInput = createInput('password', 'Password', 'password');

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Sign in';

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(submitBtn);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // todo: validate data

        Ajax.post({
            url: '/auth/login',
            body: {email, password},
            callback: ({jwt, status, message}) => {
                if (status === 200) {
                    // goToPage(config.profile);
                    localStorage.setItem('jwt', jwt);
                    alert('Nice');
                    return;
                } 

                alert(message);
            }
        })
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

function redirectToMain() {

}
