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
        super(name);
        Dispatcher.register(this.dispatch.bind(this));
        this.#state = {};
        this.#nameOfStore = name;
    }

    /** Switches over the action's type when an action is dispatched.
     *
     */
    dispatch() {

    }

    /**
     * Adds a new item to the list and emits a CHANGED event.
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

    /**
     * Remove an element.
     * @param itemObj
     */
    removeItem(itemObj) {
        for (const key of Object.keys(itemObj)) {
            delete this.#state[key];
        }
    }

    /** Hooks a React component's callback to the CHANGED event.
     *
     * @param callback
     * @param actionName
     */
    subscribe(callback, actionName = 'CHANGE') {
        this.emitterAddListener(actionName, callback);
    }

    /**
     * Removes the listener from the CHANGED event.
     * @param callback
     * @param actionName
     */
    unsubscribe(callback, actionName = 'CHANGE') {
        this.emitterRemoveListener(actionName, callback);
    }

    /**
     * Removes all listener from all events.
     */
    unsubscribeAll() {
        this.emitterRemoveAllListeners();
    }

    /**
     * Function to set new state.
     * @param newState
     */
    set state(newState) {
        this.#state = newState;
    }

    /**
     * Returns the current store's state.
     * @returns {json}
     */
    get state() {
        return this.#state;
    }

    /**
     * Returns the store's name.
     * @returns {string}
     */
    get name() {
        return this.#nameOfStore;
    }

    /**
     * Change field in state to new value or create field
     * @param {string} nameOfField - name of field
     * @param {*} value - value of field
     */
    changeFieldInState(nameOfField, value) {
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
