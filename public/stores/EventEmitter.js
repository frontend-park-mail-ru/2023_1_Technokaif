/**
 * Class to emit events and add/remove actions.
 */
class EventEmitter {
    #events;

    constructor() {
        this.#events = {};
    }

    addListener(event, callback) {
        if (!this.#events[event]) {
            this.#events[event] = [];
        }

        this.#events[event].push(callback);
    }

    removeListener(event, callback) {
        if (this.#events[event]) {
            this.#events[event] = this.#events[event].filter((cb) => cb !== callback);
        }
    }

    emit(event, ...args) {
        if (this.#events[event]) {
            this.#events[event].forEach((callback) => callback(...args));
        }
    }
}

export default new EventEmitter();
