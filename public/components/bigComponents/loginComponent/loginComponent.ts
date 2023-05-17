import './loginComponent.less';
import { componentsNames } from '@config/componentsNames';
import { logFormSetup } from '@setup/loginSetup';
import { METHOD } from '@config/config';
import { EventTypes } from '@config/EventTypes';
import { ERRORS_LOG } from '@config/errors';
import UserActions from '@API/UserActions';
import ValidationActions from '@Actions/ValidationActions';
import UserInfoStore from '@store/UserInfoStore';
import API from '@store/API';
import { BaseComponent } from '@components/BaseComponent';
import Router from '@router/Router';
import { Form } from '@bigComponents/form/form';
import { routingUrl } from '@config/routingUrls';
import template from './loginComponent.handlebars';

const ElementsClassForLogin = {
    login: 'js__login',
    email: 'js__email',
    password: 'js__password',

    login_error: 'js__error__login',
    email_error: 'js__error__email',
    password_error: 'js__error__password',
};

/** Form component for login. */
export class LoginComponent extends BaseComponent {
    /** parent where to render elements */
    #parent;

    /** Set parent */
    constructor(parent) {
        super(parent, [], template, componentsNames.LOGIN_FORM);
        this.#parent = parent;
    }

    /** Render content of component */
    #renderContent() {
        const form = new Form(
            this.#parent,
            logFormSetup(),
        );
        form.render();
    }

    /** Create listeners for fields. Send actions to dispatchers. */
    #createActionsForFields() {
        const login: HTMLInputElement|null = document.querySelector(
            `.${ElementsClassForLogin.login}`,
        );
        const password: HTMLInputElement|null = document.querySelector(
            `.${ElementsClassForLogin.password}`,
        );
        const header: HTMLAnchorElement|null = document.querySelector('.title');
        const main: HTMLElement|null = document.querySelector('.content');
        const bottomButton: HTMLAnchorElement|null = document.querySelector('.bottom__button');

        if (!login || !password || !header || !main || !bottomButton) {
            console.error('Error in fields');
            return;
        }

        login.addEventListener(METHOD.CHANGE_FIELD_IMMEDIATELY, (event) => {
            event.preventDefault();
            ValidationActions.validationField('log_username', login.value);
        });

        password.addEventListener(METHOD.CHANGE_FIELD_IMMEDIATELY, (event) => {
            event.preventDefault();
            ValidationActions.validationField('log_password', password.value);
        });

        header.addEventListener(METHOD.BUTTON, (event) => {
            event.preventDefault();
            Router.go(routingUrl.ROOT);
        });

        main.addEventListener(
            METHOD.FORM,
            (event) => {
                event.preventDefault();
                ValidationActions.validateAll('validate_login', password.value);
            },
        );

        bottomButton.addEventListener(METHOD.BUTTON, (event) => {
            event.preventDefault();
            Router.go(routingUrl.REGISTER);
        });
    }

    /** Subscribe for stores */
    #subscribeStore() {
        UserInfoStore.subscribe(
            (name, status) => { this.dispatchErrors(name, status); },
            EventTypes.VALIDATION_RESPONSE,
            this.name,
        );
        UserInfoStore.subscribe(
            (status) => { this.sendAllData(status); },
            EventTypes.SEND_DATA,
            this.name,
        );
        API.subscribe(
            (message) => {
                this.#handleLoginResponse(message);
            },
            EventTypes.LOGIN_STATUS,
            this.name,
        );
    }

    /**
     * Render p in whatSearch element with text error if status != 'OK'
     * @param whatSearch - class of element to search
     * @param status - status of validation. 'OK' - not render
     * @param error - text of error
     */
    #errorsRender(whatSearch, status, error) {
        const placeForError: HTMLElement|null = document.querySelector(`.${whatSearch}`);
        if (!placeForError) {
            console.error('Error in fields errors placement', whatSearch);
            return;
        }

        if (status === 'OK') {
            placeForError.innerHTML = '';
        } else {
            placeForError.innerHTML = `<p class="error">${error}</p>`;
        }
    }

    /**
     * Dispatch errors
     * @param nameOfField - name of field for errors
     * @param status - status of project
     */
    dispatchErrors(nameOfField, status) {
        switch (nameOfField) {
        case 'username':
            this.#errorsRender(ElementsClassForLogin.login_error, status, status);
            break;
        case 'email':
            this.#errorsRender(ElementsClassForLogin.login_error, status, ERRORS_LOG.email);
            break;
        case 'password':
            this.#errorsRender(ElementsClassForLogin.password_error, status, status);
            break;
        default:
        }
    }

    /**
     * If status === 'OK' then send data to backend
     * @param status
     */
    sendAllData(status) {
        if (status === 'OK') {
            const { login } = UserInfoStore.state;
            const passElement: HTMLInputElement|null = document.querySelector(`.${ElementsClassForLogin.password}`);
            if (!passElement) {
                console.error('Error in fields data');
                return;
            }

            UserActions.login(
                login,
                passElement.value,
            );
        }
    }

    /**
     * Method to handle api response from login
     * @param message
     */
    #handleLoginResponse(message) {
        if (message === 'OK') {
            // eslint-disable-next-line no-restricted-globals
            history.go(-1);
        } else {
            const element: HTMLParagraphElement|null = document.querySelector('.title__error-text');
            if (!element) {
                console.error('Error in login error text');
                return;
            }

            element.hidden = false;
            element.innerText = message;
        }
    }

    /** Render all view by components. */
    override render() {
        this.#renderContent();
        this.appendElement();

        this.#createActionsForFields();
        this.#subscribeStore();

        document.title = 'Login';
    }
}
