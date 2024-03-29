import { ID_LOG, CLASS_LOG as CLASS } from '@config/id';
import { imgPath } from '@config/pathConfig';

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
        logoSrc: imgPath.whiteLogo,

        titleClass: 'title__name',
        titleName: 'Fluire',
        descriptionClass: 'title__page-description',
        descriptionName: 'Log in to listen without limitations',
        divBeforeForm: 'log',
        formDiv: 'form',
        inputs: [
            {
                divBeforeInput: CLASS.divBeforeInput,
                typeOfInput: 'login',
                nameOfField: 'login',
                labelClass: 'input-block__label',
                labelText: 'Your username or email:',
                placeholder: 'Enter username or email',
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
                placeholder: 'Enter your password',
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
        'bottom-placement': 'not_nul',
    };
}
