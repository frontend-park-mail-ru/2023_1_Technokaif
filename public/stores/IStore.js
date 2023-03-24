import Dispatcher from '../dispatcher/Dispatcher.js';
import ActionTypes from '../actions/ActionTypes';
import EventEmitter from './EventEmitter';

/**
 * Interface for project stores.
 */
class IStore extends EventEmitter {
    /**
     * JSON object that store User information
     */
    #state;

    /**
     * Construct a Store.
     */
    constructor() {
        super();
        Dispatcher.register(this.registerToActions.bind(this));
        this.#state = [];
    }

    /** Switches over the action's type when an action is dispatched.
     *
     * @param action
     */
    registerToActions(action) {
        switch (action.type) {
        case ActionTypes.ADD_NEW_ITEM:
            this.addNewItem(action.payload);
            break;
        default:
        }
    }

    /** Adds a new item to the list and emits a CHANGED event.
     *
     * @param item
     */
    addNewItem(item) {
        item.id = this.#state.length;
        this.#state.push(item);
        this.emit(CHANGE);
    }

    /** Returns the current store's state.
     *
     * @returns {*}
     */
    getAllItems() {
        return this.#state;
    }

    /** Hooks a React component's callback to the CHANGED event.
     *
     * @param callback
     * @param actionName
     */
    addChangeListener(callback, actionName = 'CHANGE') {
        this.on(actionName, callback);
    }

    /** Removes the listener from the CHANGED event.
     *
     * @param callback
     * @param actionName
     */
    removeChangeListener(callback, actionName = 'CHANGE') {
        this.removeListener(actionName, callback);
    }
}

export default IStore;
