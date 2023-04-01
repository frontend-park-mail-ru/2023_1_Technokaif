import {
    getAllErrors, getDayError, getEmailError, getMonthError, getNameError, getSexError,
    getUsernameError, getYearError, getPasswordError,
} from '../../utils/functions/validation.js';
import { clearField } from '../../utils/functions/clearFields.js';
import { registerAjax } from '../../api/auth/registerAjaxReq.js';
import { redirect } from '../../modules/redirects.js';
import { unAuthNavConfig, MONTHS, sidebarConfig } from '../../utils/config/config.js';
import { sexSetup, regFormSetup, dateSetup } from '../../utils/config/registrationSetup.js';
import { ERRORS_REG as ERRORS } from '../../utils/config/errors.js';
import { ID_REG, CLASS_REG as CLASS } from '../../utils/config/id.js';
import { ERRORS_VALIDATE } from '../../utils/config/validateConf.js';
import { Form } from '../../components/form/form.js';
import { errorGenerate, translateOneDigitToTwo, getCheckedValueRadioButtons } from '../../utils/functions/utils.js';

const Method = 'focusout';

/**
 *
 * @param  {...any} sexChoose -- true values
 * sexChoose:
 * [0] -- male
 * [1] -- female
 * else -- other
 * @returns
 */
function getSexInString(sexChoose) {
    let returnSymbol = '';
    switch (sexChoose) {
    case 'male':
        returnSymbol = 'M';
        break;
    case 'female':
        returnSymbol = 'F';
        break;
    case 'dont':
    default:
        returnSymbol = 'O';
    }

    return returnSymbol;
}

/**
Function rendering registration form.
 * @param {HTMLElement} parent -- where to place Signup page
 */
export function renderSignup(parent) {
    const form1 = new Form(parent, regFormSetup(), sexSetup(), dateSetup());
    form1.render();

    errorGenerate(
        Method,
        document.getElementById(ID_REG.email),
        document.getElementById(ID_REG.emailErr),
        ERRORS.email,
        (el) => getEmailError(el, el),
    );

    errorGenerate(
        Method,
        document.getElementById(ID_REG.emailConf),
        document.getElementById(ID_REG.emailConfErr),
        ERRORS.confirmEmail,
        (el) => getEmailError(el, document.getElementById(ID_REG.email).value),
    );

    errorGenerate(
        Method,
        document.getElementById(ID_REG.email),
        document.getElementById(ID_REG.emailConfErr),
        ERRORS.confirmEmail,
        (el) => getEmailError(el, document.getElementById(ID_REG.emailConf).value),
    );

    errorGenerate(
        Method,
        document.getElementById(ID_REG.password),
        document.getElementById(ID_REG.passwordErr),
        ERRORS.password,
        getPasswordError,
    );

    errorGenerate(
        Method,
        document.getElementById(ID_REG.firstName),
        document.getElementById(ID_REG.firstNameErr),
        ERRORS.firstName,
        getNameError,
    );

    errorGenerate(
        Method,
        document.getElementById(ID_REG.lastName),
        document.getElementById(ID_REG.lastNameErr),
        ERRORS.lastName,
        getNameError,
    );

    errorGenerate(
        Method,
        document.getElementById(ID_REG.username),
        document.getElementById(ID_REG.usernameErr),
        ERRORS.username,
        getUsernameError,
    );

    errorGenerate(
        Method,
        document.getElementById(ID_REG.month),
        document.getElementById(ID_REG.monthErr),
        ERRORS.month,
        getMonthError,
    );

    errorGenerate(
        Method,
        document.getElementById(ID_REG.day),
        document.getElementById(ID_REG.errorDate),
        ERRORS.day,
        getDayError,
    );

    errorGenerate(
        Method,
        document.getElementById(ID_REG.year),
        document.getElementById(ID_REG.yearErr),
        ERRORS.year,
        getYearError,
    );

    const sexChoose = parent.querySelector('.sex');
    sexChoose.addEventListener(Method, () => {
        const where = document.getElementsByClassName('error-gender')[0];
        clearField(where);

        const rad = document.getElementsByName('sex');
        const elements = getCheckedValueRadioButtons(rad);

        if (getSexError(...elements)) {
            const message = document.createElement('p');
            message.textContent = ERRORS.sex;
            message.classList.add('error');

            where.appendChild(message);
        }
    });

    const form = parent.querySelector('.form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById(ID_REG.email).value.trim();
        const confEmail = document.getElementById(ID_REG.emailConf).value.trim();
        const password = document.getElementById(ID_REG.password).value;
        const username = document.getElementById(ID_REG.username).value;
        const firstName = document.getElementById(ID_REG.firstName).value.trim();
        const lastName = document.getElementById(ID_REG.lastName).value.trim();
        const monthInput = document.getElementById(ID_REG.month).value;
        const day = document.getElementById(ID_REG.day).value;
        const year = document.getElementById(ID_REG.year).value;

        const sexChooseButton = document.getElementsByName('sex');
        const gender = getCheckedValueRadioButtons(sexChooseButton);

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
            ...gender,
        );

        const errorEmail = document.getElementById(ID_REG.emailErr);
        const errorConfEmail = document.getElementById(ID_REG.emailConfErr);
        const errorPassword = document.getElementById(ID_REG.passwordErr);
        const errorFirstName = document.getElementById(ID_REG.firstNameErr);
        const errorLastName = document.getElementById(ID_REG.lastNameErr);
        const errorUsername = document.getElementById(ID_REG.usernameErr);
        const errorDay = document.getElementById(ID_REG.errorDate);
        const errorMonth = document.getElementById(ID_REG.monthErr);
        const errorYear = document.getElementById(ID_REG.yearErr);
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
                case `first${ERRORS_VALIDATE.name}`:
                    errorFirstName.innerHTML = `<p class="error">${ERRORS.firstName}</p>`;
                    break;
                case `last${ERRORS_VALIDATE.name}`:
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
                    errorSex.innerHTML = `<p class="error">${ERRORS.sex}</p>`;
                    break;
                default:
                }
            });

            return;
        }

        const month = MONTHS.indexOf(monthInput);

        const monthString = translateOneDigitToTwo(month + 1);
        const dayString = translateOneDigitToTwo(day);

        const date = [year, monthString, dayString].join('-');
        const sex = getSexInString(gender[0]);

        registerAjax({
            email,
            password,
            username,
            firstName,
            lastName,
            birthDate: date,
            sex,
        });
    });

    parent.getElementsByClassName(CLASS.title)[0].addEventListener('click', (e) => {
        e.preventDefault();

        redirect(sidebarConfig.feed);
    });

    parent.getElementsByClassName(CLASS.link)[0].addEventListener('click', (e) => {
        e.preventDefault();

        redirect(unAuthNavConfig.login);
    });
}
