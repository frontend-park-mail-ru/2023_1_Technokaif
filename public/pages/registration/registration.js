'use strict';

import { createInput, createSelect, createCheckbox } from '../../utils/utils.js';
import { validateEmail, validatePassword, validateUsername, validateDay, validateMonth, validateYear, validateCheckbox, validateName } from '../../api/auth/validation.js';
import { registerAjax } from '../../api/auth/registerAjaxReq.js';
const Method = 'focusout';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];

const ERRORS = {
    email: 'Enter an email address',
    confirmEmail: 'Confirm your email addrewss',
    password: 'Enter password',
    username: 'Provide a name for your profile',
    firstName: 'Write a first name',
    lastName: 'Write a last name',
    day: 'Choose correct day',
    month: 'Choose correct month',
    year: 'Choose correct year',
    sex: 'Choose your gender'
};

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
    errorDate: 'dateError',
    emailErr: 'emailError',
    emailConfErr: 'emailConfirmError',
    passwordErr: 'passwordError',
    usernameErr: 'usernameError',
    firstNameErr: 'firstNameError',
    lastNameErr: 'lastNameError',
    monthErr: 'monthErr',
    yearErr: 'yearErr'
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
                errorId: ID.emailErr
            },
            {
                divBeforeInput: 'reg-field',
                typeOfInput: 'email',
                nameOfField: 'email-confirm',
                placeholder: 'Email confirm',
                classInp: 'reg-input',
                id: ID.emailConf,
                errorDiv: 'reg-error',
                errorId: ID.emailConfErr
            },
            {
                divBeforeInput: 'reg-field',
                typeOfInput: 'password',
                nameOfField: 'password',
                placeholder: 'Password',
                classInp: 'reg-input',
                id: ID.password,
                errorDiv: 'reg-error',
                errorId: ID.passwordErr
            },
            {
                divBeforeInput: 'reg-field',
                typeOfInput: 'text',
                nameOfField: 'username',
                placeholder: 'Username',
                classInp: 'reg-input',
                id: ID.username,
                errorDiv: 'reg-error',
                errorId: ID.usernameErr
            },
            {
                divBeforeInput: 'reg-field',
                typeOfInput: 'text',
                nameOfField: 'firstName',
                placeholder: 'Firstname',
                classInp: 'reg-input',
                id: ID.firstName,
                errorDiv: 'reg-error',
                errorId: ID.firstNameErr
            },
            {
                divBeforeInput: 'reg-field',
                typeOfInput: 'text',
                nameOfField: 'lastName',
                placeholder: 'Lastname',
                classInp: 'reg-input',
                id: ID.lastName,
                errorDiv: 'reg-error',
                errorId: ID.lastNameErr
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
        errorID: ID.errorDate,
        errorMonth: 'reg-error',
        errorMonthID: ID.monthErr,
        errorYear: 'reg-error',
        errorYearID: ID.yearErr
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

    errorGenerate(Method,
        document.getElementById(ID.email),
        document.getElementById(ID.emailErr),
        ERRORS.email,
        validateEmail
    );

    errorGenerate(Method,
        document.getElementById(ID.emailConf),
        document.getElementById(ID.emailConfErr),
        ERRORS.confirmEmail,
        (el) => {
            return validateEmail(el, document.getElementById(ID.email).value);
        }
    );

    errorGenerate(Method,
        document.getElementById(ID.password),
        document.getElementById(ID.passwordErr),
        ERRORS.password,
        validatePassword
    );

    errorGenerate(Method,
        document.getElementById(ID.firstName),
        document.getElementById(ID.firstNameErr),
        ERRORS.firstName,
        validateName
    );

    errorGenerate(Method,
        document.getElementById(ID.lastName),
        document.getElementById(ID.lastNameErr),
        ERRORS.lastName,
        validateName
    );

    errorGenerate(Method,
        document.getElementById(ID.username),
        document.getElementById(ID.usernameErr),
        ERRORS.username,
        validateUsername
    );

    errorGenerate(Method,
        document.getElementById(ID.month),
        document.getElementById(ID.monthErr),
        ERRORS.month,
        validateMonth
    );

    errorGenerate(Method,
        document.getElementById(ID.day),
        document.getElementById(ID.errorDate),
        ERRORS.day,
        validateDay
    );

    errorGenerate(Method,
        document.getElementById(ID.year),
        document.getElementById(ID.yearErr),
        ERRORS.year,
        validateYear
    );

    const sexChoose = parent.querySelector('.reg-sex');
    sexChoose.addEventListener(Method, (el) => {
        const where = document.getElementById('error-gender');
        where.innerHTML = '';

        // todo bad error
        const radioButtons = document.getElementsByClassName('reg-sex-radio');
        const elements = [];

        elements.push(radioButtons[0].checked);
        elements.push(radioButtons[1].checked);
        elements.push(radioButtons[2].checked);

        if (!validateCheckbox(elements)) {
            const message = document.createElement('p');
            message.textContent = ERRORS.sex;
            message.classList.add('error');

            where.appendChild(message);
        }
    });

    const form = parent.querySelector('.reg-form');
    console.log(parent.querySelectorAll('.reg-form'));
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById(ID.email).value.trim();
        const confEmail = document.getElementById(ID.emailConf).value.trim();
        const password = document.getElementById(ID.password).value;
        const username = document.getElementById(ID.username).value;
        const firstName = document.getElementById(ID.firstName).value.trim();
        const lastName = document.getElementById(ID.lastName).value.trim();
        const monthInput = document.getElementById(ID.month).value;
        const day = document.getElementById(ID.day).value;
        const year = document.getElementById(ID.year).value;

        const sexChoose = document.querySelectorAll('.reg-sex-radio');
        const errors = validateAll(
            email,
            confEmail,
            password,
            firstName,
            lastName,
            username,
            day,
            monthInput,
            year,
            sexChoose[0].checked,
            sexChoose[1].checked,
            sexChoose[2].checked
        );

        console.log(errors);
        if (errors.length !== 0) {
            errors.forEach((el) => {
                switch (el) {
                case 'email':
                    document.getElementById(ID.emailErr).innerHTML = `<p class="error">${ERRORS.email}</p>`;
                    document.getElementById(ID.emailConfErr).innerHTML = `<p class="error">${ERRORS.confirmEmail}</p>`;
                    break;
                case 'password':
                    document.getElementById(ID.passwordErr).innerHTML = `<p class="error">${ERRORS.password}</p>`;
                    break;
                case 'first-name':
                    document.getElementById(ID.firstNameErr).innerHTML = `<p class="error">${ERRORS.firstName}</p>`;
                    break;
                case 'last-name':
                    document.getElementById(ID.lastNameErr).innerHTML = `<p class="error">${ERRORS.lastName}</p>`;
                    break;
                case 'username':
                    document.getElementById(ID.usernameErr).innerHTML = `<p class="error">${ERRORS.username}</p>`;
                    break;
                case 'day':
                    document.getElementById(ID.errorDate).innerHTML = `<p class="error">${ERRORS.day}</p>`;
                    break;
                case 'month':
                    document.getElementById(ID.monthErr).innerHTML = `<p class="error">${ERRORS.month}</p>`;
                    break;
                case 'year':
                    document.getElementById(ID.yearErr).innerHTML = `<p class="error">${ERRORS.year}</p>`;
                    break;
                case 'sex':
                    // todo bad error
                    document.getElementsByClassName('error-gender')[0].innerHTML = `<p class="error">${ERRORS.sex}</p>`;
                    break;
                }
            });
            return;
        }

        const month = MONTHS.indexOf(monthInput);

        const monthString = translateOneDigitToTwo(month + 1);
        const dayString = translateOneDigitToTwo(day);

        const date = [year, monthString, dayString].join('-');
        const sex = getSexInString(sexChoose);

        registerAjax({
            email,
            password,
            username,
            firstName,
            lastName,
            birthDate: date,
            sex
        });
    });
}

function getSexInString (sexChoose) {
    if (sexChoose[0]) {
        return 'M';
    }
    if (sexChoose[1]) {
        return 'F';
    }
    return 'O';
}

function errorGenerate (event, element, where, errorMessage, callback) {
    element.addEventListener(event, (el) => {
        where.innerHTML = '';

        if (!callback(element.value)) {
            const message = document.createElement('p');
            message.classList.add('error');
            message.textContent = errorMessage;

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

function translateOneDigitToTwo (elemToTranslate) {
    let result = elemToTranslate;
    if (elemToTranslate <= 9) {
        result = '0' + elemToTranslate;
    }
    return result;
}
