import { BaseView } from './BaseView';
import { ERRORS_REG } from '../utils/config/errors';
import { pageNames } from '../utils/config/pageNames';
import UserInfoStore from '../stores/UserInfoStore';

// todo temporary json
const ElementsClassForRegister = {
    login: 'js__login',
    email: 'js__email',
    confEmail: 'js__confEmail',
    password: 'js__password',
    username: 'js__username',
    firstName: 'js__firstName',
    lastName: 'js__lastName',
    day: 'js__day',
    month: 'js__month',
    year: 'js__year',
    gender: 'js__gender',

    login_error: 'js__error__login',
    email_error: 'js__error__email',
    confEmail_error: 'js__error__confEmail',
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
export class RegisterView extends BaseView {
    /**
     * Constructor for feed page view.
     */
    constructor() {
        super(pageNames.REGISTER);
    }

    /**
     * Function to create a callback on event.
     */
    callEventListener() {
        // todo create actions for change of input fields

        UserInfoStore.subscribe(this.dispatchErrors, 'VALIDATION_ERR');
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
        case 'emailConf':
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
            console.error('Not nameOfField on render page', nameOfField);
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

    /** Render all view by components. */
    render() {
        super.render();
        this.callEventListener();
    }
}
