import Dispatcher from '../dispatcher/Dispatcher.js';
import EventEmitter from './EventEmitter';
import { METHOD } from '../utils/config/config';

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

    /** function to save store before download */
    #saveFunc;

    /**
     * Construct a Store.
     */
    constructor(name, saveState = null) {
        super(name);

        this.#saveFunc = saveState;

        Dispatcher.register(this.dispatch.bind(this));
        this.#nameOfStore = name;
        this.#subscribe();

        this.loadFromSessionStore();
    }

    /**
     * load data from session store
     * @return {null|JSON} - null if cant get value from store or JSON with value
     */
    loadFromSessionStore() {
        const valueFromStore = sessionStorage.getItem(this.#nameOfStore);
        if (valueFromStore) {
            this.#state = JSON.parse(valueFromStore);
        } else {
            this.#state = {};
        }
    }

    /** Subscribe for save to session state */
    #subscribe() {
        window.addEventListener(METHOD.UNLOAD_PAGE, () => {
            if (this.#saveFunc !== null) {
                this.#saveFunc();
            }
            this.saveToSessionStore();
        });
    }

    /** Save data from session store */
    saveToSessionStore() {
        sessionStorage.setItem(this.#nameOfStore, JSON.stringify(this.state));
    }

    /** Switches over the action's type when an action is dispatched.
     *
     */
    dispatch(action) {

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

    /**
     * Hooks a component's callback to the event and save to events.
     * @param callback
     * @param eventName
     * @param componentName
     */
    subscribe(callback, eventName, componentName = null) {
        if (!componentName) {
            this.emitterAddListenerToAllComponents(eventName, callback);
        } else {
            this.emitterAddListener(eventName, callback, componentName);
        }
    }

    /**
     * Removes all events on component.
     * @param componentName
     */
    unsubscribeAllOnComponent(componentName) {
        this.emitterRemoveAllListenersOnComponent(componentName);
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
