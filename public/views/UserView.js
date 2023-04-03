import { BaseView } from './BaseView';
import { pageNames } from '../utils/config/pageNames';
import Actions from '../actions/Actions';
import UserInfoStore from '../stores/UserInfoStore';
import { ERRORS_REG } from '../utils/config/errors';
import { EventTypes } from '../utils/config/EventTypes';
import ApiActions from '../actions/ApiActions';
import Router from '../router/Router';
import unsubscribeFromAllStores from '../utils/functions/unsubscribeFromAllStores';
import { getCheckedValueRadioButtons } from '../utils/functions/utils';

const METHOD = 'focusout';
// todo temporary json
const ElementsClassForUser = {
    email: 'js__email',
    username: 'js__username',
    FirstLastName: 'js__name',

    day: 'js__day',
    month: 'js__month',
    year: 'js__year',

    gender: 'js__gender',
    gender_element: 'js__gender__element',

    password: 'js__password',
    newPassword: 'js__new__password',
    newConfPassword: 'js__new__confirm__password',

    email_error: 'js__error__email',
    username_error: 'js__error__username',

    day_error: 'js__error__day',
    month_error: 'js__error__month',
    year_error: 'js__error__year',

    gender_error: 'js__error__gender',

    password_error: 'js__error__password',
    newPasswordError: 'js__error__new__password',
    newConfPasswordError: 'js__error__new__confirm__password',

    cancelButton: 'js__cancel-button',
    saveButton: 'js__save-button',
};

/** Class for user page view. */
export class UserView extends BaseView {
    /** Constructor for feed page view. */
    constructor() {
        super(pageNames.USER);
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
                ERRORS_REG.email,
            );
            break;
        case 'password':
            this.#errorsRender(
                ElementsClassForUser.password_error,
                status,
                ERRORS_REG.password,
            );
            break;
        case 'newPassword':
            this.#errorsRender(
                ElementsClassForUser.newPasswordError,
                status,
                ERRORS_REG.password,
            );
            break;
        case 'newConfPassword':
            this.#errorsRender(
                ElementsClassForUser.newConfPasswordError,
                status,
                ERRORS_REG.password,
            );
            break;
        case 'day':
            this.#errorsRender(
                ElementsClassForUser.day_error,
                status,
                ERRORS_REG.day,
            );
            break;
        case 'month':
            this.#errorsRender(
                ElementsClassForUser.month_error,
                status,
                ERRORS_REG.month,
            );
            break;
        case 'year':
            this.#errorsRender(
                ElementsClassForUser.year_error,
                status,
                ERRORS_REG.year,
            );
            break;
        case 'gender':
            this.#errorsRender(
                ElementsClassForUser.gender_error,
                status,
                ERRORS_REG.sex,
            );
            break;
        default:
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

        // API.subscribe(
        //     (message) => {
        //         if (message === 'OK') {
        //             Router.go('/');
        //         } else {
        //             console.error('failed after login with succeeded reg data');
        //         }
        //     },
        //     EventTypes.LOGIN_STATUS,
        // );
        // API.subscribe(
        //     (message) => {
        //         this.#loginAfterSuccessRegistration(message);
        //     },
        //     EventTypes.REGISTER_STATUS,
        // );
    }

    /** Create listeners for fields. Send actions to dispatchers. */
    #createActionsForFields() {
        const email = document.querySelector(`.${ElementsClassForUser.email}`);
        email.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('email', email.value);
            Actions.validationField('confEmail', email.value);
        });

        const genders = document.querySelector(`.${ElementsClassForUser.gender}`);
        genders.addEventListener(METHOD, () => {
            const radioButtons = document.querySelectorAll(`.${ElementsClassForUser.gender_element}`);
            const elementsValues = getCheckedValueRadioButtons(radioButtons);

            Actions.validationField('sex', { gender: elementsValues });
        });

        const password = document.querySelector(`.${ElementsClassForUser.password}`);
        password.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('password', document.querySelector(`.${ElementsClassForUser.password}`).value);
        });

        const newPassword = document.querySelector(`.${ElementsClassForUser.newPassword}`);
        newPassword.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('newPassword', newPassword.value);
        });

        const newConfPassword = document.querySelector(`.${ElementsClassForUser.newConfPassword}`);
        newConfPassword.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('newConfPassword', {
                newPassword: newPassword.value,
                confPassword: newConfPassword.value,
            });
        });

        const day = document.querySelector(`.${ElementsClassForUser.day}`);
        day.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('day', document.querySelector(`.${ElementsClassForUser.day}`).value);
        });

        const month = document.querySelector(`.${ElementsClassForUser.month}`);
        month.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('month', document.querySelector(`.${ElementsClassForUser.month}`).value);
        });

        const year = document.querySelector(`.${ElementsClassForUser.year}`);
        year.addEventListener(METHOD, (event) => {
            event.preventDefault();
            Actions.validationField('year', document.querySelector(`.${ElementsClassForUser.year}`).value);
        });

        const cancelButton = document.querySelector(`.${ElementsClassForUser.cancelButton}`);
        cancelButton.addEventListener('click', (event) => {
            event.preventDefault();
            Router.go('/');
        });

        const saveButton = document.querySelector(`.${ElementsClassForUser.saveButton}`);
        saveButton.addEventListener('click', (event) => {
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

    /**
     * If status === 'OK' then send data to backend
     * @param status
     */
    sendAllData(status) {
        if (status === 'OK') {
            console.log('Send data');
            const { state } = UserInfoStore;
            ApiActions.register({
                username: state.username,
                email: state.email,
                firstName: state.firstName,
                lastName: state.lastName,
                sex: state.gender,
                birthDate: [state.year, state.month, state.day].join('-'),
                password: document.querySelector(`.${ElementsClassForUser.password}`).value,
            });
        }
    }

    /** Add data to fields from UserStoreInfo */
    #addDataToFields() {
        const values = UserInfoStore.state;
        // todo we dont do it now
        document.querySelector('.user-profile__img').src = './static/img/tracks/longWayHome.png';

        document.querySelector('.user-profile__username-text').innerText = values.username;
        document.querySelector('.user-profile__initials-text').innerText = values.firstName + values.lastName;
        document.querySelector(`.${ElementsClassForUser.email}`).value = values.email;
        document.querySelector(`.${ElementsClassForUser.day}`).value = values.day;
        document.querySelector(`.${ElementsClassForUser.year}`).value = values.year;
        document.querySelector(`.${ElementsClassForUser.month}`).value = values.month;
    }

    /** Render all view by components. */
    render() {
        unsubscribeFromAllStores();
        super.render();
        Actions.whatRender(super.name);
        this.#addDataToFields();

        this.#addEventListenerInsideElements();
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

export default new UserView();
