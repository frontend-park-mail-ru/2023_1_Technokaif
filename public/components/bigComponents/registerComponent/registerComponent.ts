import { componentsNames } from '@config/componentsNames';
import { dateSetup, regFormSetup } from '@setup/registrationSetup';
import {
    ElementsClassForRegister, METHOD, RESPONSES,
} from '@config/config';
import { EventTypes } from '@config/EventTypes';
import { ERRORS_REG } from '@config/errors';
import { NAME_OF_VALIDATION } from '@config/validateConf';
import UserActions from '@API/UserActions';
import ValidationActions from '@Actions/ValidationActions';
import Router from '@router/Router';
import { BaseComponent } from '@components/BaseComponent';
import { Form } from '@bigComponents/form/form';
import UserInfoStore from '@store/UserInfoStore';
import API from '@store/API';
import template from './registerComponent.handlebars';
import './registerComponent.less';
import { runAfterFramePaint } from '@functions/renderAfterPaintDone';
import {
    getValueFromInputOrDataElements,
    setElementsToInputOrDate,
    subscribeForUnload,
} from '@functions/subscribeForUnload';
import {
    getValueFromStorage,
    saveValueToStorage,
} from '@functions/FunctionsToWorkWithLocalStore';

/** Function to work with listener triggered */
interface reactionOnTrigger {
    (nameOfReaction: string, element: HTMLElement): void;
}

/** name of register component in store */
const StorageNameOfRegister = 'regFormData';

/** Component that render register form */
export class RegisterComponent extends BaseComponent {
    /** Place where render component */
    #place;

    /** unsubscribe function */
    private unsubscribeFunc;

    /** Set place where render register form */
    constructor(place) {
        super(
            place,
            [],
            template,
            componentsNames.REGISTER_FORM,
        );
        this.#place = place;
    }

    /** Render form with standard setups  */
    #renderContent() {
        const form = new Form(
            this.#place,
            regFormSetup(),
            dateSetup(),
        );
        form.render();
    }

    /**
     * Method to handle api response to login after success registration
     * @param message
     */
    #loginAfterSuccessRegistration(message) {
        if (message === RESPONSES.OK) {
            const email = document.querySelector(`.${ElementsClassForRegister.email}`);
            const password = document.querySelector(`.${ElementsClassForRegister.password}`);

            if (!email || !password) {
                console.warn('Error at login after register. Can\'t find email or password field');
                return;
            }

            UserActions.login(
                (email as HTMLInputElement).value,
                (password as HTMLInputElement).value,
            );
        } else {
            const element = document.querySelector('.title__error-text');
            if (!element) {
                console.warn('Error at getting field for error from server at register');
                return;
            }
            (element as HTMLElement).hidden = false;
            (element as HTMLElement).innerText = message;
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
        if (!placeForError) {
            console.warn('Error for place of element. Search by class: ', whatSearch);
            return;
        }

        if (status === RESPONSES.OK) {
            placeForError.innerHTML = '';
        } else {
            placeForError.innerHTML = `<p class="error">${error}</p>`;
        }
    }

    /**
     * Dispatch errors. Render error if found.
     * @param nameOfField
     * @param status
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
        case 'password':
            this.#errorsRender(
                ElementsClassForRegister.password_error,
                status,
                status,
            );
            break;
        case NAME_OF_VALIDATION.confPassword:
            this.#errorsRender(
                ElementsClassForRegister.confPassword_error,
                status,
                ERRORS_REG.confirmPassword,
            );
            break;
        case 'username':
            this.#errorsRender(
                ElementsClassForRegister.username_error,
                status,
                status,
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
        case 'date':
            this.#errorsRender(
                ElementsClassForRegister.date_error,
                status,
                status,
            );
            break;
        default:
        }
    }

    /**
     * Add event listener on field. Prevent default in event listener.
     * @param name name of field
     * @param classOfElement class of field to search for. Must be one string
     * @param whatEvent what event will trigger event listener
     * @param functionWhenTrigger function to work in eventListener
     * @private
     */
    #addEventOnField(
        name: string,
        classOfElement: string,
        whatEvent: string,
        functionWhenTrigger: reactionOnTrigger,
    ) {
        const element = document.querySelector(`.${classOfElement}`);
        if (!element) {
            console.warn('Element doesn\'t exist on page, search by class: ', classOfElement);
            return;
        }

        element.addEventListener(whatEvent, (event) => {
            event.preventDefault();
            functionWhenTrigger(name, element as HTMLElement);
        });
    }

    /** Add reactions to user actions */
    #addEventListeners() {
        const reactionOnInputElement = (nameOfReaction, element) => {
            ValidationActions.validationField(nameOfReaction, (element as HTMLInputElement).value);
        };

        const passwordsChecks = (nameOfReaction, element) => {
            const password = document.querySelector(`.${ElementsClassForRegister.password}`);
            if (!password) {
                console.warn('Password doesn\'t found in confReaction');
                return;
            }
            reactionOnInputElement(NAME_OF_VALIDATION.password, password);
            ValidationActions.validatePasswordAndConf(
                nameOfReaction,
                (password as HTMLInputElement).value,
                (element as HTMLInputElement).value,
            );
        };

        this.#addEventOnField(
            NAME_OF_VALIDATION.email,
            ElementsClassForRegister.email,
            METHOD.CHANGE_FIELD_IMMEDIATELY,
            reactionOnInputElement,
        );

        this.#addEventOnField(
            NAME_OF_VALIDATION.password,
            ElementsClassForRegister.password,
            METHOD.CHANGE_FIELD_IMMEDIATELY,
            // todo remove
            // @ts-ignore
            (nameOfReaction, element) => {
                const confPassword = document.querySelector(`.${ElementsClassForRegister.confPassword}`);
                if (!confPassword) {
                    console.warn('Element doesn\'t exist on page, search by class: ', ElementsClassForRegister.confPassword);
                    return;
                }

                passwordsChecks(NAME_OF_VALIDATION.confPassword, confPassword);
            },

        );

        this.#addEventOnField(
            NAME_OF_VALIDATION.confPassword,
            ElementsClassForRegister.confPassword,
            METHOD.CHANGE_FIELD_IMMEDIATELY,
            passwordsChecks,
        );

        this.#addEventOnField(
            NAME_OF_VALIDATION.username,
            ElementsClassForRegister.username,
            METHOD.CHANGE_FIELD_IMMEDIATELY,
            reactionOnInputElement,
        );

        this.#addEventOnField(
            NAME_OF_VALIDATION.firstname,
            ElementsClassForRegister.firstName,
            METHOD.CHANGE_FIELD_IMMEDIATELY,
            reactionOnInputElement,
        );

        this.#addEventOnField(
            NAME_OF_VALIDATION.lastname,
            ElementsClassForRegister.lastName,
            METHOD.CHANGE_FIELD_IMMEDIATELY,
            reactionOnInputElement,
        );

        this.#addEventOnField(
            NAME_OF_VALIDATION.day,
            ElementsClassForRegister.day,
            METHOD.CHANGE_FIELD_IMMEDIATELY,
            reactionOnInputElement,
        );

        this.#addEventOnField(
            NAME_OF_VALIDATION.month,
            ElementsClassForRegister.month,
            METHOD.CHANGE_FIELD_IMMEDIATELY,
            reactionOnInputElement,
        );

        this.#addEventOnField(
            NAME_OF_VALIDATION.year,
            ElementsClassForRegister.year,
            METHOD.CHANGE_FIELD_IMMEDIATELY,
            reactionOnInputElement,
        );

        this.#addEventOnField(
            NAME_OF_VALIDATION.validate_register,
            'content',
            METHOD.FORM,
            // todo Check and do rewrite
            (nameOfReaction, _) => {
                ValidationActions.validationField(NAME_OF_VALIDATION.sex, { gender: 'F' });
                const password = document.querySelector(`.${ElementsClassForRegister.password}`);
                const confPassword = document.querySelector(`.${ElementsClassForRegister.confPassword}`);
                if (password && confPassword) {
                    const passwordVal = (password as HTMLInputElement).value;
                    const confPasswordVal = (confPassword as HTMLInputElement).value;
                    ValidationActions.validateAll(
                        nameOfReaction,
                        {
                            password: passwordVal,
                            confPassword: confPasswordVal,
                        },
                    );
                }
            },
        );

        this.#addEventOnField(
            'header',
            'title',
            METHOD.BUTTON,
            // @ts-ignore
            (nameOfReaction, element) => {
                Router.goToFeed();
            },
        );

        this.#addEventOnField(
            'bottomButton',
            'bottom__button',
            METHOD.BUTTON,
            // @ts-ignore
            (nameOfReaction, element) => {
                Router.goToLogin();
            },
        );
    }

    /** Subscribe for Events from stores */
    #subscribe() {
        const nameOfComponent = this.name;
        if (!nameOfComponent) {
            console.warn('Register name doesn\'t exist');
            return;
        }

        UserInfoStore.subscribe(
            (name, status) => {
                this.dispatchErrors(name, status);
            },
            EventTypes.VALIDATION_RESPONSE,
            nameOfComponent,
        );
        UserInfoStore.subscribe(

            (status) => { this.sendAllData(status); },
            EventTypes.SEND_DATA,
            nameOfComponent,
        );
        API.subscribe(
            (message) => {
                if (message === RESPONSES.OK) {
                    Router.goToFeed();
                } else {
                    console.error('failed after login with succeeded reg data');
                }
            },
            EventTypes.LOGIN_STATUS,
            nameOfComponent,
        );
        API.subscribe(
            (message) => {
                this.#loginAfterSuccessRegistration(message);
            },
            EventTypes.REGISTER_STATUS,
            nameOfComponent,
        );
    }

    /**
     * If status === 'OK' then send data to backend
     * @param status
     */
    sendAllData(status) {
        if (status === RESPONSES.OK) {
            const { state } = UserInfoStore;
            // todo translate logic to store
            const date = new Date(`${state.month} 1, 2000`);
            const monthNumber = date.getMonth() + 1;
            let stringToReturn = monthNumber.toString();
            if (monthNumber < 10) {
                stringToReturn = `0${monthNumber}`;
            }

            const passwordField = document.querySelector(`.${ElementsClassForRegister.password}`);
            if (!passwordField) {
                console.warn('Element doesnt exist passwordField on Page');
                return;
            }

            UserActions.register({
                username: state.username,
                email: state.email,
                firstName: state.firstName,
                lastName: state.lastName,
                sex: 'F',
                birthDate: [state.year, stringToReturn, state.day].join('-'),
                password: (passwordField as HTMLInputElement).value,
            });
        }
    }

    /** Get value of all elements in array */
    private getValueOfElements() {
        return getValueFromInputOrDataElements(
            ElementsClassForRegister.email,
            ElementsClassForRegister.username,
            ElementsClassForRegister.firstName,
            ElementsClassForRegister.lastName,
            ElementsClassForRegister.day,
            ElementsClassForRegister.month,
            ElementsClassForRegister.year,
        );
    }

    /** load value from store to elements */
    private loadValueToElements() {
        const value = getValueFromStorage('session', StorageNameOfRegister);
        if (!value) return;

        setElementsToInputOrDate(value);
    }

    /** Render component in parent */
    public override render() {
        this.appendElement();
        this.#renderContent();

        runAfterFramePaint(() => {
            this.unsubscribeFunc = subscribeForUnload(
                () => {
                    saveValueToStorage('session', StorageNameOfRegister, this.getValueOfElements());
                },
                () => {
                    saveValueToStorage('session', StorageNameOfRegister, null);
                },
            );
            this.#subscribe();
            this.#addEventListeners();
            this.loadValueToElements();
        });
        document.title = 'Register';
    }

    public override unRender() {
        super.unRender();
        this.unsubscribeFunc?.();
    }
}
