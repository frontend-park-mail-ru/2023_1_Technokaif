import template from './user.handlebars';
import { Button } from '../../smallComponents/Button/button';
import { Avatar } from '../../smallComponents/avatar/avatar';
import { Form } from '../form/form';
import { dateSetup, sexSetup } from '../../../utils/setup/registrationSetup';
import './user.less';
import Actions from '../../../actions/Actions';
import { getCheckedValueRadioButtons } from '../../../utils/functions/utils';
import { ElementsClassForUser, METHOD, RESPONSES } from '../../../utils/config/config';
import Router from '../../../router/Router';
import UserInfoStore from '../../../stores/UserInfoStore';
import ApiActions from '../../../actions/ApiActions';
import { ERRORS_USER } from '../../../utils/config/errors';
import { EventTypes } from '../../../utils/config/EventTypes';
import { componentsNames } from '../../../utils/config/componentsNames';
import { BaseComponent } from '../../BaseComponent';
import { componentsJSNames } from '../../../utils/config/componentsJSNames';

/**
 * Class for artists content in main page.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json general fields.
 * @param {json} sexConf - Config with json fields for gender.
 * @param {json} dateConf - Config with json fields for date fields.
 */
export class User extends BaseComponent {
    #parent;

    #config;

    /**
     *
     * @param {HTMLElement} parent -- html element where User page will be placed
     * @param {Object} config -- config for User component
     */
    constructor(parent, config) {
        super(parent, config, template, componentsJSNames.USER);

        this.#parent = parent;
        this.#config = config;
    }

    /**
     *  @description render User in parent element
     */
    render() {
        const renderPromise = new Promise((resolve) => {
            super.appendElement();
            resolve();

            const avatarPlacement = this.#parent.querySelector('.js__placement__avatar');
            const formsPlacement = this.#parent.querySelector('.js__placement__where__form');
            const buttonsPlacement = this.#parent.querySelector('.js__placement__buttons');

            const avatar = new Avatar(avatarPlacement, this.#config);
            avatar.render();

            const formLeft = new Form(formsPlacement, this.#config.leftForm, sexSetup(), dateSetup());
            formLeft.render();

            const formPassword = new Form(formsPlacement, this.#config.passwordForm);
            formPassword.render();

            const buttonCancel = new Button(buttonsPlacement, this.#config.buttons[0]);
            buttonCancel.appendElement();

            const buttonSubmit = new Button(buttonsPlacement, this.#config.buttons[1]);
            buttonSubmit.appendElement();
        });

        renderPromise.then(() => {
            this.#subscribeForStores();
            ApiActions.user(localStorage.getItem('userId'));
        });
    }

    /** Add creation of Actions on User action on page */
    #addEventListenersForFields() {
        const email = document.querySelector(`.${ElementsClassForUser.email}`);
        const genders = document.querySelector(`.${ElementsClassForUser.gender}`);
        const password = document.querySelector(`.${ElementsClassForUser.password}`);
        const newPassword = document.querySelector(`.${ElementsClassForUser.newPassword}`);
        const newConfPassword = document.querySelector(`.${ElementsClassForUser.newConfPassword}`);
        const day = document.querySelector(`.${ElementsClassForUser.day}`);
        const month = document.querySelector(`.${ElementsClassForUser.month}`);
        const year = document.querySelector(`.${ElementsClassForUser.year}`);
        const cancelButton = document.querySelector(`.${ElementsClassForUser.cancelButton}`);
        const saveButton = document.querySelector(`.${ElementsClassForUser.saveButton}`);

        email.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('email', email.value);
        });

        genders.addEventListener(METHOD.FIELD, () => {
            const radioButtons = document.querySelectorAll(`.${ElementsClassForUser.gender_element}`);
            const elementsValues = getCheckedValueRadioButtons(radioButtons);

            Actions.validationField('sex', { gender: elementsValues });
        });

        password.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('password', document.querySelector(`.${ElementsClassForUser.password}`).value);
        });

        newPassword.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('newPassword', newPassword.value);
        });

        newConfPassword.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('newConfPassword', {
                newPassword: newPassword.value,
                confPassword: newConfPassword.value,
            });
        });

        day.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('day', document.querySelector(`.${ElementsClassForUser.day}`).value);
        });

        month.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('month', document.querySelector(`.${ElementsClassForUser.month}`).value);
        });

        year.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('year', document.querySelector(`.${ElementsClassForUser.year}`).value);
        });

        cancelButton.addEventListener(METHOD.BUTTON, (event) => {
            event.preventDefault();
            Router.go('/');
        });

        saveButton.addEventListener(METHOD.BUTTON, (event) => {
            event.preventDefault();
            // todo write reply
            const radioButtons = document.querySelectorAll(`.${ElementsClassForUser.gender_element}`);
            const elementsValues = getCheckedValueRadioButtons(radioButtons);

            Actions.validateAll('userPageValidate', {
                email: email.value,
                day: day.value,
                month: month.value,
                year: year.value,
                gender: elementsValues,
                password: password.value,
                newPassword: newPassword.value,
                newConfPassword: newConfPassword.value,
            });
        });
    }

    /** Add date for fields. Used when open page and need date in forms */
    #addDataToFileds() {
        const values = UserInfoStore.state;
        console.log;
        // todo create IMG in userstore
        document.querySelector('.user-profile__img').src = values.imgSrc;

        document.querySelector('.user-profile__username-text').innerText = values.username;
        document.querySelector('.user-profile__initials-text').innerText = values.firstName + values.lastName;
        document.querySelector(`.${ElementsClassForUser.email}`).value = values.email;
        document.querySelector(`.${ElementsClassForUser.day}`).value = values.day;
        document.querySelector(`.${ElementsClassForUser.year}`).value = values.year;
        document.querySelector(`.${ElementsClassForUser.month}`).value = values.month;
    }

    /**
     * Render p in whatSearch element with text error if status != 'OK'
     * Clear on 'OK' status
     * @param whatSearch - class of element to search
     * @param status - status of validation. 'OK' - not render
     * @param error - text of error
     */
    #errorsRender(whatSearch, status, error) {
        const placeForError = document.querySelector(`.${whatSearch}`);

        if (status === 'OK') {
            placeForError.innerHTML = '';
        } else {
            placeForError.innerHTML = `<p class="error">${error}</p>`;
        }
    }

    /**
     * If status === 'OK' then send data to backend
     * @param status
     */
    #sendAllDataToAPI(status) {
        // todo do we need to check if password correct
        // that we write first
        if (status === RESPONSES.OK) {
            const { state } = UserInfoStore;
            ApiActions.register({
                username: state.username,
                email: state.email,
                firstName: state.firstName,
                lastName: state.lastName,
                sex: state.gender,
                birthDate: [state.year, state.month, state.day].join('-'),
                password: document.querySelector('.js__new__password').value,
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
                ERRORS_USER.password,
            );
            break;
        case 'newPassword':
            this.#errorsRender(
                ElementsClassForUser.newPasswordError,
                status,
                ERRORS_USER.password,
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
        case 'gender':
            this.#errorsRender(
                ElementsClassForUser.gender_error,
                status,
                ERRORS_USER.sex,
            );
            break;
        default:
        }
    }

    /** Subscribe component for Stores */
    #subscribeForStores() {
        UserInfoStore.subscribe(
            () => {
                this.#addDataToFileds();
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

        // todo write subscribe for API
        // API.subscribe(
        //     (message) => {
        //         if (message === RESPONSES.OK) {
        //             Router.go('/');
        //         } else {
        //             console.error('Failed after login with succeeded reg data');
        //         }
        //     },
        //     EventTypes.LOGIN_STATUS,
        //     componentsNames.USER,
        // );
        // API.subscribe(
        //     (message) => {
        //         // this.#loginAfterSuccessRegistration(message);
        //     },
        //     EventTypes.REGISTER_STATUS,
        //     componentsNames.USER,
        // );
    }
}
