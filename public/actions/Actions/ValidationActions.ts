import ActionTypes from '@actions/ActionTypes';
import Dispatcher from '@dispatcher/Dispatcher';

/** Validation actions */
class ValidationActions {
    /** Action to validate a named field in login or registration form and add it in state */
    validationField(nameOfField, content) {
        Dispatcher.dispatch({
            type: ActionTypes.VALIDATION_FIELD,
            nameOfField,
            content,
        });
    }

    /** Validate password and confirm password */
    validatePasswordAndConf(nameOfField, password, confPassword) {
        Dispatcher.dispatch({
            type: ActionTypes.VALIDATION_FIELD,
            nameOfField,
            content: {
                password,
                confPassword,
            },
        });
    }

    /** Action to validate all login or registration form fields */
    validateAll(nameOfValidation, content) {
        const nameOfField = nameOfValidation;
        Dispatcher.dispatch({
            type: ActionTypes.VALIDATION_CHECK_CORRECT_ALL,
            nameOfField,
            content,
        });
    }
}

export default new ValidationActions();
