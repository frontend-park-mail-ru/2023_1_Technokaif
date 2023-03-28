/**
 * Class to emit events and add/remove actions.
 */
class EventEmitter {
    #events;

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
     * Emit an event.
     * @param event
     * @param args
     */
    jsEmit(event, ...args) {
        if (this.#events[event]) {
            this.#events[event].forEach((callback) => callback(...args));
        }
    }
}

export default EventEmitter;
