import { ID_REG as ID, CLASS_REG as CLASS } from '../../utils/config/id.js';

/**
 * Function to create registration form setup config for template.
 * @return {json} config -- config for template.
 */
export function regFormSetup() {
    return {
        errorTop: ID.errorTop,
        errorText: 'title__error-text',
        topID: 'serverErrors',
        content: 'content',
        formHeader: 'header',
        title: CLASS.title,
        logoSrc: '/static/svg/logo.svg',

        titleClass: 'title__name',
        titleName: 'Fluire',
        descriptionClass: 'title__page-description',
        descriptionLabelClass: 'descriptionLabel',
        descriptionName: 'Register and listen for free',
        divBeforeForm: 'reg',
        autocompleteOff: true,
        formDiv: 'form',
        inputs: [
            {
                divBeforeInput: 'input-block',
                typeOfInput: 'email',
                nameOfField: 'email',
                labelClass: 'input-block__label',
                labelText: 'Email:',
                placeholder: 'Your email address',
                classInp: 'input-block__input-element',
                id: ID.email,
                errorDiv: 'input-block__error-placement',
                errorId: ID.emailErr,
            },
            {
                divBeforeInput: 'input-block',
                typeOfInput: 'email',
                nameOfField: 'email-confirm',
                labelClass: 'input-block__label',
                labelText: 'Confirm Email:',
                placeholder: 'Your email address again',
                classInp: 'input-block__input-element',
                id: ID.emailConf,
                errorDiv: 'input-block__error-placement',
                errorId: ID.emailConfErr,
            },
            {
                divBeforeInput: 'input-block',
                typeOfInput: 'password',
                nameOfField: 'password',
                labelClass: 'input-block__label',
                labelText: 'Password:',
                placeholder: 'Your password',
                classInp: 'input-block__input-element',
                id: ID.password,
                errorDiv: 'input-block__error-placement',
                errorId: ID.passwordErr,
            },
            {
                divBeforeInput: 'input-block',
                typeOfInput: 'text',
                nameOfField: 'username',
                labelClass: 'input-block__label',
                labelText: 'Username:',
                placeholder: 'Name of your account',
                classInp: 'input-block__input-element',
                id: ID.username,
                errorDiv: 'input-block__error-placement',
                errorId: ID.usernameErr,
            },
            {
                divBeforeInput: 'input-block',
                typeOfInput: 'text',
                nameOfField: 'firstName',
                labelClass: 'input-block__label',
                labelText: 'Firstname:',
                placeholder: 'Your firstname',
                classInp: 'input-block__input-element',
                id: ID.firstName,
                errorDiv: 'input-block__error-placement',
                errorId: ID.firstNameErr,
            },
            {
                divBeforeInput: 'input-block',
                typeOfInput: 'text',
                nameOfField: 'lastName',
                labelClass: 'input-block__label',
                labelText: 'Lastname:',
                placeholder: 'Your lastname',
                classInp: 'input-block__input-element',
                id: ID.lastName,
                errorDiv: 'input-block__error-placement',
                errorId: ID.lastNameErr,
            },
        ],
        placementClass: 'form__placement-additionall',
        placementId: ID.placement,
        divButton: 'form__button',
        buttonType: 'submit',
        buttonClass: 'form__button',
        textButton: 'Sign Up',
        divHrClass: 'form__hr-placement',
        hrClass: 'form__hr',
        bottomClass: 'bottom__placement',
        divBottomLabel: 'have-acc-label',
        bottomLabelClass: 'bottom__link',
        bottomLabelText: 'Already have an account?',
        linkDiv: 'linkDiv',
        linkHref: '/',
        linkClass: CLASS.link,
        linkText: 'Login',
    };
}

/**
 *
 * @return -- all settings to sex template in register
 */
export function sexSetup() {
    return {
        mainSexDiv: 'sex',
        labelSex: 'sex__description-label',
        labelClass: 'reg-label',
        labelText: 'Your gender:',
        divSexChoose: 'sex__choose',
        sexes: [
            {
                insideDivSex: 'sex__variable',
                typeInput: 'radio',
                nameInput: 'sex',
                classSexInput: 'reg-sex-radio',
                id: ID.male,
                classLabel: 'sex__label',
                textLabel: 'Male',
            },
            {
                insideDivSex: 'sex__variable',
                typeInput: 'radio',
                nameInput: 'sex',
                classSexInput: 'reg-sex-radio',
                id: ID.female,
                classLabel: 'sex__label',
                textLabel: 'Female',
            },
            {
                insideDivSex: 'sex__variable',
                typeInput: 'radio',
                nameInput: 'sex',
                classSexInput: 'reg-sex-radio',
                id: ID.dont,
                classLabel: 'sex__label',
                textLabel: 'Other answer',
            },
        ],
        errorSex: 'error-gender',
    };
}

/**
 *
 * @return -- all settings to date template in register
 */
export function dateSetup() {
    return {
        dateMainDiv: 'date',
        divChooseId: ID.choose,
        labelClass: 'date__label',
        labelText: 'Your date of birth:',
        dateChooseDiv: 'date__choose-place',
        divDayClass: null,
        typeOfDayInput: 'text',
        dayClass: 'date__day',
        nameOfDayInput: 'nameOfDayInput',
        placeholderOfDay: 'Day',
        idOfDay: ID.day,

        divMonthClass: null,
        nameOfMonthInput: 'nameOfMonthInput',
        idOfMonth: ID.month,
        selectClass: 'date__month',
        optionsDate: [
            {
                option: 'January',
                class: null,
                text: 'January',
            },
            {
                option: 'February',
                class: null,
                text: 'February',
            },
            {
                option: 'March',
                class: null,
                text: 'March',
            },
            {
                option: 'April',
                class: null,
                text: 'April',
            },
            {
                option: 'May',
                class: null,
                text: 'May',
            },
            {
                option: 'June',
                class: null,
                text: 'June',
            },
            {
                option: 'July',
                class: null,
                text: 'July',
            },
            {
                option: 'August',
                class: null,
                text: 'August',
            },
            {
                option: 'September',
                class: null,
                text: 'September',
            },
            {
                option: 'October',
                class: null,
                text: 'October',
            },
            {
                option: 'November',
                class: null,
                text: 'November',
            },
            {
                option: 'December',
                class: null,
                text: 'December',
            },
        ],
        divYearClass: null,
        typeOfYearInput: 'text',
        yearClass: 'date__year',
        nameOfYearInput: 'nameOfYearInput',
        placeholderOfYear: 'Year',
        idOfYear: ID.year,
        errorDate: 'input-block__error-placement',
        errorID: ID.errorDate,
        errorMonth: 'input-block__error-placement',
        errorMonthID: ID.monthErr,
        errorYear: 'input-block__error-placement',
        errorYearID: ID.yearErr,
    };
}
