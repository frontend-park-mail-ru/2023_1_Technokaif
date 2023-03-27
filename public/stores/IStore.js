import Dispatcher from '../dispatcher/Dispatcher.js';
import EventEmitter from './EventEmitter';

/**
 * Interface for project stores.
 */
class IStore extends EventEmitter {
    /**
     * JSON object that store User information
     * nameOfField
     */
    #state;

    #nameOfStore;

    /**
     * Construct a Store.
     */
    constructor(name) {
        super();
        Dispatcher.register(this.dispatch.bind(this));
        this.#state = {};
        this.#nameOfStore = name;
    }

    /** Switches over the action's type when an action is dispatched.
     *
     */
    dispatch() {

    }

    /** Adds a new item to the list and emits a CHANGED event.
     *
     * @param itemObj
     * @param eventName
     */
    addNewItem(itemObj, eventName = null) {
        for (const [key, value] of Object.entries(itemObj)) {
            this.#state[key] = value;
        }

        if (eventName !== null) {
            this.jsEmit(eventName);
        }
    }

    /** Hooks a React component's callback to the CHANGED event.
     *
     * @param callback
     * @param actionName
     */
    addChangeListener(callback, actionName = 'CHANGE') {
        this.emitterAddListener(actionName, callback);
    }

    /** Removes the listener from the CHANGED event.
     *
     * @param callback
     * @param actionName
     */
    removeChangeListener(callback, actionName = 'CHANGE') {
        this.emitterRemoveListener(actionName, callback);
    }

    /**
     * Function to set new state.
     * @param newState
     */
    set state(newState) {
        this.#state = newState;
    }

    /** Returns the current store's state.
     *
     * @returns {*}
     */
    get state() {
        return {
            name: this.#nameOfStore,
            state: this.#state,
        };
    }

    /**
     * Change field in state to new value or create field
     * @param {string} nameOfField - name of field
     * @param {*} value - value of field
     */
    chagneFieldInState(nameOfField, value) {
        this.#state[nameOfField] = value;
    }

    /**
     * Return value of field
     * @param {string} nameOfField - name of field in state
     * @returns {*} - value of this field
     */
    getValueInState(nameOfField) {
        return this.#state[nameOfField];
    }
}

export default IStore;
