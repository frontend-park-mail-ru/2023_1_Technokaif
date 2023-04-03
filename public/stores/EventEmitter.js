/**
 * Class to emit events and add/remove actions.
 */
export default class EventEmitter {
    /**
     * Stores all events to various components in JSON.
     *  @example JSON
     *  {
     *      nameOfComponent: {
     *          events: [
     *              callbacks...
     *          ]...
     *      },
     *      nameOfComponent1: {
     *         events: [
     *             callbacks ...
     *         ]...
     *     },
     * }
     *
     */
    #events;

    /**
     * Stores general events using in subscription without providing nameOfComponent.
     *
     */
    #generalEvents;

    /**
     * Construct an emitter.
     */
    constructor() {
        this.#events = {};
    }

    /**
     * Add a new listener on event on component.
     * @param event
     * @param callback
     * @param nameOfComponent
     */
    emitterAddListener(event, callback, nameOfComponent) {
        if (!this.#events[nameOfComponent]) {
            this.#events[nameOfComponent] = {};
        }
        if (!this.#events.nameOfComponent[event]) {
            this.#events.nameOfComponent[event] = [];
        }

        this.#events.nameOfComponent[event].push(callback);
    }

    /**
     * Add a new listener on event on EVERY component.
     * @param event
     * @param callback
     */
    emitterAddListenerToAllComponents(event, callback) {
        for (const nameOfComponent in this.#events) {
            if (!this.#events[nameOfComponent]) {
                this.#events[nameOfComponent] = {};
            }

            if (!this.#events.nameOfComponent[event]) {
                this.#events.nameOfComponent[event] = [];
            }

            this.#events.nameOfComponent[event].push(callback);
        }
    }

    /**
     * Remove all listeners.
     */
    emitterRemoveAllListeners() {
        this.#events = [];
    }

    /**
     * Remove all listeners on component.
     */
    emitterRemoveAllListenersOnComponent(nameOfComponent) {
        this.#events[nameOfComponent] = [];
    }

    /**
     * Emit an event.
     * @param event
     * @param args
     */
    jsEmit(event, ...args) {
        for (const nameOfComponent in this.#events) {
            if (this.#events[nameOfComponent]) {
                const events = this.#events[nameOfComponent][event];
                if (events) {
                    events.forEach((callback) => callback(...args));
                }
            }
        }
    }

    /**
     * Emit an event and pop all listeners actions (components and general callbacks).
     * @param event
     * @param args
     */
    jsEmitAndPopListeners(event, ...args) {
        this.jsEmit(event, args);
        for (const nameOfComponent in this.#events) {
            if (this.#events[nameOfComponent]) {
                this.#events[nameOfComponent][event] = [];
            }
        }

        this.#generalEvents.filter((ev) => ev !== event);
    }
}
