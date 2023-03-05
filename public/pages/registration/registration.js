'use strict';

import { getAllErrors, getDayError, getEmailError, getMonthError, getNameError, getSexError, getUsernameError, getYearError, getPasswordError } from '../../utils/validation.js';
import { clearField } from '../../utils/clearFields.js';
import { registerAjax } from '../../api/auth/registerAjaxReq.js';
import { redirect } from '../../modules/redirects.js';
import { unAuthNavConfig, MONTHS } from '../../utils/config.js';
import { sexSetup, regFormSetup, dateSetup } from './creationSetup.js';
import { ERRORS_REG as ERRORS } from '../../utils/errors.js';
import { ID_REG as ID } from '../../utils/id.js';
import { translateOneDigitToTwo, errorGenerate } from '../../utils/utils.js';
import { ERRORS_VALIDATE } from '../../utils/validateConf.js';

const Method = 'focusout';

export function renderSignup (parent) {
    const templateForm = Handlebars.compile(document.getElementById(ID.formTemplate).innerHTML);
    const textElements = templateForm(regFormSetup());

    parent.innerHTML = textElements;

    const posWherePlace = document.getElementById(ID.placement);

    const templateDate = Handlebars.compile(document.getElementById(ID.dateTemplate).innerHTML);
    const dates = templateDate(dateSetup());
    posWherePlace.innerHTML += dates;

    const templateSex = Handlebars.compile(document.getElementById(ID.sexTemplate).innerHTML);
    const sex = templateSex(sexSetup());
    posWherePlace.innerHTML += sex;

    errorGenerate(Method,
        document.getElementById(ID.email),
        document.getElementById(ID.emailErr),
        ERRORS.email,
        (el) => {
            return getEmailError(el, el);
        }
    );

    errorGenerate(Method,
        document.getElementById(ID.emailConf),
        document.getElementById(ID.emailConfErr),
        ERRORS.confirmEmail,
        (el) => {
            return getEmailError(el, document.getElementById(ID.email).value);
        }
    );

    errorGenerate(Method,
        document.getElementById(ID.password),
        document.getElementById(ID.passwordErr),
        ERRORS.password,
        getPasswordError
    );

    errorGenerate(Method,
        document.getElementById(ID.firstName),
        document.getElementById(ID.firstNameErr),
        ERRORS.firstName,
        getNameError
    );

    errorGenerate(Method,
        document.getElementById(ID.lastName),
        document.getElementById(ID.lastNameErr),
        ERRORS.lastName,
        getNameError
    );

    errorGenerate(Method,
        document.getElementById(ID.username),
        document.getElementById(ID.usernameErr),
        ERRORS.username,
        getUsernameError
    );

    errorGenerate(Method,
        document.getElementById(ID.month),
        document.getElementById(ID.monthErr),
        ERRORS.month,
        getMonthError
    );

    errorGenerate(Method,
        document.getElementById(ID.day),
        document.getElementById(ID.errorDate),
        ERRORS.day,
        getDayError
    );

    errorGenerate(Method,
        document.getElementById(ID.year),
        document.getElementById(ID.yearErr),
        ERRORS.year,
        getYearError
    );

    const sexChoose = parent.querySelector('.reg-sex');
    sexChoose.addEventListener(Method, (el) => {
        const where = document.getElementsByClassName('error-gender')[0];
        clearField(where);

        // todo bad error
        const radioButtons = document.getElementsByClassName('reg-sex-radio');
        const elements = [];

        elements.push(radioButtons[0].checked);
        elements.push(radioButtons[1].checked);
        elements.push(radioButtons[2].checked);

        if (getSexError(...elements)) {
            const message = document.createElement('p');
            message.textContent = ERRORS.sex;
            message.classList.add('error');

            where.appendChild(message);
        }
    });

    const form = parent.querySelector('.reg-form');
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
        const errors = getAllErrors(
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

        const errorEmail = document.getElementById(ID.emailErr);
        const errorConfEmail = document.getElementById(ID.emailConfErr);
        const errorPassword = document.getElementById(ID.passwordErr);
        const errorFirstName = document.getElementById(ID.firstNameErr);
        const errorLastName = document.getElementById(ID.lastNameErr);
        const errorUsername = document.getElementById(ID.usernameErr);
        const errorDay = document.getElementById(ID.errorDate);
        const errorMonth = document.getElementById(ID.monthErr);
        const errorYear = document.getElementById(ID.yearErr);
        const errorSex = document.getElementsByClassName('error-gender')[0];

        if (errors.length !== 0) {
            errors.forEach((el) => {
                switch (el) {
                case ERRORS_VALIDATE.email:
                    errorEmail.innerHTML = `<p class="error">${ERRORS.email}</p>`;
                    break;
                case ERRORS_VALIDATE.emailConf:
                    errorConfEmail.innerHTML = `<p class="error">${ERRORS.confirmEmail}</p>`;
                    break;
                case ERRORS_VALIDATE.password:
                    errorPassword.innerHTML = `<p class="error">${ERRORS.password}</p>`;
                    break;
                case 'first' + ERRORS_VALIDATE.name:
                    errorFirstName.innerHTML = `<p class="error">${ERRORS.firstName}</p>`;
                    break;
                case 'last' + ERRORS_VALIDATE.name:
                    errorLastName.innerHTML = `<p class="error">${ERRORS.lastName}</p>`;
                    break;
                case ERRORS_VALIDATE.username:
                    errorUsername.innerHTML = `<p class="error">${ERRORS.username}</p>`;
                    break;
                case ERRORS_VALIDATE.day:
                    errorDay.innerHTML = `<p class="error">${ERRORS.day}</p>`;
                    break;
                case ERRORS_VALIDATE.month:
                    errorMonth.innerHTML = `<p class="error">${ERRORS.month}</p>`;
                    break;
                case ERRORS_VALIDATE.year:
                    errorYear.innerHTML = `<p class="error">${ERRORS.year}</p>`;
                    break;
                case ERRORS_VALIDATE.sex:
                    // todo bad error
                    errorSex.innerHTML = `<p class="error">${ERRORS.sex}</p>`;
                    break;
                }
            });
            return;
        }

        const month = MONTHS.indexOf(monthInput);

        const monthString = translateOneDigitToTwo(month + 1);
        const dayString = translateOneDigitToTwo(day);

        const date = [year, monthString, dayString].join('-');
        const sex = getSexInString(
            sexChoose[0].checked,
            sexChoose[1].checked,
            sexChoose[2].checked
        );

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

    parent.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        redirect(unAuthNavConfig.login, parent);
    });
}

function getSexInString (...sexChoose) {
    if (sexChoose[0]) {
        return 'M';
    }
    if (sexChoose[1]) {
        return 'F';
    }

    return 'O';
}
