import { BaseComponent } from '../BaseComponent';
import { logFormSetup } from '../../utils/setup/loginSetup';
import template from '../form/form.handlebars';
import Actions from '../../actions/Actions';
import Router from '../../router/Router';
import { ERRORS_LOG } from '../../utils/config/errors';

const EVENTS_ON_LOGIN = {
    validate_username: 'log_username',
    validate_password: 'log_password',
    validate_all: 'validate_login',
};

const ElementsClassForLogin = {
    login: 'js__login',
    email: 'js__email',
    password: 'js__password',

    login_error: 'js__error__login',
    email_error: 'js__error__email',
    password_error: 'js__error__password',
};

const METHOD = 'focusout';

/** Create form fo login and render it in parent */
export class LoginForm extends BaseComponent {
    constructor(parent) {
        super(parent, logFormSetup(), template);
    }

    #addEventListenersOnFields() {
        const login = document.querySelector('.js__login');
        const password = document.querySelector('.js__password');
        const header = document.querySelector('.header');
        const bottomButton = document.querySelector('.bottom__button');

        login.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField(
                EVENTS_ON_LOGIN.validate_username,
                login.value,
            );
        });
        password.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField(
                EVENTS_ON_LOGIN.validate_password,
                password.value,
            );
        });

        header.addEventListener('click', (event) => {
            event.preventDefault();
            Router.go('/');
        });

        document.querySelector('.content').addEventListener('submit', (event) => {
            event.preventDefault();
            Actions.validateAll(EVENTS_ON_LOGIN.validate_all, password.value);
        });

        bottomButton.addEventListener('click', (event) => {
            event.preventDefault();
            Router.go('/register');
        });
    }

    #addEventListenersOnErrors() {

    }

    dispatch(nameOfField, status) {
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
            console.error('Not nameOfField on login page', nameOfField);
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
                document.querySelector('.js__password').value,
            );
        }
    }

    /**
     * Method to handle api response from login
     * @param message
     */
    handleLoginResponse(message) {
        if (message === 'OK') {
            Router.go('/');
        } else {
            const element = document.querySelector('.title__error-text');
            element.hidden = false;
            element.innerText = message;
        }
    }

    render() {
        super.render();

        this.#addEventListenersOnFields();
        this.#addEventListenersOnErrors();
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
}
