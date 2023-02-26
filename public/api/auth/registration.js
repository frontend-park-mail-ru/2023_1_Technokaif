'use strict';

import {createInput, createSelect, createCheckbox} from "../../utils/utils.js"
import {validateEmail, validatePassword, validateUsername, validateDay, validateMonth, validateYear, validateCheckbox} from "./validation.js"
import {registerAjax} from "../../modules/registerAjaxReq.js"
const Method = 'focusout';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];

export function renderSignup (parent) {
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
        ' for advertising purposes.');
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Registration';

    divForFields.appendChild(emailInput);
    emailInput.setAttribute('id', 'email');
    errorGenerate(Method,
        emailInput,
        createElementAndAppend(divForFields, 'div', 'error-email'),
        'err',
        validateEmail
    );

    divForFields.appendChild(confirmEmailInput);
    errorGenerate(Method,
        confirmEmailInput,
        createElementAndAppend(divForFields, 'div', 'error-confirmEmail'),
        'err',
        (el) => {
            return validateEmail(el, emailInput.value);
        }
    );

    divForFields.appendChild(passwordInput);
    errorGenerate(Method,
        passwordInput,
        createElementAndAppend(divForFields, 'div', 'error-password'),
        'err',
        validatePassword
    );

    divForFields.appendChild(firstNameInput);
    errorGenerate(Method,
        firstNameInput,
        createElementAndAppend(divForFields, 'div', 'error-first'),
        'err',
        validateUsername
    );

    divForFields.appendChild(lastNameInput);
    errorGenerate(Method,
        lastNameInput,
        createElementAndAppend(divForFields, 'div', 'error-last'),
        'err',
        validateUsername
    );

    divForFields.appendChild(username);
    errorGenerate(Method,
        username,
        createElementAndAppend(divForFields, 'div', 'error-username'),
        'err',
        validateUsername
    );

    divForFields.appendChild(divDate);

    errorGenerate(Method,
        monthSelect,
        createElementAndAppend(divDate, 'div', 'error-month'),
        'err',
        validateMonth
    );

    errorGenerate(Method,
        dayInput,
        createElementAndAppend(divDate, 'div', 'error-day'),
        'err1',
        validateDay
    );

    errorGenerate(Method,
        yearInput,
        createElementAndAppend(divDate, 'div', 'error-year'),
        'err2',
        validateYear
    );

    const sexChoose = createElementAndAppend(divForFields, 'div', 'sex-choose');

    const male = createCheckbox('male', 'radio', 'contact');
    const female = createCheckbox('female', 'radio', 'contact');
    const don = createCheckbox('Don', 'radio', 'contact');

    sexChoose.appendChild(male);
    sexChoose.appendChild(female);
    sexChoose.appendChild(don);
    
    // todo think about one method
    const sexError = createElementAndAppend(sexChoose, 'div', 'error-sex');
    sexChoose.addEventListener(Method, (el) => {
        const where = sexError;
        where.innerHTML = '';

        // todo bad error

        const elements = [];
        elements.push(don.children[0].checked);
        elements.push(male.children[0].checked);
        elements.push(female.children[0].checked);

        if (!validateCheckbox(elements)) {
            const message = document.createElement('p');
            message.textContent = 'err';
            message.classList.add('error');
            where.appendChild(message);
        }
    });

    divForFields.appendChild(confirmCheckbox);
    divForFields.appendChild(submitBtn);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const radioButtons = document.querySelectorAll('input[type=radio]');
        const errors = validateAll(
            document.getElementsByName('email')[0].value,
            document.getElementsByName('email')[1].value,
            document.getElementsByName('password')[0].value,
            document.getElementsByName('firstName')[0].value,
            document.getElementsByName('lastName')[0].value,
            document.getElementsByName('username')[0].value,
            document.getElementsByName('day')[0].value,
            document.getElementsByName('month')[0].value,
            document.getElementsByName('year')[0].value,
            radioButtons[0].checked,
            radioButtons[1].checked,
            radioButtons[2].checked
        );

        if (errors.length !== 0) {
            errors.forEach((el) => {
                switch (el) {
                case 'email':
                    document.getElementsByClassName('error-email')[0].innerHTML = '<p class="error">Error</p>';
                    document.getElementsByClassName('error-confirmEmail')[0].innerHTML = '<p class="error">Error</p>';
                    break;
                case 'password':
                    document.getElementsByClassName('error-password')[0].innerHTML = '<p class="error">Error</p>';
                    break;
                case 'first-name':
                    document.getElementsByClassName('error-first')[0].innerHTML = '<p class="error">Error</p>';
                    break;
                case 'last-name':
                    document.getElementsByClassName('error-last')[0].innerHTML = '<p class="error">Error</p>';
                    break;
                case 'username':
                    document.getElementsByClassName('error-username')[0].innerHTML = '<p class="error">Error</p>';
                    break;
                case 'day':
                    document.getElementsByClassName('error-month')[0].innerHTML = '<p class="error">Error</p>';
                    break;
                case 'month':
                    document.getElementsByClassName('error-day')[0].innerHTML = '<p class="error">Error</p>';
                    break;
                case 'year':
                    document.getElementsByClassName('error-year')[0].innerHTML = '<p class="error">Error</p>';
                    break;
                case 'sex':
                    // todo bad error
                    document.getElementsByClassName('sex-choose')[0].innerHTML = '<p class="error">Error</p>';
                    break;
                }
            });
            return;
        }

        const email = emailInput.value.trim();
        const confirmEmail = confirmEmailInput.value.trim();
        const password = passwordInput.value;
        const usernameData = username.value;
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const month = MONTHS.indexOf(monthSelect.value);
        const day = dayInput.value;
        const year = yearInput.value;
        let monthString = String(month);
        if (month < 9) {
            monthString = '0' + monthString;
        }

        let dayString = day;
        if (day < 9) {
            dayString = '0' + day;
        }
        
        const date = [year, monthString, dayString].join('-');
        const sex = getSexInString(sexChoose);

        registerAjax({email, password, usernameData, firstName, lastName, date, sex});
    });

    parent.appendChild(form);
}

function getSexInString(sexDiv) {
    let sexInString = "";
    const itemsDivs = sexDiv.children;
    for (let i = 0; i < 3; i++) {
        if (itemsDivs[i].children[0].checked === true) {
            switch (itemsDivs[i].children[1].value) {
                case "male":
                    sexInString = "M";
                    break;
                case "female":
                    sexInString = "F";
                    break;
                case "Don":
                    sexInString = "O";
                    break;
                default:
                    sexInString = "O";
            }
        }
    }

    console.log(sexInString);
    return sexInString;
}

function createElementAndAppend (parent, whatElement, ...classes) {
    const element = document.createElement(whatElement);
    classes.forEach((tag) => {
        element.classList.add(tag);
    });

    parent.appendChild(element);
    return element;
}

function errorGenerate (event, element, where, errorMessage, callback) {
    element.addEventListener(event, (el) => {
        where.innerHTML = '';

        if (!callback(element.value)) {
            const message = document.createElement('p');
            message.textContent = errorMessage;
            message.classList.add('error');
            where.appendChild(message);
        }
    });
}

function validateAll (...params) {
    const result = [];

    validateEmail(params[0], params[1]) ? '' : result.push('email');
    validatePassword(params[2]) ? '' : result.push('password');
    validateUsername(params[3]) ? '' : result.push('first-name');
    validateUsername(params[4]) ? '' : result.push('last-name');
    validateUsername(params[5]) ? '' : result.push('username');
    validateDay(params[6]) ? '' : result.push('day');
    validateMonth(params[7]) ? '' : result.push('month');
    validateYear(params[8]) ? '' : result.push('year');
    validateCheckbox(params[9], params[10], params[11]) ? '' : result.push('sex');

    return result;
}
