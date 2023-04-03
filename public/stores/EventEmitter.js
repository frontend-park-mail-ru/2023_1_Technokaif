/**
 * Class to emit events and add/remove actions.
 */
export default class EventEmitter {
    #events;
    // todo create in #events key - nameOfComponent, value - array of callbacks

    /**
     * Construct an emitter.
     */
    constructor() {
        this.#events = {};
    }

    /**
     * Add new listener on.
     * @param event
     * @param callback
     */
    emitterAddListener(event, callback) {
        if (!this.#events[event]) {
            this.#events[event] = [];
        }

        this.#events[event].push(callback);
    }

    // todo method to subscribe by nameOfComponent

    /**
     * Remove some listener.
     * @param event
     * @param callback
     */
    emitterRemoveListener(event, callback) {
        if (this.#events[event]) {
            this.#events[event] = this.#events[event].filter((cb) => cb !== callback);
        }
    }

    /**
     * Remove all listeners.
     */
    emitterRemoveAllListeners() {
        this.#events = [];
    }

    // todo: make method for removing all subscribes of component by nameOfComponent

    /**
     * Emit an event.
     * @param event
     * @param args
     */
    jsEmit(event, ...args) {
        if (this.#events[event]) {
            this.#events[event].forEach((callback) => callback(...args));
        }
    }

    // todo: make another emit method using nameOfComponent
}
