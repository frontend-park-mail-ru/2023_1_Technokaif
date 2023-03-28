import IStore from '../stores/IStore';

/**
 * Class for routing urls in app.
 */
class Router extends IStore {
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
        super('Router');
        this.#routes = [];
        this.#history = window.history;
    }

    /**
     * Register path to render function
     * @param {string} path - url adress
     * @param {*} render - function to call on url
     * @param {IStore   } store - store to get state from and save it on popstate
     */
    register(path, render, store) {
        if (this.#routes.find((obj) => obj === { path, render, store })) {
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
     * Add event listener for popstate. Get URL from window and render this page.
     */
    start() {
        window.addEventListener('popstate', (event) => {
            event.preventDefault();

            if (event.state) {
                this.back();
            } else {
                this.forward();
            }
        });

        if (window.location.pathname === '') {
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
        if (!object) {
            this.go('/');
            return;
        }

        const stateStore = object.store.state;

        if (window.location.pathname !== path) {
            this.#history.pushState(stateStore, '', this.#currentUrl);
        }

        this.#currentUrl = path;
        // window.location.pathname = this.#currentUrl;
        object.render();

        this.jsEmit('PAGE_CHANGED');
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
        this.go(window.location.pathname);
    }

    /**
     * Render page in current state of history. Refresh store.
     */
    #render() {
        const { state } = this.#history;
        const object = this.#routes.find((routeObj) => routeObj.path === state.url);
        this.#currentUrl = state.url;

        object.render();

        this.jsEmit('PAGE_CHANGED');
    }
}

export default new Router();
