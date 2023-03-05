import { ID_LOG as ID } from '../../utils/id.js';

export const CLASS_LOG = {
    errorTop: 'error-server',
    divBeforeInput: 'log-field',
    classInp: 'log-input',
    errorDiv: 'log-error'
};

/**
 *
 * @returns -- all settings to form template in login
 */
export function logFormSetup () {
    return {
        errorTop: CLASS_LOG.errorTop,
        topID: null,
        content: 'content',
        header: 'header',
        title: 'title',
        titleClass: 'page-title',
        titleName: 'Fluire',
        descriptionClass: 'page-description',
        descriptionLabelClass: 'descriptionLabel',
        descriptionName: 'Log in to continue',
        divBeforeForm: 'log',
        formDiv: 'log-form',
        inputs: [
            {
                divBeforeInput: CLASS_LOG.divBeforeInput,
                typeOfInput: 'text',
                nameOfField: 'username',
                labelClass: 'reg-input-label',
                labelText: 'Login:',
                placeholder: 'Your username or email',
                classInp: CLASS_LOG.classInp,
                id: ID.login,
                errorDiv: CLASS_LOG.errorDiv,
                errorId: null
            },
            {
                divBeforeInput: CLASS_LOG.divBeforeInput,
                typeOfInput: 'password',
                nameOfField: 'password',
                labelClass: 'reg-input-label',
                labelText: 'Password:',
                placeholder: 'Your password',
                classInp: CLASS_LOG.classInp,
                id: ID.password,
                errorDiv: CLASS_LOG.errorDiv,
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
        linkClass: 'log-reg-btn auth-btn',
        linkText: 'Registration'
    };
}
