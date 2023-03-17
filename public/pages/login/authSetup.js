import { ID_LOG as ID, CLASS_LOG as CLASS } from '../../utils/config/id.js';

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
        formHeader: 'header',
        title: CLASS.title,
        logoSrc: '/static/svg/logo.svg',

        titleClass: 'title__name',
        titleName: 'Fluire',
        descriptionClass: 'title__page-description',
        descriptionLabelClass: 'descriptionLabel',
        descriptionName: 'Log in to continue',
        divBeforeForm: 'log',
        formDiv: 'form',
        inputs: [
            {
                divBeforeInput: CLASS.divBeforeInput,
                typeOfInput: 'text',
                nameOfField: 'username',
                labelClass: 'input-block__label',
                labelText: 'Login:',
                placeholder: 'Your username or email',
                classInp: CLASS.classInp,
                id: ID.login,
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
                id: ID.password,
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
        divHrClass: 'hr-position',
        hrClass: 'auth-form-hr',
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
