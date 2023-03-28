/* eslint-disable max-classes-per-file */
/**
 * All actions
 */
export class Action {
    /**
     * Create action
     * @param {JSON} state - state of store
     * @returns {JSON} - action for dispatcher
     */
    create(state) {
        // TODO use dispatch method of dispatcher
        return {
            type: 'StoreChange',
            state,
        };
    }
}

/**
 * Class for routing urls in app.
 */
class Router {
    /**
     * History object.
     */
    #history;

    /**
     * List of routes.
     */
    #routes;

    /**
     * Where we are here
     */
    #currentUrl;

    /**
     * Construct a router
     */
    constructor() {
        this.routes = [];
        this.history = window.history;
    }

    /**
     * Register path to render function
     * @param {string} path -- url adress
     * @param {*} render -- function to call on url
     */
    register(path, render, store) {
        if (this.#routes.find({ path, render, store })) {
            console.error('Routes already exist');
            return;
        }

        this.#routes.push({
            path,
            render,
            store,
        });
    }

    /**
     *
     */
    start() {
        window.addEventListener('popstate', (event) => {
            if (event.state) {
                this.back();
            } else {
                this.forward();
            }
        });

        if (window.location.href === '') {
            console.error('No routes');
        } else {
            this.routeChange();
        }
    }

    /**
     * Render page in url
     * @param {string} path - url
     */
    go(path) {
        const object = this.#routes.find((routeObj) => routeObj.path === path);
        const stateStore = object.store.getState();

        this.#history.pushState(stateStore, '', this.#currentUrl);

        this.#currentUrl = path;
        window.location.href = this.#currentUrl;
        object.render();
    }

    /**
     * Render page that was before in history
     */
    back() {
        this.#history.back();
        this.#render();
    }

    /**
     * Render page that was after in history
     */
    forward() {
        this.#history.forward();
        this.#render();
    }

    /**
     * If page route was changed.
     */
    routeChange() {
        this.go(window.location.href);
    }

    /**
     * Render page in current state of history. Refresh store.
     */
    #render() {
        const { state } = this.#history;
        const object = this.#routes.find((routeObj) => routeObj.path === state.url);
        this.#currentUrl = state.url;

        window.location.href = this.#currentUrl;
        Action.create(state.state);
        object.render();
    }
}

export default new Router();
