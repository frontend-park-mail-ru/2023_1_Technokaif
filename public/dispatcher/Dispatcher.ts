/** Interface for any payload to send */
interface IPayload {
    type:string,
    // @ts-ignore
    [key: string]: any;
}

/**
 * Object to send all actions to stores
 */
class Dispatcher {
    /**
     * Bool. If Dispatcher send actions -- isDispatching = true, else false
     */
    #isDispatching;

    /**
     * Array. Actions in wait order
     */
    #waitOrder;

    /**
     * Array. All reactions that registered
     */
    #reactionsForAction;

    /**
     * Init parameters
     */
    constructor() {
        this.#isDispatching = false;
        this.#waitOrder = [];
        this.#reactionsForAction = [];
    }

    /**
     * Add reaction for action
     * @param {function} reaction
     * @returns string -- id of reaction
     */
    register(reaction: (payload:IPayload) => void) {
        this.#reactionsForAction.push(reaction);
        return this.#reactionsForAction.length - 1;
    }

    /**
     * Delete reaction for action with ID
     * @param {string} id -- what reaction delete
     */
    unregister(id:string) {
        delete this.#reactionsForAction[id];
    }

    /**
     * Send payload to stores
     * @param {JSON} payload -- action
     */
    dispatch(payload:IPayload) {
        if (this.#isDispatching) {
            this.#waitOrder.push(payload);
            return;
        }

        this.#isDispatching = true;

        for (const id of this.#reactionsForAction) {
            this.#sendToReaction(id, payload);
        }

        this.#dispatchOrder();
        this.#isDispatching = false;
    }

    /**
     * Dispatch all actions in waitOrder.
     */
    #dispatchOrder() {
        while (this.#waitOrder.length > 0) {
            const action = this.#waitOrder.shift();

            for (const id of this.#reactionsForAction) {
                this.#sendToReaction(id, action);
            }
        }
    }

    /**
     * Send action to reaction with given ID. If reaction doesnt exist it will does nothing.
     * @param {string} id -- what reaction to send
     * @param {JSON} action -- what to send
     */
    #sendToReaction(id:string, action:IPayload) {
        const reaction = this.#reactionsForAction[id];
        if (reaction) {
            reaction(action);
        }
    }
}

export default new Dispatcher();
