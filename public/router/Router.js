import IStore from '../stores/IStore';
import Actions from '../actions/Actions';
import { authNavConfig, sidebarConfig, unAuthNavConfig } from '../utils/config/config';
import { routingUrl } from '../utils/config/routingUrls';

/**
 * Class for routing urls in app.
 */
class Router extends IStore {
    /** List of routes. */
    #routes;

    /** */
    #pageNotFoundRoute;

    /** Routes like /artist/{id}/ */
    #routesWithRegularTestUrl;

    #currentLen;

    /** Construct a router */
    constructor() {
        super('Router');
        this.#routes = [];
        this.#pageNotFoundRoute = '/404';
        this.#routesWithRegularTestUrl = [];
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

    /**
     * Register path with regular expression
     * @param {string} path - url address in regEx
     * @param {*} render - function to call on url
     * @param stores
     */
    registerRouteWithRegEx(path, render, stores) {
        if (this.#routesWithRegularTestUrl.find((obj) => obj === { path, render, stores })) {
            console.error('Routes already exist');
            return;
        }

        this.#routesWithRegularTestUrl.push({
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

        if (sessionStorage.getItem('isStart') === null) {
            sessionStorage.setItem('isStart', true);
        }

        this.go(window.location.pathname);
    }

    /**
     * Render page in url
     * @param {string} path - url
     * @param {bool} isStart - if start right now
     */
    go(path) {
        let object = this.#routes.find((routeObj) => routeObj.path === path);
        let foundInFutureLinks = false;
        if (!object) {
            for (const key in unAuthNavConfig) {
                if (unAuthNavConfig[key].href === path) foundInFutureLinks = true;
            }
            for (const key in authNavConfig) {
                if (authNavConfig[key].href === path) foundInFutureLinks = true;
            }
            for (const key in sidebarConfig) {
                if (sidebarConfig[key].href === path) foundInFutureLinks = true;
            }

            if (foundInFutureLinks) {
                return;
            }

            let routeWithRegExpFound = false;
            this.#routesWithRegularTestUrl.forEach((regExObj) => {
                const regex = new RegExp(regExObj.path);
                if (regex.test(path)) {
                    const result = path.match(routingUrl.GENERAL_REG_EXP);
                    if (result !== null) {
                        const [, page, id] = result;
                        const stateStore = [];
                        for (const state in regExObj.store) {
                            stateStore.push(regExObj.store[state].state);
                        }

                        this.#currentLen = window.history.length;
                        if (window.location.pathname !== path) {
                            window.history.pushState({
                                historyLen: this.#currentLen, stateInHistory: stateStore, id, page,
                            }, '', path);
                        }

                        routeWithRegExpFound = true;
                        regExObj.render();
                        Actions.sendId(id, page);
                    }
                }
            });

            if (routeWithRegExpFound) {
                return;
            }

            object = this.#routes.find((routeObj) => routeObj.path === this.#pageNotFoundRoute);
        }

        const stateStore = [];
        for (const state in object.store) {
            stateStore.push(object.store[state].state);
        }

        const isStart = sessionStorage.getItem('isStart');

        this.#currentLen = window.history.length;
        if (window.location.pathname !== path || (sessionStorage.getItem('isStart') === 'true')) {
            window.history.pushState(
                {
                    historyLen: this.#currentLen,
                    stateInHistory: stateStore,
                },
                '',
                path,
            );
        }

        if (isStart) {
            sessionStorage.setItem('isStart', false);
        }

        object.render();

        // todo useless emit
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
        let object = this.#routes.find((routeObj) => routeObj.path === window.location.pathname);
        if (object === undefined) {
            object = this.#routesWithRegularTestUrl.find((regExObj) => {
                const regex = new RegExp(regExObj);
                return (regex.test(window.location.pathname));
            });

            object.render();
            Actions.sendId(window.history.state.id, window.history.state.page);
            this.#sendStoresChanges(window.history.state.stateInHistory);
            return;
        }

        this.#sendStoresChanges(window.history.state.stateInHistory);
        object.render();

        this.jsEmit('PAGE_CHANGED');
    }
}

export default new Router();
