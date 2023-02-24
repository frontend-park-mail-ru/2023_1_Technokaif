'use strict'

import {createInput, createSelect, createCheckbox} from "../index.js"

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December']

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

export function renderSignup(parent) {
    const form = document.createElement('form');

    const emailInput = createInput('email', 'Enter your email address', 'email');
    const confirmEmailInput = createInput('email', 'Confirm Email address', 'email');
    const passwordInput = createInput('password', 'Type your password', 'password');
    const firstNameInput = createInput('text', 'Enter your name', 'firstName');
    const lastNameInput = createInput('text', 'Enter your surname', 'lastName');

    const monthSelect = createSelect(MONTHS, 'month');
    const dayInput = createInput('text', 'DD', 'day');
    const yearInput = createInput('text', 'YYYY', 'year');
    const div = document.createElement('div');
    div.appendChild(monthSelect);
    div.appendChild(dayInput);
    div.appendChild(yearInput);

    const confirmCheckbox = createCheckbox('I allow my registration information to be shared with a Spotify partner' +
        ' for advertising purposes.')
    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Registration';

    form.appendChild(emailInput);
    form.appendChild(confirmEmailInput);
    form.appendChild(passwordInput);
    form.appendChild(firstNameInput);
    form.appendChild(lastNameInput);
    form.appendChild(div);
    form.appendChild(confirmCheckbox);

    form.appendChild(submitBtn);


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const confirmEmail = confirmEmailInput.value.trim();
        const password = passwordInput.value;
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const month = monthSelect.value;
        const day = dayInput.value;
        const year = yearInput.value;
        const date = {month, day, year}

        // todo: validate data

        Ajax.post({
            url: '/auth/signup',
            body: {email, password, confirmEmail, firstName, lastName, date},
            callback: ({jwt, status, message}) => {
                if (status === 200) {
                    // goToPage(config.profile);
                    localStorage.setItem('jwt', jwt);
                    // todo: make autologin of user
                    // may be having jwt is enough

                    return;
                } 

                alert(message);
            }
        })
    });

    parent.appendChild(form);
}
