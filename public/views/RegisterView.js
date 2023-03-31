import { BaseView } from './BaseView';
import { ERRORS_REG } from '../utils/config/errors';
import { pageNames } from '../utils/config/pageNames';
import UserInfoStore from '../stores/UserInfoStore';
import Actions from '../actions/Actions';
import { EventTypes } from '../stores/EventTypes';
import ComponentsStore from '../stores/ComponentsStore';
import Router from '../router/Router';

// todo Validate all create func to check

const METHOD = 'focusout';
// todo temporary json
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

/**
 * Class for feed page view.
 */
class RegisterView extends BaseView {
    #inputsOnView;

    /**
     * Constructor for feed page view.
     */
    constructor() {
        super(pageNames.REGISTER);
        this.#inputsOnView = {
            email: ElementsClassForRegister.email,
            confEmail: ElementsClassForRegister.confEmail,
            password: ElementsClassForRegister.password,
            username: ElementsClassForRegister.username,
            firstName: ElementsClassForRegister.firstName,
            lastName: ElementsClassForRegister.lastName,
            day: ElementsClassForRegister.day,
            month: ElementsClassForRegister.month,
            year: ElementsClassForRegister.year,
            gender: ElementsClassForRegister.gender,
        };
    }

    // todo create jsdoc
    /** */
    callEventListener() {

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
    }

    /** Create listeners for fields. Send actions to dispatchers. */
    #createActionsForFields() {
        const email = document.querySelector(`.${this.#inputsOnView.email}`);

        email.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('email', document.querySelector(`.${this.#inputsOnView.email}`).value);
        });

        const confEmail = document.querySelector(`.${this.#inputsOnView.confEmail}`);
        confEmail.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('confEmail', document.querySelector(`.${this.#inputsOnView.confEmail}`).value);
        });

        const password = document.querySelector(`.${this.#inputsOnView.password}`);
        password.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('password', document.querySelector(`.${this.#inputsOnView.password}`).value);
        });

        const username = document.querySelector(`.${this.#inputsOnView.username}`);
        username.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('username', document.querySelector(`.${this.#inputsOnView.username}`).value);
        });

        const firstName = document.querySelector(`.${this.#inputsOnView.firstName}`);
        firstName.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('firstName', document.querySelector(`.${this.#inputsOnView.firstName}`).value);
        });

        const lastName = document.querySelector(`.${this.#inputsOnView.lastName}`);
        lastName.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('lastName', document.querySelector(`.${this.#inputsOnView.lastName}`).value);
        });

        const day = document.querySelector(`.${this.#inputsOnView.day}`);
        day.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('day', document.querySelector(`.${this.#inputsOnView.day}`).value);
        });

        const month = document.querySelector(`.${this.#inputsOnView.month}`);
        month.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('month', document.querySelector(`.${this.#inputsOnView.month}`).value);
        });

        const year = document.querySelector(`.${this.#inputsOnView.year}`);
        year.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('year', document.querySelector(`.${this.#inputsOnView.year}`).value);
        });

        const genders = document.querySelector(`.${this.#inputsOnView.gender}`);
        genders.addEventListener(METHOD, () => {
            const radioButtons = document.querySelectorAll(`.${this.#inputsOnView.gender_element}`);
            const elementsValues = getCheckedValueRadioButtons(radioButtons);

            Actions.validationField('sex', { gender: elementsValues });
        });

        const button = document.querySelector('.form__button');
        button.addEventListener('click', (event) => {
            event.preventDefault();
            Actions.validateAll('validate_register', password.value);
        });

        const bottomButton = document.querySelector('.bottom__button');
        bottomButton.addEventListener('click', (event) => {
            event.preventDefault();
            Router.go('/login');
        });
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
            console.error('Not nameOfField on register page', nameOfField);
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

    /**
     * If status === 'OK' then send data to backend
     * @param status
     */
    sendAllData(status) {
        // eslint-disable-next-line no-unused-vars
        status = 1;
        // todo call api here
    }

    /** Render all view by components. */
    render() {
        const renderSup = async () => {
            await super.render();
        };
        renderSup().then(() => {
            Actions.whatRender(super.name);
            ComponentsStore.unsubscribeAll();
            UserInfoStore.unsubscribeAll();

            this.callEventListener();
            this.#addEventListenerInsideElements();
        });
    }
}

export default new RegisterView();
