'use strict'

import {createInput, createSelect, createCheckbox} from "../utils/utils.js"

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December']

export function renderSignup(parent) {
    const form = document.createElement('form');

    const divForNameAndElements = createElementAndAppend(form, 'div', 'blockMainLabel');

    const mainLabelDiv = createElementAndAppend(divForNameAndElements, 'div', 'blockMainLabel');
    createElementAndAppend(mainLabelDiv, 'p', 'whatOperation').textContent = 'Registration';
    createElementAndAppend(mainLabelDiv, 'p', 'operationDescription').textContent = 'Register and listen for free';
    
    const divForFields = createElementAndAppend(divForNameAndElements, 'div', 'elements');
    
    const emailInput = createInput('email', 'Enter your email address', 'email');
    const confirmEmailInput = createInput('email', 'Confirm Email address', 'email');
    const passwordInput = createInput('password', 'Type your password', 'password');
    const firstNameInput = createInput('text', 'Enter your name', 'firstName');
    const lastNameInput = createInput('text', 'Enter your surname', 'lastName');
    const username = createInput('text', 'Enter your username', 'username');


    const divDate = document.createElement('div');
    divDate.classList.add('global-date');

    createElementAndAppend(divDate, 'p').textContent = 'Your date of birth';

    const monthSelect = createSelect(MONTHS, 'month');
    const dayInput = createInput('text', 'DD', 'day');
    const yearInput = createInput('text', 'YYYY', 'year');
    
    monthSelect.classList.add('date-element');
    dayInput.classList.add('date-element');
    yearInput.classList.add('date-element');
    
    const div = document.createElement('div');
    divDate.appendChild(div);
    div.classList.add('date-pick');
    div.appendChild(dayInput);
    div.appendChild(monthSelect);
    div.appendChild(yearInput);

    const confirmCheckbox = createCheckbox('I allow my registration information to be shared with a Spotify partner' +
        ' for advertising purposes.')
    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Registration';

    divForFields.appendChild(emailInput);
    divForFields.appendChild(confirmEmailInput);
    divForFields.appendChild(passwordInput);
    divForFields.appendChild(firstNameInput);
    divForFields.appendChild(lastNameInput);
    divForFields.appendChild(username);
    divForFields.appendChild(divDate);

    const sexChoose = createElementAndAppend(divForFields, 'div', 'sex-choose');
    


    divForFields.appendChild(confirmCheckbox);

    divForFields.appendChild(submitBtn);


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
        // todo: convert month to int
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
                    // todo: login() user func post
                    redirectToMain();

                    return;
                }

                alert(message);
            }
        })
    });

    parent.appendChild(form);
};

/*
function renderForm(parent, name) {
    const mainDiv = createElementAndAppend(parent, 'div','form');

    const labelText = createElementAndAppend(
        createElementAndAppend(mainDiv, 'div', 'blockMainLabel'),
        'p',
        'mainLabel'
    );
    labelText.textContent = name;

    createElementAndAppend(mainDiv, 'p', 'nameOfOperation')
        .textContent = 'Registration and listen for free';

    

};
*/

function createElementAndAppend(parent, whatElement,...classes) {
    const element = document.createElement(whatElement);
    classes.forEach((tag) => {
        element.classList.add(tag);
    });

    parent.appendChild(element);
    return element;
};
