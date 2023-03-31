import IStore from '../stores/IStore';
import Actions from '../actions/Actions';

/**
 * Class for routing urls in app.
 */
class Router extends IStore {
    /** List of routes. */
    #routes;

    #currentLen;

    /** Construct a router */
    constructor() {
        super('Router');
        this.#routes = [];
    }

    /**
     * Register path to render function
     * @param {string} path - url address
     * @param {*} render - function to call on url
     * @param stores
     */
    register(path, render, stores) {
        if (this.#routes.find((obj) => obj === { path, render, stores })) {
            console.error('Routes already exist');
            return;
        }

        this.#routes.push({
            path,
            render,
            store: stores,
        });
    }

    /** Add event listener for popstate. Get URL from window and render this page. */
    start() {
        window.addEventListener('popstate', (event) => {
            event.preventDefault();

            // todo = can be bad decision
            if (event.state.historyLen <= this.#currentLen) {
                this.back();
            } else {
                this.forward();
            }
            this.#currentLen = event.state.history;
        });

        this.go(window.location.pathname);
    }

    /**
     * Render page in url
     * @param {string} path - url
     */
    go(path) {
        const object = this.#routes.find((routeObj) => routeObj.path === path);
        if (!object) {
            this.go('/');
            return;
        }

        const stateStore = [];
        for (const state in object.store) {
            stateStore.push(object.store[state].state);
        }

        // todo was changed for work on popstate
        this.#currentLen = window.history.length;
        window.history.pushState({ historyLen: this.#currentLen, stateInHistory: stateStore }, '', path);

        if (window.location.pathname !== path) {
            window.history.pushState(stateStoreObj, '', path);
        }

        object.render();
        this.jsEmit('PAGE_CHANGED');
    }

    /** Render page that was before in history */
    back() {
        this.#render();
    }

    /** Render page that was after in history  */
    forward() {
        this.#render();
    }

    /** Send actions with store states after forward/backward transfer */
    #sendStoresChanges(states) {
        for (const state in states) {
            Actions.sendStoreState(state);
        }
    }

    /** Render page in current state of history. Refresh store. */
    #render() {
        const object = this.#routes.find((routeObj) => routeObj.path === window.location.pathname);
        this.#sendStoresChanges(window.history.state.stateInHistory);
        object.render();
        this.jsEmit('PAGE_CHANGED');
    }
}

export default new Router();
