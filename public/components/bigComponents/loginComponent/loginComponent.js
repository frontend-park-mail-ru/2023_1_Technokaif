import './loginComponent.less';
import template from './loginComponent.handlebars';
import { BaseComponent } from '../../BaseComponent';
import { componentsNames } from '../../../utils/config/componentsNames';
import { logFormSetup } from '../../../utils/setup/loginSetup';
import Actions from '../../../actions/Actions';
import { Form } from '../form/form';
import { METHOD } from '../../../utils/config/config';
import Router from '../../../router/Router';
import UserInfoStore from '../../../stores/UserInfoStore';
import { EventTypes } from '../../../utils/config/EventTypes';
import API from '../../../stores/API';
import { ERRORS_LOG } from '../../../utils/config/errors';
import ApiActions from '../../../actions/ApiActions';

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
        const login = document.querySelector(
            `.${ElementsClassForLogin.login}`,
        );
        login.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('log_username', login.value);
        });

        const password = document.querySelector(
            `.${ElementsClassForLogin.password}`,
        );
        password.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('log_password', password.value);
        });

        const header = document.querySelector('.header');
        header.addEventListener(METHOD.BUTTON, (event) => {
            event.preventDefault();
            Router.go('/');
        });

        document.querySelector('.content').addEventListener(
            METHOD.FORM,
            (event) => {
                event.preventDefault();
                Actions.validateAll('validate_login', password.value);
            },
        );

        const bottomButton = document.querySelector('.bottom__button');
        bottomButton.addEventListener(METHOD.BUTTON, (event) => {
            event.preventDefault();
            Router.go('/register');
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
        const placeForError = document.querySelector(`.${whatSearch}`);

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
            this.#errorsRender(ElementsClassForLogin.login_error, status, ERRORS_LOG.username);
            break;
        case 'email':
            this.#errorsRender(ElementsClassForLogin.login_error, status, ERRORS_LOG.email);
            break;
        case 'password':
            this.#errorsRender(ElementsClassForLogin.password_error, status, ERRORS_LOG.password);
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
            ApiActions.login(
                login,
                document.querySelector(`.${ElementsClassForLogin.password}`).value,
            );
        }
    }

    /**
     * Method to handle api response from login
     * @param message
     */
    #handleLoginResponse(message) {
        if (message === 'OK') {
            Router.go('/');
        } else {
            const element = document.querySelector('.title__error-text');
            element.hidden = false;
            element.innerText = message;
        }
    }

    /** Render all view by components. */
    render() {
        const renderProcess = new Promise((resolve) => {
            this.#renderContent();
            super.appendElement();
            resolve();
        });

        renderProcess.then(() => {
            this.#createActionsForFields();
            this.#subscribeStore();
        });
    }
}
