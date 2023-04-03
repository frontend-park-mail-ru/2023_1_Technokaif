/**
 * Class to emit events and add/remove actions.
 */
export default class EventEmitter {
    /**
     * Stores all events to various components in JSON.
     * @example JSON
     * {
     *     nameOfComponent: {
     *         events: [
     *             callbacks...
     *         ]...
     *     },
     *     nameOfComponent1: {
     *         events: [
     *             callbacks ...
     *         ]...
     *     },
     * }
     *
     */
    #events;

    /** Construct an emitter. Default value for events is {}. */
    constructor() {
        this.#events = {};
    }

    /**
     * Add listener with what listen and what event will trigger callback
     * @param nameOfSpace what field is listen. Maybe component
     * @param event what event will trigger callback
     * @param callback function that will be triggered
     */
    emitterAddListener(nameOfSpace, event, callback) {
        if (!this.#events[nameOfSpace]) {
            this.#events[nameOfSpace] = {};
        }
        if (!this.#events[nameOfSpace][event]) {
            this.#events[nameOfSpace][event] = [];
        }

        this.#events[nameOfSpace][event].push(callback);
    }

    A;

    /**
     * Remove all listeners for component or field
     * @param nameOfSpace what to remove
     */
    emitterRemoveAllListeners(nameOfSpace) {
        this.#events[nameOfSpace] = [];
    }

    /**
     * Emit an event.
     * @param event
     * @param args
     */
    jsEmit(event, ...args) {
        for (const nameOfComponent in this.#events) {
            console.log(nameOfComponent, args);
            console.log('------', this.#events);
            if (this.#events[nameOfComponent]) {
                const events = this.#events[nameOfComponent][event];
                if (events) {
                    console.log(events);
                    events.forEach((callback) => callback(...args));
                }
            }
        }
    }
}
