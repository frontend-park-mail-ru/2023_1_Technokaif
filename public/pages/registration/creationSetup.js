import { ID_REG as ID } from '../../utils/id.js';

/**
 *
 * @returns -- all settings to form template in register
 */
export function regFormSetup () {
    return {
        errorTop: ID.errorTop,
        content: 'content',
        header: 'header',
        title: 'title',
        titleClass: 'page-title',
        titleName: 'Fluire',
        descriptionClass: 'page-description',
        descriptionLabelClass: 'descriptionLabel',
        descriptionName: 'Register and listen for free',
        divBeforeForm: 'reg',
        autocompleteOff: true,
        formDiv: 'reg-form',
        inputs: [
            {
                divBeforeInput: 'reg-field',
                typeOfInput: 'email',
                nameOfField: 'email',
                labelClass: 'reg-input-label',
                labelText: 'Your email address:',
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
                labelClass: 'reg-input-label',
                labelText: 'Your email address again:',
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
                labelClass: 'reg-input-label',
                labelText: 'Your password:',
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
                labelClass: 'reg-input-label',
                labelText: 'Name of your account:',
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
                labelClass: 'reg-input-label',
                labelText: 'Your firstname:',
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
                labelClass: 'reg-input-label',
                labelText: 'Your lastname:',
                placeholder: 'Lastname',
                classInp: 'reg-input',
                id: ID.lastName,
                errorDiv: 'reg-error',
                errorId: ID.lastNameErr
            }
        ],
        placementClass: 'reg-date-and-sex',
        placementId: ID.placement,
        divButton: 'reg-btn auth-btn',
        buttonType: 'submit',
        buttonClass: 'reg-btn auth-btn',
        textButton: 'Sign Up',
        divHrClass: 'hr-position',
        hrClass: 'signup-hr',
        bottomClass: 'reg-bottom',
        divBottomLabel: 'have-acc-label',
        bottomLabelClass: 'have-acc',
        bottomLabelText: 'Already have an account?',
        linkDiv: 'linkDiv',
        linkHref: '/',
        linkClass: 'reg-login-btn auth-btn',
        linkText: 'Login'
    };
}

/**
 *
 * @returns -- all settings to sex template in register
 */
export function sexSetup () {
    return {
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
                classLabel: 'sex-var-label',
                textLabel: 'Male'
            },
            {
                insideDivSex: 'reg-sex-var',
                typeInput: 'radio',
                nameInput: 'sex',
                classSexInput: 'reg-sex-radio',
                id: ID.female,
                classLabel: 'sex-var-label',
                textLabel: 'Female'
            },
            {
                insideDivSex: 'reg-sex-var',
                typeInput: 'radio',
                nameInput: 'sex',
                classSexInput: 'reg-sex-radio',
                id: ID.dont,
                classLabel: 'sex-var-label',
                textLabel: 'Other answer'
            }
        ],
        errorSex: 'error-gender'
    };
}

/**
 *
 * @returns -- all settings to date template in register
 */
export function dateSetup () {
    return {
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
    };
}
