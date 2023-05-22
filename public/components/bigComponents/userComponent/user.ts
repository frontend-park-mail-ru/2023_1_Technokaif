import { Button } from '@smallComponents/Button/button';
import { Avatar } from '@smallComponents/avatar/avatar';
import { dateSetup } from '@setup/registrationSetup';
import { ElementsClassForUser, METHOD, RESPONSES } from '@config/config';
import { ERRORS_USER } from '@config/errors';
import { EventTypes } from '@config/EventTypes';
import { componentsNames } from '@config/componentsNames';
import { componentsJSNames } from '@config/componentsJSNames';
import { BaseComponent } from '@components/BaseComponent';
import UserInfoStore from '@store/UserInfoStore';
import Router from '@router/Router';
import API from '@store/API';
import UserActions from '@API/UserActions';
import ValidationActions from '@Actions/ValidationActions';
import { Form } from '@bigComponents/form/form';
import { routingUrl } from '@config/routingUrls';

import template from './user.handlebars';
import './user.less';

/**
 * Class for artists content in main page.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json general fields.
 * @param {json} dateConf - Config with json fields for date fields.
 */
export class User extends BaseComponent {
    #parent;

    #config;

    fileInput;

    /**
     *
     * @param {HTMLElement} parent -- html element where User page will be placed
     * @param {Object} config -- config for User component
     */
    constructor(parent, config) {
        super(parent, config, template, componentsJSNames.USER);

        this.#parent = parent;
        this.#config = config;
        this.fileInput = document.createElement('input');
        this.fileInput.setAttribute('type', 'file');
        this.fileInput.setAttribute('id', 'file');
        this.fileInput.style.display = 'none';
    }

    /**
     *  @description render User in parent element
     */
    override render() {
        super.appendElement();

        const avatarPlacement = this.#parent.querySelector('.js__placement__avatar');
        const formsPlacement = this.#parent.querySelector('.js__placement__where__form');
        const buttonsPlacement = this.#parent.querySelector('.js__placement__buttons');

        const avatar = new Avatar(avatarPlacement, this.#config);
        avatar.render();

        const formL = new Form(formsPlacement, this.#config.leftForm, dateSetup());
        formL.render();

        const formPassword = new Form(formsPlacement, this.#config.passwordForm);
        formPassword.render();

        const buttonCancel = new Button(buttonsPlacement, this.#config.buttons[0]);
        buttonCancel.appendElement();

        const buttonSubmit = new Button(buttonsPlacement, this.#config.buttons[1]);
        buttonSubmit.appendElement();

        this.#subscribeForStores();
        UserActions.user(localStorage.getItem('userId'));
        document.title = 'Profile';
    }

    /** Add creation of Actions on User action on page */
    #addEventListenersForFields() {
        const email: HTMLInputElement|null = document.querySelector(`.${ElementsClassForUser.email}`);
        const password: HTMLInputElement|null = document.querySelector(`.${ElementsClassForUser.password}`);
        const newPassword: HTMLInputElement|null = document.querySelector(`.${ElementsClassForUser.newPassword}`);
        const newConfPassword: HTMLInputElement|null = document.querySelector(`.${ElementsClassForUser.newConfPassword}`);
        const day: HTMLInputElement|null = document.querySelector(`.${ElementsClassForUser.day}`);
        const month: HTMLInputElement|null = document.querySelector(`.${ElementsClassForUser.month}`);
        const year: HTMLInputElement|null = document.querySelector(`.${ElementsClassForUser.year}`);
        const cancelButton: HTMLButtonElement|null = document.querySelector(`.${ElementsClassForUser.cancelButton}`);
        const saveButton: HTMLButtonElement|null = document.querySelector(`.${ElementsClassForUser.saveButton}`);
        if (
            !email || !password || !newPassword || !newConfPassword || !day || !month
            || !year || !cancelButton || !saveButton
        ) {
            console.error('Not found field on user page');
            return;
        }

        email.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            ValidationActions.validationField('email', email.value);
        });

        password.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            ValidationActions.validationField('password', password.value);
        });

        newPassword.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            ValidationActions.validationField('newPassword', newPassword.value);
        });

        newConfPassword.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            ValidationActions.validationField('newConfPassword', {
                newPassword: newPassword.value,
                confPassword: newConfPassword.value,
            });
        });

        day.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            ValidationActions.validationField('day', day.value);
        });

        month.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            ValidationActions.validationField('month', month.value);
        });

        year.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            ValidationActions.validationField('year', year.value);
        });

        cancelButton.addEventListener(METHOD.BUTTON, (event) => {
            event.preventDefault();
            Router.go(routingUrl.ROOT);
        });

        saveButton.addEventListener(METHOD.BUTTON, (event) => {
            event.preventDefault();

            ValidationActions.validateAll('userPageValidate', {
                email: email.value,
                day: day.value,
                month: month.value,
                year: year.value,
            });

            if (password.value !== '' || newPassword.value !== '' || newConfPassword.value !== '') {
                ValidationActions.validateAll('userPagePasswordValidate', {
                    password: password.value,
                    newPassword: newPassword.value,
                    newConfPassword: newConfPassword.value,
                });
            }
        });
    }

    /** Add date for fields. Used when open page and need date in forms */
    #addDataToFields() {
        const values = UserInfoStore.state;
        const avatarImg: HTMLImageElement|null = document.querySelector('.user-profile__img');
        if (!avatarImg) {
            console.error('Cannot find user image element');
            return;
        }
        // todo create IMG in userstore
        if (!values.avatarSrc || values.avatarSrc === '') {
            avatarImg.src = '/static/svg/default-artist.svg';
        } else {
            avatarImg.src = `/media${values.avatarSrc}`;
        }
        const usernameTextElement: HTMLParagraphElement|null = document.querySelector('.user-profile__username-text');
        const initialsTextElement: HTMLParagraphElement|null = document.querySelector('.user-profile__initials-text');

        const email: HTMLInputElement|null = document.querySelector(`.${ElementsClassForUser.email}`);
        const day: HTMLInputElement|null = document.querySelector(`.${ElementsClassForUser.day}`);
        const year: HTMLInputElement|null = document.querySelector(`.${ElementsClassForUser.year}`);
        const month: HTMLInputElement|null = document.querySelector(`.${ElementsClassForUser.month}`);
        if (!usernameTextElement || !initialsTextElement || !email || !day || !year || !month) {
            console.error('Error in user data elements');
            return;
        }

        usernameTextElement.innerText = values.username;
        initialsTextElement.innerText = `${values.firstName} ${values.lastName}`;
        email.value = values.email;
        day.value = values.day;
        year.value = values.year;
        month.value = values.month;
    }

    /**
     * Render p in whatSearch element with text error if status != 'OK'
     * Clear on 'OK' status
     * @param whatSearch - class of element to search
     * @param status - status of validation. 'OK' - not render
     * @param error - text of error
     */
    #errorsRender(whatSearch, status, error) {
        const placeForError: HTMLElement|null = document.querySelector(`.${whatSearch}`);
        if (!placeForError) {
            console.error('Error in user error renders');
            return;
        }

        if (status === 'OK') {
            placeForError.innerHTML = '';
        } else {
            placeForError.innerHTML = `<p class="error">${error}</p>`;
        }
    }

    /**
     * Only default user data
     * If status === 'OK' then send data to backend
     * @param status
     */
    #sendAllDataToAPI(status) {
        if (status === RESPONSES.OK) {
            const { state } = UserInfoStore;
            const date = new Date(`${state.month} 1, 2000`);
            const monthNumber = date.getMonth() + 1;
            let month: string;
            if (monthNumber < 10) {
                month = `0${monthNumber}`;
            } else {
                month = String(monthNumber);
            }
            let { day } = state;
            if (day < 10) {
                day = `0${day}`;
            }
            UserActions.userUpdateData(localStorage.getItem('userId'), {
                email: state.email,
                firstName: state.firstName,
                lastName: state.lastName,
                birthDate: [state.year, month, day].join('-'),
                sex: 'M',
            });
        }
    }

    /**
     * Special for passwords
     * If status === 'OK' then send data to backend
     * @param status
     */
    #sendAllDataCredential(status) {
        if (status === RESPONSES.OK) {
            const password: HTMLInputElement|null = document.querySelector(`.${ElementsClassForUser.password}`);
            const newPassword: HTMLInputElement|null = document.querySelector(`.${ElementsClassForUser.newPassword}`);
            if (!password || !newPassword) {
                console.error('Error in user password elements');
                return;
            }

            UserActions.userUpdatePassword({
                oldPassword: password.value,
                newPassword: newPassword.value,
            });
        }
    }

    /**
     * Check for error in field and render it
     * @param nameOfField - name of field where check
     * @param status - if 'OK' error don't render. if 'BAD' error render
     */
    dispatchErrors(nameOfField, status) {
        switch (nameOfField) {
        case 'email':
            this.#errorsRender(
                ElementsClassForUser.email_error,
                status,
                ERRORS_USER.email,
            );
            break;
        case 'password':
            this.#errorsRender(
                ElementsClassForUser.password_error,
                status,
                status,
            );
            break;
        case 'newPassword':
            this.#errorsRender(
                ElementsClassForUser.newPasswordError,
                status,
                status,
            );
            break;
        case 'newConfPassword':
            this.#errorsRender(
                ElementsClassForUser.newConfPasswordError,
                status,
                ERRORS_USER.newPassword,
            );
            break;
        case 'day':
            this.#errorsRender(
                ElementsClassForUser.day_error,
                status,
                ERRORS_USER.day,
            );
            break;
        case 'month':
            this.#errorsRender(
                ElementsClassForUser.month_error,
                status,
                ERRORS_USER.month,
            );
            break;
        case 'year':
            this.#errorsRender(
                ElementsClassForUser.year_error,
                status,
                ERRORS_USER.year,
            );
            break;
        case 'date':
            this.#errorsRender(
                ElementsClassForUser.date_error,
                status,
                status,
            );
            break;
        default:
        }
    }

    /** Subscribe component for Stores */
    #subscribeForStores() {
        UserInfoStore.subscribe(
            () => {
                this.#addDataToFields();
                this.#addEventListenersForFields();
            },
            EventTypes.USER_DATA_GOT_FOR_PAGE,
            componentsNames.USER,
        );
        UserInfoStore.subscribe(
            (name, status) => { this.dispatchErrors(name, status); },
            EventTypes.VALIDATION_RESPONSE,
            componentsNames.USER,
        );
        UserInfoStore.subscribe(
            (status) => { this.#sendAllDataToAPI(status); },
            EventTypes.SEND_DATA,
            componentsNames.USER,
        );
        UserInfoStore.subscribe(
            (status) => { this.#sendAllDataCredential(status); },
            EventTypes.SEND_DATA_WITH_PASSWORD,
            componentsNames.USER,
        );
        API.subscribe(
            (message) => {
                const errorElement: HTMLDivElement|null = document.querySelector('.user__error-text');
                const successElement: HTMLDivElement|null = document.querySelector('.user__success-text');
                if (!errorElement || !successElement) {
                    console.error('No any error or success blocks');
                    return;
                }

                if (message !== 'OK') {
                    console.error(message);
                    successElement.hidden = true;
                    errorElement.hidden = false;
                    errorElement.innerText = message;
                } else {
                    errorElement.hidden = true;
                    successElement.hidden = false;
                    successElement.innerText = 'Successfully changed user info';
                }
            },
            EventTypes.UPDATE_DATA_RECEIVED,
            this.name,
        );
        API.subscribe(
            (message) => {
                const errorElement: HTMLDivElement|null = document.querySelector('.user__error-text');
                const successElement: HTMLDivElement|null = document.querySelector('.user__success-text');
                if (!errorElement || !successElement) {
                    console.error('No any error or success blocks');
                    return;
                }

                if (message !== 'OK') {
                    console.error(message);
                    successElement.hidden = true;
                    errorElement.hidden = false;
                    errorElement.innerText = message;
                } else {
                    errorElement.hidden = true;
                    successElement.hidden = false;
                    successElement.innerText = 'Successfully changed password';
                }
            },
            EventTypes.UPDATE_DATA_WITH_PASS_RECEIVED,
            this.name,
        );

        API.subscribe(
            (message, cover) => {
                const errorElement: HTMLDivElement|null = document.querySelector('.user__error-text');
                const successElement: HTMLDivElement|null = document.querySelector('.user__success-text');
                if (!errorElement || !successElement) {
                    console.error('No any error or success blocks');
                    return;
                }

                if (message !== 'OK') {
                    console.error(message);
                    successElement.hidden = true;
                    errorElement.hidden = false;
                    errorElement.innerText = message;
                } else {
                    errorElement.hidden = true;
                    successElement.hidden = false;
                    successElement.innerText = 'Successfully changed avatar';
                    const avatarImg = this.#parent.querySelector('.user-profile__img');
                    const blob = new Blob([cover], { type: 'image/jpeg' });
                    const imageUrl = URL.createObjectURL(blob);
                    avatarImg.src = imageUrl;
                }
            },
            EventTypes.UPDATE_DATA_WITH_AVATAR_RECEIVED,
            this.name,
        );

        const avatar: HTMLDivElement|null = this.#parent.querySelector('.avatar');
        const root: HTMLDivElement|null = document.querySelector(`#${componentsJSNames.ROOT}`);
        if (!root || !avatar) {
            console.error('Error in user avatar elements');
            return;
        }

        avatar.addEventListener('click', () => {
            root.appendChild(this.fileInput);
            this.fileInput.click();
        });

        this.fileInput.addEventListener('change', () => {
            const file = this.fileInput.files[0];

            const formData = new FormData();
            formData.append('avatar', file);

            UserActions.userUpdateAvatar(localStorage.getItem('userId'), formData);
            root.removeChild(this.fileInput);
        });
    }
}
