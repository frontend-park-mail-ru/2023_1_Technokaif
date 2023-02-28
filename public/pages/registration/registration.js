'use strict';

import { createInput, createSelect, createCheckbox } from '../../utils/utils.js';
import { validateEmail, validatePassword, validateUsername, validateDay, validateMonth, validateYear, validateCheckbox, validateName } from '../../api/auth/validation.js';
import { registerAjax } from '../../api/auth/registerAjaxReq.js';
const Method = 'focusout';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];

const ID = {
    email: 'email',
    emailConf: 'emailConf',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
    placement: 'placementId',
    choose: 'regDate',
    day: 'day',
    month: 'month',
    year: 'year',
    male: 'male',
    female: 'female',
    dont: 'dont',
    errorDate: 'dateError'
};

export function renderSignup (parent) {
    const templateForm = Handlebars.compile(document.getElementById('form-template').innerHTML);
    const textElements = templateForm({
        content: 'content',
        header: 'header',
        title: 'title',
        titleClass: 'page-title',
        titleName: 'Registration',
        descriptionClass: 'page-description',
        descriptionLabelClass: 'descriptionLabel',
        descriptionName: 'Register and listen for free',
        divBeforeForm: 'reg',
        formDiv: 'reg-form',
        inputs: [
            {
                divBeforeInput: 'reg-field',
                typeOfInput: 'email',
                nameOfField: 'email',
                placeholder: 'Email',
                classInp: 'reg-input',
                id: ID.email,
                errorDiv: 'reg-error',
                errorId: 'emailError'
            },
            {
                divBeforeInput: 'reg-field',
                typeOfInput: 'email',
                nameOfField: 'email-confirm',
                placeholder: 'Email confirm',
                classInp: 'reg-input',
                id: ID.emailConf,
                errorDiv: 'reg-error',
                errorId: 'emailConfirmError'
            },
            {
                divBeforeInput: 'reg-field',
                typeOfInput: 'password',
                nameOfField: 'password',
                placeholder: 'Password',
                classInp: 'reg-input',
                id: ID.password,
                errorDiv: 'reg-error',
                errorId: 'passwordError'
            },
            {
                divBeforeInput: 'reg-field',
                typeOfInput: 'text',
                nameOfField: 'username',
                placeholder: 'Username',
                classInp: 'reg-input',
                id: ID.username,
                errorDiv: 'reg-error',
                errorId: 'usernameError'
            },
            {
                divBeforeInput: 'reg-field',
                typeOfInput: 'text',
                nameOfField: 'firstName',
                placeholder: 'Firstname',
                classInp: 'reg-input',
                id: ID.firstName,
                errorDiv: 'reg-error',
                errorId: 'firstNameError'
            },
            {
                divBeforeInput: 'reg-field',
                typeOfInput: 'text',
                nameOfField: 'lastName',
                placeholder: 'Lastname',
                classInp: 'reg-input',
                id: ID.lastName,
                errorDiv: 'reg-error',
                errorId: 'lastNameError'
            }
        ],
        placementClass: 'reg-date-and-sex',
        placementId: ID.placement,
        divButton: 'reg-date-and-sex',
        buttonType: 'submit',
        buttonClass: 'reg-btn',
        textButton: 'Sign up',
        hrClass: null,
        bottomClass: 'reg-bottom',
        divBottomLabel: 'have-acc-label',
        bottomLabelClass: 'have-acc',
        bottomLabelText: 'Already have an account?',
        linkDiv: 'linkDiv',
        linkHref: '/',
        linkClass: 'reg-sign-in-btn',
        linkText: 'Login'
    });

    parent.innerHTML = textElements;

    const posWherePlace = document.getElementById(ID.placement);

    const templateDate = Handlebars.compile(document.getElementById('date-template').innerHTML);
    const dates = templateDate({
        dateMainDiv: 'reg-date',
        divChooseId: ID.choose,
        labelClass: 'reg-date-label',
        labelText: 'Your date of birth:',
        dateChooseDiv: 'reg-choose-date',
        divDayClass: null,
        typeOfDayInput: 'text',
        dayClass: 'reg-day',
        nameOfDayInput: 'nameOfDayInput',
        placeholderOfDay: 'Day',
        idOfDay: ID.day,

        divMonthClass: null,
        nameOfMonthInput: 'nameOfMonthInput',
        idOfMonth: ID.month,
        selectClass: 'reg-month',
        optionsDate: [
            {
                option: 'January',
                class: null,
                text: 'January'
            },
            {
                option: 'February',
                class: null,
                text: 'February'
            },
            {
                option: 'March',
                class: null,
                text: 'March'
            },
            {
                option: 'April',
                class: null,
                text: 'April'
            },
            {
                option: 'May',
                class: null,
                text: 'May'
            },
            {
                option: 'June',
                class: null,
                text: 'June'
            },
            {
                option: 'July',
                class: null,
                text: 'July'
            },
            {
                option: 'August',
                class: null,
                text: 'August'
            },
            {
                option: 'September',
                class: null,
                text: 'September'
            },
            {
                option: 'October',
                class: null,
                text: 'October'
            },
            {
                option: 'November',
                class: null,
                text: 'November'
            },
            {
                option: 'December',
                class: null,
                text: 'December'
            }
        ],
        divYearClass: null,
        typeOfYearInput: 'text',
        yearClass: 'reg-year',
        nameOfYearInput: 'nameOfYearInput',
        placeholderOfYear: 'Year',
        idOfYear: ID.year,
        errorDate: 'reg-error',
        errorID: ID.errorDate
    });
    posWherePlace.innerHTML += dates;

    const templateSex = Handlebars.compile(document.getElementById('sex-template').innerHTML);
    const sex = templateSex(
        {
            mainSexDiv: 'reg-sex',
            labelSex: 'reg-sex-label',
            labelClass: 'reg-label',
            labelText: 'Your gender:',
            divSexChoose: 'reg-choose-sex',
            sexes: [
                {
                    insideDivSex: 'reg-sex-var',
                    typeInput: 'radio',
                    nameInput: 'sex',
                    classSexInput: 'reg-sex-radio',
                    id: ID.male,
                    classLabel: 'classLabel',
                    textLabel: 'Male'
                },
                {
                    insideDivSex: 'reg-sex-var',
                    typeInput: 'radio',
                    nameInput: 'sex',
                    classSexInput: 'reg-sex-radio',
                    id: ID.female,
                    classLabel: 'classLabel',
                    textLabel: 'Female'
                },
                {
                    insideDivSex: 'reg-sex-var',
                    typeInput: 'radio',
                    nameInput: 'sex',
                    classSexInput: 'reg-sex-radio',
                    id: ID.dont,
                    classLabel: 'classLabel',
                    textLabel: 'Other answer'
                }
            ],
            errorSex: 'error-gender'
        }
    //     {
    //     labelClass: 'textClass',
    //     labelText: 'Choose your gender',
    //     divMainSex: 'divMainSex',
    //     divSexChoose: 'divSexChoose',
    //     sexes: [
    //         {
    //             insideDivSex: 'insideDivSex',
    //             type: 'Radio',
    //             name: 'sexChoose',
    //             classText: 'classText',
    //             textLabel: 'Male',
    //             classSex: 'sexClass',
    //             id: 'idSex1'
    //         },
    //         {
    //             insideDivSex: 'insideDivSex',
    //             type: 'Radio',
    //             name: 'sexChoose',
    //             classText: 'classText',
    //             textLabel: 'Female',
    //             classSex: 'sexClass',
    //             id: 'idSex2'
    //         },
    //         {
    //             insideDivSex: 'insideDivSex',
    //             type: 'Radio',
    //             name: 'sexChoose',
    //             classText: 'classText',
    //             textLabel: 'Don\'t want to choose',
    //             classSex: 'sexClass',
    //             id: 'idSex3'
    //         }
    //     ],
    //     'error-date': 'error-date'
    // }
    );
    posWherePlace.innerHTML += sex;

    // const form = document.createElement('form');

    // const divForNameAndElements = createElementAndAppend(form, 'div', 'blockMainLabel');

    // const mainLabelDiv = createElementAndAppend(divForNameAndElements, 'div', 'blockMainLabel');
    // createElementAndAppend(mainLabelDiv, 'p', 'whatOperation').textContent = 'Registration';
    // createElementAndAppend(mainLabelDiv, 'p', 'operationDescription').textContent = 'Register and listen for free';

    // const divForFields = createElementAndAppend(divForNameAndElements, 'div', 'elements');

    // const emailInput = createInput('email', 'Enter your email address', 'email');
    // const confirmEmailInput = createInput('email', 'Confirm Email address', 'email');
    // const passwordInput = createInput('password', 'Type your password', 'password');
    // const firstNameInput = createInput('text', 'Enter your name', 'firstName');
    // const lastNameInput = createInput('text', 'Enter your surname', 'lastName');
    // const username = createInput('text', 'Enter your username', 'username');

    // const divDate = document.createElement('div');
    // divDate.classList.add('global-date');

    // createElementAndAppend(divDate, 'p').textContent = 'Your date of birth';

    // const monthSelect = createSelect(MONTHS, 'month');
    // const dayInput = createInput('text', 'DD', 'day');
    // const yearInput = createInput('text', 'YYYY', 'year');

    // monthSelect.classList.add('date-element');
    // dayInput.classList.add('date-element');
    // yearInput.classList.add('date-element');

    // const div = document.createElement('div');
    // divDate.appendChild(div);
    // div.classList.add('date-pick');
    // div.appendChild(dayInput);
    // div.appendChild(monthSelect);
    // div.appendChild(yearInput);

    // const confirmCheckbox = createCheckbox('I allow my registration information to be shared with a Spotify partner' +
    //     ' for advertising purposes.');
    // const submitBtn = document.createElement('button');
    // submitBtn.type = 'submit';
    // submitBtn.textContent = 'Registration';

    // divForFields.appendChild(emailInput);
    // emailInput.setAttribute('id', 'email');
    // errorGenerate(Method,
    //     emailInput,
    //     createElementAndAppend(divForFields, 'div', 'error-email'),
    //     'err',
    //     validateEmail
    // );

    // divForFields.appendChild(confirmEmailInput);
    // errorGenerate(Method,
    //     confirmEmailInput,
    //     createElementAndAppend(divForFields, 'div', 'error-confirmEmail'),
    //     'err',
    //     (el) => {
    //         return validateEmail(el, emailInput.value);
    //     }
    // );

    // divForFields.appendChild(passwordInput);
    // errorGenerate(Method,
    //     passwordInput,
    //     createElementAndAppend(divForFields, 'div', 'error-password'),
    //     'err',
    //     validatePassword
    // );

    // divForFields.appendChild(firstNameInput);
    // errorGenerate(Method,
    //     firstNameInput,
    //     createElementAndAppend(divForFields, 'div', 'error-first'),
    //     'err',
    //     validateName
    // );

    // divForFields.appendChild(lastNameInput);
    // errorGenerate(Method,
    //     lastNameInput,
    //     createElementAndAppend(divForFields, 'div', 'error-last'),
    //     'err',
    //     validateName
    // );

    // divForFields.appendChild(username);
    // errorGenerate(Method,
    //     username,
    //     createElementAndAppend(divForFields, 'div', 'error-username'),
    //     'err',
    //     validateUsername
    // );

    // divForFields.appendChild(divDate);

    // errorGenerate(Method,
    //     monthSelect,
    //     createElementAndAppend(divDate, 'div', 'error-month'),
    //     'err',
    //     validateMonth
    // );

    // errorGenerate(Method,
    //     dayInput,
    //     createElementAndAppend(divDate, 'div', 'error-day'),
    //     'err1',
    //     validateDay
    // );

    // errorGenerate(Method,
    //     yearInput,
    //     createElementAndAppend(divDate, 'div', 'error-year'),
    //     'err2',
    //     validateYear
    // );

    // const sexChoose = createElementAndAppend(divForFields, 'div', 'sex-choose');

    // const male = createCheckbox('male', 'radio', 'contact');
    // const female = createCheckbox('female', 'radio', 'contact');
    // const don = createCheckbox('Don', 'radio', 'contact');

    // sexChoose.appendChild(male);
    // sexChoose.appendChild(female);
    // sexChoose.appendChild(don);

    // // todo think about one method
    // const sexError = createElementAndAppend(sexChoose, 'div', 'error-sex');
    // sexChoose.addEventListener(Method, (el) => {
    //     const where = sexError;
    //     where.innerHTML = '';

    //     // todo bad error

    //     const elements = [];
    //     elements.push(don.children[0].checked);
    //     elements.push(male.children[0].checked);
    //     elements.push(female.children[0].checked);

    //     if (!validateCheckbox(elements)) {
    //         const message = document.createElement('p');
    //         message.textContent = 'err';
    //         message.classList.add('error');
    //         where.appendChild(message);
    //     }
    // });

    // divForFields.appendChild(confirmCheckbox);
    // divForFields.appendChild(submitBtn);

    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     const radioButtons = document.querySelectorAll('input[type=radio]');
    //     const errors = validateAll(
    //         document.getElementsByName('email')[0].value,
    //         document.getElementsByName('email')[1].value,
    //         document.getElementsByName('password')[0].value,
    //         document.getElementsByName('firstName')[0].value,
    //         document.getElementsByName('lastName')[0].value,
    //         document.getElementsByName('username')[0].value,
    //         document.getElementsByName('day')[0].value,
    //         document.getElementsByName('month')[0].value,
    //         document.getElementsByName('year')[0].value,
    //         radioButtons[0].checked,
    //         radioButtons[1].checked,
    //         radioButtons[2].checked
    //     );

    //     if (errors.length !== 0) {
    //         errors.forEach((el) => {
    //             switch (el) {
    //             case 'email':
    //                 document.getElementsByClassName('error-email')[0].innerHTML = '<p class="error">Error</p>';
    //                 document.getElementsByClassName('error-confirmEmail')[0].innerHTML = '<p class="error">Error</p>';
    //                 break;
    //             case 'password':
    //                 document.getElementsByClassName('error-password')[0].innerHTML = '<p class="error">Error</p>';
    //                 break;
    //             case 'first-name':
    //                 document.getElementsByClassName('error-first')[0].innerHTML = '<p class="error">Error</p>';
    //                 break;
    //             case 'last-name':
    //                 document.getElementsByClassName('error-last')[0].innerHTML = '<p class="error">Error</p>';
    //                 break;
    //             case 'username':
    //                 document.getElementsByClassName('error-username')[0].innerHTML = '<p class="error">Error</p>';
    //                 break;
    //             case 'day':
    //                 document.getElementsByClassName('error-month')[0].innerHTML = '<p class="error">Error</p>';
    //                 break;
    //             case 'month':
    //                 document.getElementsByClassName('error-day')[0].innerHTML = '<p class="error">Error</p>';
    //                 break;
    //             case 'year':
    //                 document.getElementsByClassName('error-year')[0].innerHTML = '<p class="error">Error</p>';
    //                 break;
    //             case 'sex':
    //                 // todo bad error
    //                 document.getElementsByClassName('sex-choose')[0].innerHTML = '<p class="error">Error</p>';
    //                 break;
    //             }
    //         });
    //         return;
    //     }

    //     const email = emailInput.value.trim();
    //     const password = passwordInput.value;
    //     const usernameData = username.value;
    //     const firstName = firstNameInput.value.trim();
    //     const lastName = lastNameInput.value.trim();
    //     const month = MONTHS.indexOf(monthSelect.value);
    //     const day = dayInput.value;
    //     const year = yearInput.value;

    //     let monthString = String(month + 1);
    //     if (month <= 9) {
    //         monthString = '0' + monthString;
    //     }

    //     let dayString = day;
    //     if (day <= 9) {
    //         dayString = '0' + day;
    //     }

    //     const date = [year, monthString, dayString].join('-');
    //     const sex = getSexInString(sexChoose);

    //     registerAjax({
    //         email,
    //         password,
    //         username: usernameData,
    //         firstName,
    //         lastName,
    //         birthDate: date,
    //         sex
    //     });
    // });

    // parent.appendChild(form);
}

function getSexInString (sexDiv) {
    let sexInString = '';
    const itemsDivs = sexDiv.children;
    for (let i = 0; i < 3; i++) {
        if (itemsDivs[i].children[0].checked === true) {
            switch (itemsDivs[i].children[1].value) {
            case 'male':
                sexInString = 'M';
                break;
            case 'female':
                sexInString = 'F';
                break;
            case 'Don':
                sexInString = 'O';
                break;
            default:
                sexInString = 'O';
            }
        }
    }

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
    validateName(params[3]) ? '' : result.push('first-name');
    validateName(params[4]) ? '' : result.push('last-name');
    validateUsername(params[5]) ? '' : result.push('username');
    validateDay(params[6]) ? '' : result.push('day');
    validateMonth(params[7]) ? '' : result.push('month');
    validateYear(params[8]) ? '' : result.push('year');
    validateCheckbox(params[9], params[10], params[11]) ? '' : result.push('sex');

    return result;
}
