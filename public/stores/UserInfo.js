import { Dispatcher } from '../dispatcher/Dispatcher';

/**
 * Stores User information and validate it.
 */
export class UserInfo {
    /**
     * All views that subscribe for store
     */
    #listeners;

    /**
     * JSON object that store User information
     */
    #state;

    /**
     * Init empty values and register in dispatcher.
     */
    constructor() {
        this.#state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            dateOfBirth: new Date(),
        };

        this.#listeners = [];

        Dispatcher.register(this.dispatch);
    }

    /**
     * Sorts input actions
     * @param {JSON} action
     */
    dispatch(action) {
        switch (action.name) {
        default:
        }
    }

    /**
     * Subscribe to store
     * @param {function} reaction - function to call
     * @param {string} actionName - name to trigger. Standart 'CHANGE'
     */
    subscribe(reaction, actionName = 'CHANGE') {
        this.#listeners.push((reaction, actionName));
    }
}
