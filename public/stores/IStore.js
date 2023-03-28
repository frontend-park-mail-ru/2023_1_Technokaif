import Dispatcher from '../dispatcher/Dispatcher.js';
import EventEmitter from './EventEmitter';

/**
 * Interface for project stores.
 */
class IStore extends EventEmitter {
    /**
     * JSON object that store User information
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

    /** Returns the current store's state.
     *
     * @returns {*}
     */
    getState() {
        return {
            name: this.#nameOfStore,
            state: this.#state,
        };
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
    setState(newState) {
        this.#state = newState;
    }
}

export default IStore;
