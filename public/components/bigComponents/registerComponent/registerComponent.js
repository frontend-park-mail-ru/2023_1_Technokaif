import { BaseComponent } from '../../BaseComponent';
import templateHtml from './registerComponent.handlebars';
import { componentsNames } from '../../../utils/config/componentsNames';
import { Form } from '../form/form';
import { dateSetup, regFormSetup, sexSetup } from '../../../utils/setup/registrationSetup';
import Actions from '../../../actions/Actions';
import { getCheckedValueRadioButtons } from '../../../utils/functions/utils';
import Router from '../../../router/Router';
import { METHOD } from '../../../utils/config/config';
import UserInfoStore from '../../../stores/UserInfoStore';
import { EventTypes } from '../../../utils/config/EventTypes';
import API from '../../../stores/API';
import { ERRORS_REG } from '../../../utils/config/errors';
import ApiActions from '../../../actions/ApiActions';

const ElementsClassForRegister = {
    login: 'js__login',
    email: 'js__email',
    confEmail: 'js__email-confirm',
    password: 'js__password',
    username: 'js__username',
    firstName: 'js__firstname',
    lastName: 'js__lastname',
    day: 'js__day',
    month: 'js__month',
    year: 'js__year',
    gender: 'js__gender',
    gender_element: 'js__gender__element',

    login_error: 'js__error__login',
    email_error: 'js__error__email',
    confEmail_error: 'js__error__email-confirm',
    password_error: 'js__error__password',
    username_error: 'js__error__username',
    firstName_error: 'js__error__firstName',
    lastName_error: 'js__error__lastName',
    day_error: 'js__error__day',
    month_error: 'js__error__month',
    year_error: 'js__error__year',
    gender_error: 'js__error__gender',
};

/** Component for register form */
export class RegisterComponent extends BaseComponent {
    /** parent where to render elements */
    #parent;

    /** Set parent */
    constructor(parent) {
        super(parent, [], templateHtml, componentsNames.REGISTER_FORM);
        this.#parent = parent;
    }

    /** Render content of component */
    #renderContent() {
        const form = new Form(
            this.#parent,
            regFormSetup(),
            sexSetup(),
            dateSetup(),
        );
        form.render();
    }

    /** Add listeners to fields. */
    #addEventListeners() {
        const email = document.querySelector(`.${ElementsClassForRegister.email}`);

        email.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('email', document.querySelector(`.${ElementsClassForRegister.email}`).value);
        });

        const confEmail = document.querySelector(`.${ElementsClassForRegister.confEmail}`);
        confEmail.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('confEmail', document.querySelector(`.${ElementsClassForRegister.confEmail}`).value);
        });

        const password = document.querySelector(`.${ElementsClassForRegister.password}`);
        password.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('password', document.querySelector(`.${ElementsClassForRegister.password}`).value);
        });

        const username = document.querySelector(`.${ElementsClassForRegister.username}`);
        username.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('username', document.querySelector(`.${ElementsClassForRegister.username}`).value);
        });

        const firstName = document.querySelector(`.${ElementsClassForRegister.firstName}`);
        firstName.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('firstname', document.querySelector(`.${ElementsClassForRegister.firstName}`).value);
        });

        const lastName = document.querySelector(`.${ElementsClassForRegister.lastName}`);
        lastName.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('lastname', document.querySelector(`.${ElementsClassForRegister.lastName}`).value);
        });

        const day = document.querySelector(`.${ElementsClassForRegister.day}`);
        day.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('day', document.querySelector(`.${ElementsClassForRegister.day}`).value);
        });

        const month = document.querySelector(`.${ElementsClassForRegister.month}`);
        month.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('month', document.querySelector(`.${ElementsClassForRegister.month}`).value);
        });

        const year = document.querySelector(`.${ElementsClassForRegister.year}`);
        year.addEventListener(METHOD.FIELD, (event) => {
            event.preventDefault();
            Actions.validationField('year', document.querySelector(`.${ElementsClassForRegister.year}`).value);
        });

        const genders = document.querySelector(`.${ElementsClassForRegister.gender}`);
        genders.addEventListener(METHOD.FIELD, () => {
            const radioButtons = document.querySelectorAll(`.${ElementsClassForRegister.gender_element}`);
            const elementsValues = getCheckedValueRadioButtons(radioButtons);

            Actions.validationField('sex', { gender: elementsValues });
        });

        const header = document.querySelector('.header');
        header.addEventListener('click', (event) => {
            event.preventDefault();
            Router.go('/');
        });

        document.querySelector('.content').addEventListener('submit', (event) => {
            event.preventDefault();
            Actions.validateAll('validate_register', password.value);
        });

        const bottomButton = document.querySelector('.bottom__button');
        bottomButton.addEventListener('click', (event) => {
            event.preventDefault();
            Router.go('/login');
        });
    }

    /** Subscribe for stores */
    #subscribe() {
        UserInfoStore.subscribe(
            (name, status) => {
                this.dispatchErrors(name, status);
            },
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
                if (message === 'OK') {
                    Router.go('/');
                } else {
                    console.error('failed after login with succeeded reg data');
                }
            },
            EventTypes.LOGIN_STATUS,
            this.name,
        );
        API.subscribe(
            (message) => {
                this.#loginAfterSuccessRegistration(message);
            },
            EventTypes.REGISTER_STATUS,
            this.name,
        );
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
                ElementsClassForRegister.email_error,
                status,
                ERRORS_REG.email,
            );
            break;
        case 'confEmail':
            this.#errorsRender(
                ElementsClassForRegister.confEmail_error,
                status,
                ERRORS_REG.confirmEmail,
            );
            break;
        case 'password':
            this.#errorsRender(
                ElementsClassForRegister.password_error,
                status,
                ERRORS_REG.password,
            );
            break;
        case 'username':
            this.#errorsRender(
                ElementsClassForRegister.username_error,
                status,
                ERRORS_REG.username,
            );
            break;
        case 'firstName':
            this.#errorsRender(
                ElementsClassForRegister.firstName_error,
                status,
                ERRORS_REG.firstName,
            );
            break;
        case 'lastName':
            this.#errorsRender(
                ElementsClassForRegister.lastName_error,
                status,
                ERRORS_REG.lastName,
            );
            break;
        case 'day':
            this.#errorsRender(
                ElementsClassForRegister.day_error,
                status,
                ERRORS_REG.day,
            );
            break;
        case 'month':
            this.#errorsRender(
                ElementsClassForRegister.month_error,
                status,
                ERRORS_REG.month,
            );
            break;
        case 'year':
            this.#errorsRender(
                ElementsClassForRegister.year_error,
                status,
                ERRORS_REG.year,
            );
            break;
        case 'gender':
            this.#errorsRender(
                ElementsClassForRegister.gender_error,
                status,
                ERRORS_REG.sex,
            );
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
            const { state } = UserInfoStore;
            // todo translate logic to store
            const date = new Date(`${state.month} 1, 2000`);
            let monthNumber = date.getMonth() + 1;
            if (monthNumber < 10) {
                monthNumber = `0${monthNumber}`;
            }

            ApiActions.register({
                username: state.username,
                email: state.email,
                firstName: state.firstName,
                lastName: state.lastName,
                sex: state.gender,
                birthDate: [state.year, monthNumber, state.day].join('-'),
                password: document.querySelector(`.${ElementsClassForRegister.password}`).value,
            });
        }
    }

    /**
     * Method to handle api response to login after success registration
     * @param message
     */
    #loginAfterSuccessRegistration(message) {
        if (message === 'OK') {
            ApiActions.login(
                document.querySelector(`.${ElementsClassForRegister.email}`).value,
                document.querySelector(`.${ElementsClassForRegister.password}`).value,
            );
        } else {
            const element = document.querySelector('.title__error-text');
            element.hidden = false;
            element.innerText = message;
        }
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

    /** Render component in parent */
    render() {
        const renderProcess = new Promise((resolve) => {
            this.#renderContent();
            super.appendElement();
            resolve();
        });

        renderProcess.then(() => {
            this.#subscribe();
            this.#addEventListeners();
        });
    }
}
