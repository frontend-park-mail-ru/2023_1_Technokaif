import { ID_LOG as ID, CLASS_LOG as CLASS } from '../../utils/config/id.js';

/**
 *
 * @returns -- all settings to form template in login
 */
export function logFormSetup () {
    return {
        errorTop: CLASS.errorTop,
        topID: 'serverErrors',
        content: 'content',
        header: 'header',
        title: CLASS.title,
        logoSrc: '/static/svg/logo.svg',

        titleClass: 'page-title',
        titleName: 'Fluire',
        descriptionClass: 'page-description',
        descriptionLabelClass: 'descriptionLabel',
        descriptionName: 'Log in to continue',
        divBeforeForm: 'log',
        formDiv: 'log-form',
        inputs: [
            {
                divBeforeInput: CLASS.divBeforeInput,
                typeOfInput: 'text',
                nameOfField: 'username',
                labelClass: 'log-input-label',
                labelText: 'Login:',
                placeholder: 'Your username or email',
                classInp: CLASS.classInp,
                id: ID.login,
                errorDiv: CLASS.errorDiv,
                errorId: null
            },
            {
                divBeforeInput: CLASS.divBeforeInput,
                typeOfInput: 'password',
                nameOfField: 'password',
                labelClass: 'log-input-label',
                labelText: 'Password:',
                placeholder: 'Your password',
                classInp: CLASS.classInp,
                id: ID.password,
                errorDiv: CLASS.errorDiv,
                errorId: null
            }
        ],
        placementClass: null,
        placementId: null,
        divButton: 'log-btn auth-btn',
        buttonType: 'submit',
        buttonClass: 'log-but',
        textButton: 'Sign In',
        divHrClass: 'hr-position',
        hrClass: 'auth-form-hr',
        bottomClass: 'log-bottom',
        divBottomLabel: 'have-acc-label',
        bottomLabelClass: 'have-acc',
        bottomLabelText: 'Don\'t have an account?',
        linkDiv: 'linkDiv',
        linkHref: '/',
        linkClass: CLASS.link,
        linkText: 'Registration'
    };
}
