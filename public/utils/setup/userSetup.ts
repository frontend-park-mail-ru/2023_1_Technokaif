import { CLASS_LOG as CLASS } from '@config/id';

/**
 * Return config
 * @returns {JSON} setup to use with user
 */
export function userSetup() {
    return {
        mainUserDiv: 'user',
        classWhereFormIs: 'user__form-placement',
        classForButtons: 'user_button-placement',
        classForErrors: 'user__error-text',
        classForSuccess: 'user__success-text',

        mainAvatarDiv: 'user-profile',
        divBetweenElements: 'user-profile__horizontal-space',
        imgClassDiv: 'avatar',
        imgAvatarClass: 'user-profile__img',
        textClassDiv: '',
        textClass: 'user-profile__initials-text',
        divBetweenTexts: 'user-profile__vertical-space',
        divSmallText: ' ',
        smallTextClass: 'user-profile__username-text',
        arrowClassDiv: null,

        leftForm: {
            content: 'js__formLeft',
            divBeforeForm: 'divBeforeForm',
            formDiv: 'form-data',
            inputs: [
                {
                    divBeforeInput: CLASS.divBeforeInput,
                    typeOfInput: 'email',
                    nameOfField: 'email',
                    labelClass: 'input-block__label',
                    labelText: 'Your email address:',
                    placeholder: 'Your email',
                    classInp: CLASS.classInp,
                    errorDiv: CLASS.errorDiv,
                    errorId: null,
                },
            ],
            placementClass: 'form__placement-additionall',
        },
        passwordForm: {
            content: 'js__formPasswords',
            divBeforeForm: 'divBeforeForm',
            formDiv: 'formDiv',
            inputs: [
                {
                    divBeforeInput: CLASS.divBeforeInput,
                    typeOfInput: 'password',
                    nameOfField: 'password',
                    labelClass: 'input-block__label',
                    labelText: 'Your password:',
                    placeholder: 'Your password',
                    classInp: CLASS.classInp,
                    errorDiv: CLASS.errorDiv,
                    errorId: null,
                },
                {
                    divBeforeInput: CLASS.divBeforeInput,
                    typeOfInput: 'password',
                    nameOfField: 'new__password',
                    labelClass: 'input-block__label',
                    labelText: 'New password:',
                    placeholder: 'Your new password',
                    classInp: CLASS.classInp,
                    errorDiv: CLASS.errorDiv,
                    errorId: null,
                },
                {
                    divBeforeInput: CLASS.divBeforeInput,
                    typeOfInput: 'password',
                    nameOfField: 'new__confirm__password',
                    labelClass: 'input-block__label',
                    labelText: 'Repeat new password:',
                    placeholder: 'Repeat your password',
                    classInp: CLASS.classInp,
                    errorDiv: CLASS.errorDiv,
                    errorId: null,
                },
            ],
        },
        buttons: [
            {
                buttonType: '',
                divButton: 'user__button-cancel js__cancel-button',
                textButton: 'Cancel',
            },
            {
                buttonType: '',
                divButton: 'user__button-save js__save-button',
                textButton: 'Save changes',
            },
        ],
    };
}
