import { ID_LOG, CLASS_LOG as CLASS } from '../config/id.js';

/**
 * Function to create login form setup config for template.
 * @return {json} config -- config for template.
 */
export function logFormSetup() {
    return {
        errorTop: CLASS.errorTop,
        errorText: 'title__error-text',
        topID: 'serverErrors',
        content: 'content',
        loginContent: 'login-content',
        formHeader: 'header',
        title: CLASS.title,
        logoSrc: '/static/svg/whiteLogo.svg',

        titleClass: 'title__name',
        titleName: 'Fluire',
        descriptionClass: 'title__page-description',
        descriptionName: 'Log in to continue',
        divBeforeForm: 'log',
        formDiv: 'form',
        inputs: [
            {
                divBeforeInput: CLASS.divBeforeInput,
                typeOfInput: 'login',
                nameOfField: 'login',
                labelClass: 'input-block__label',
                labelText: 'Your email address:',
                placeholder: 'Your email',
                classInp: CLASS.classInp,
                id: ID_LOG.login,
                errorDiv: CLASS.errorDiv,
                errorId: null,
            },
            {
                divBeforeInput: CLASS.divBeforeInput,
                typeOfInput: 'password',
                nameOfField: 'password',
                labelClass: 'input-block__label',
                labelText: 'Password:',
                placeholder: 'Your password',
                classInp: CLASS.classInp,
                id: ID_LOG.password,
                errorDiv: CLASS.errorDiv,
                errorId: null,
            },
        ],
        placementClass: null,
        placementId: null,
        divButton: 'form__button',
        buttonType: 'submit',
        buttonClass: 'form__button',
        textButton: 'Sign In',
        divHrClass: 'form__hr-placement',
        hrClass: 'form__hr',
        bottomClass: 'bottom__placement',
        divBottomLabel: 'have-acc-label',
        bottomLabelClass: 'bottom__link',
        bottomLabelText: 'Don\'t have an account?',
        linkDiv: 'linkDiv',
        linkHref: '/',
        linkClass: CLASS.link,
        linkText: 'Registration',
    };
}
