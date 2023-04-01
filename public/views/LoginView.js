import { BaseView } from './BaseView';
import { pageNames } from '../utils/config/pageNames';
import Actions from '../actions/Actions';
import UserInfoStore from '../stores/UserInfoStore';
import { ERRORS_LOG } from '../utils/config/errors';
import { EventTypes } from '../stores/EventTypes';
import ApiActions from '../actions/ApiActions';
import ComponentsStore from '../stores/ComponentsStore';
import Router from '../router/Router';
import userInfoStore from '../stores/UserInfoStore';

const METHOD = 'focusout';
// todo temporary json
const ElementsClassForLogin = {
    login: 'js__login',
    email: 'js__email',
    password: 'js__password',

    login_error: 'js__error__login',
    email_error: 'js__error__email',
    password_error: 'js__error__password',
};

/** Class for feed page view. */
export class LoginView extends BaseView {
    /** Store input field and its js class */
    #inputsOnView;

    /** Constructor for feed page view. */
    constructor() {
        super(pageNames.LOGIN);
        this.#inputsOnView = {
            login: ElementsClassForLogin.login,
            password: ElementsClassForLogin.password,
        };
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
            console.error('Not nameOfField on login page', nameOfField);
        }
    }

    /**
     * If status === 'OK' then send data to backend
     * @param status
     */
    sendAllData(status) {
        if (status === 'OK') {
            const { login } = userInfoStore.state;
            ApiActions.login(
                login,
                document.querySelector(`.${this.#inputsOnView.password}`).value,
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

    /** Function to create a callback on event. */
    #addEventListenerInsideElements() {
        this.#createActionsForFields();
        UserInfoStore.subscribe(
            (name, status) => { this.dispatchErrors(name, status); },
            EventTypes.VALIDATION_RESPONSE,
        );
        UserInfoStore.subscribe(
            (status) => { this.sendAllData(status); },
            EventTypes.SEND_DATA,
        );
        UserInfoStore.subscribe(
            (message) => {
                this.#handleLoginResponse(message);
            },
            EventTypes.LOGIN_STATUS,
        );
    }

    /** Create listeners for fields. Send actions to dispatchers. */
    #createActionsForFields() {
        const login = document.querySelector(`.${this.#inputsOnView.login}`);
        login.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('log_username', document.querySelector(`.${this.#inputsOnView.login}`).value);
        });

        const password = document.querySelector(`.${this.#inputsOnView.password}`);
        password.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('log_password', document.querySelector(`.${this.#inputsOnView.password}`).value);
        });

        const button = document.querySelector('.form__button');
        button.addEventListener('click', (event) => {
            event.preventDefault();
            Actions.validateAll('validate_login', password.value);
        });

        const bottomButton = document.querySelector('.bottom__button');
        bottomButton.addEventListener('click', (event) => {
            event.preventDefault();
            Router.go('/register');
        });
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
     * Render all view by components.
     */
    render() {
        super.render();
        UserInfoStore.unsubscribeAll();
        Actions.whatRender(super.name);
        ComponentsStore.unsubscribeAll();

        this.#addEventListenerInsideElements();

        /* todo async functions dispatch from general scope and unsubscribe after base class render
        todo happened and login didn't send Action. THINK ABOUT IT OR DO LIKE this case.
        */
        // const renderSup = async () => {
        //     await super.render();
        // };
        //
        // renderSup().then(() => {
        //     Actions.whatRender(super.name);
        //     this.callEventListener();
        //     this.#addEventListenerInsideElements();
        // });
    }
}

export default new LoginView();
