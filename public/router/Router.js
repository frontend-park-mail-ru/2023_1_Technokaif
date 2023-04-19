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

    #previousParams;

    /** Construct a router */
    constructor() {
        super('Router');
        this.#routes = [];
        this.#pageNotFoundRoute = '/404';
        this.#routesWithRegularTestUrl = [];

        const previousParamsFromStore = sessionStorage.getItem('previousParams');
        if (previousParamsFromStore) {
            this.#previousParams = JSON.parse(previousParamsFromStore);
        } else {
            this.#previousParams = null;
        }
    }

    /**
     * Register path to render function
     * @param {string} path - url address
     * @param {*} render - function to call on url
     * @param stores
     */
    register(path, render, stores) {
        if (!this) {
            console.error('Error in register in router', path);
            return;
        }

        if (this.#routes.find((obj) => obj.path === path && obj.render === render
            && obj.stores === stores)) {
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
        if (!this) {
            console.error('Error in register in router', path);
            return;
        }

        if (this.#routes.find((obj) => obj.path === path && obj.render === render
            && obj.stores === stores)) {
            return;
        }

        this.#routesWithRegularTestUrl.push({
            path,
            render,
            store: stores,
        });
    }

    /**
     * First start Router
     */
    start() {
        if (sessionStorage.getItem('isStart') !== 'true') {
            sessionStorage.setItem('isStart', 'true');
        }
        const isStart = sessionStorage.getItem('isStart') === 'true';

        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('previousParams', JSON.stringify(this.#previousParams));
            sessionStorage.setItem('isRefresh', 'true');
        });

        window.addEventListener('popstate', (event) => {
            if (!event.state || !event.state.historyLen) {
                console.warn('Leaving page');
                return;
            }
            event.preventDefault();

            this.go(window.location.pathname, true);
        });

        const isRefresh = sessionStorage.getItem('isRefresh') === 'true';
        if (!isRefresh && isStart) {
            const valueFromFirstPage = this
                .#getParamsForHistoryAndObjectToRender(window.location.pathname);
            this.#previousParams = valueFromFirstPage.params;
        }

        this.go(window.location.pathname);
    }

    /**
     * Get parameters to push into state in history
     * @param path
     * @return {{objectRender: null, params: {}}}
     */
    #getParamsForHistoryAndObjectToRender(path) {
        const regObj = this.#isRegExp(path);
        let objectRender = null;
        let params = { };
        // what is here?
        if (regObj) {
            if (this.#checkForAuth(path)) {
                return;
            }
            params = this.#goToRegExpPath(path, regObj);
            if (params.id) {
                Actions.sendId(params.id, params.page);
                objectRender = regObj;
            }
        } else {
            objectRender = this.#routes.find((routeObj) => routeObj.path === path);
            if (objectRender) {
                params = this.#goToRegularPath(objectRender);
            }
        }

        return { objectRender, params };
    }

    /** Go to page with path */
    go(path, popstateEvent = false) {
        const isRefresh = sessionStorage.getItem('isRefresh') === 'true';
        const isStart = sessionStorage.getItem('isStart') === 'true';

        let { objectRender, params } = this.#getParamsForHistoryAndObjectToRender(path);

        let needPush = true;
        if (!objectRender) {
            objectRender = this.#routes.find((routeObj) => routeObj.path === this.#pageNotFoundRoute);
            path = this.#pageNotFoundRoute;
            needPush = false;
        }

        if (needPush && !popstateEvent && !isRefresh && !isStart) {
            this.#pushToHistory(
                window.location.pathname,
                window.history.length,
                this.#previousParams.stateStore,
                this.#previousParams.id,
                this.#previousParams.page,
            );
        }
        sessionStorage.setItem('isStart', 'false');
        sessionStorage.setItem('isRefresh', 'false');

        if (popstateEvent) {
            this.#sendStoresChanges(window.history.state.stateInHistory);
        }

        this.#previousParams = params;
        objectRender.render();
        // todo rewrite
        window.history.replaceState({
            historyLen: window.history.length,
            stateInHistory: this.#previousParams.stateStore,
            id: this.#previousParams.id,
            page: this.#previousParams.page,
        }, '', path);
    }

    /**
     * Return null if regular path like /profile, / etc<br>
     * Return object with path and render
     * @param path what path to check
     * @return {JSON|null}
     */
    #isRegExp(path) {
        const object = this.#routes.find((routeObj) => routeObj.path === path);
        if (object === undefined) {
            const objectReg = this.#routesWithRegularTestUrl.find((regExObj) => {
                const regex = new RegExp(regExObj.path);

                return (regex.test(path));
            });

            if (objectReg) {
                return objectReg;
            }
            console.warn('Error in isRegExp, path taken:', path);
        }
        return null;
    }

    /**
     * Return empty JSON if problem in URL exist else return params}
     * @param path
     * @param {JSON} regObj has store field.
     * @return {{}|{stateStore: *[], id: *, page: *}}
     */
    #goToRegExpPath(path, regObj) {
        // todo think about rename to params of regexppath
        const result = path.match(routingUrl.GENERAL_REG_EXP);
        if (result !== null) {
            const [, page, id] = result;
            const stateStore = [];
            for (const state in regObj.store) {
                stateStore.push(regObj.store[state].state);
            }
            return { id, page, stateStore };
        }
        return {};
    }

    /**
     * Return params for object with store field
     * @param object
     * @return {{stateStore: *[], id: null, page: null}}
     */
    #goToRegularPath(object) {
        const stateStore = [];
        for (const state in object.store) {
            stateStore.push(object.store[state].state);
        }
        return { stateStore, id: null, page: null };
    }

    /** Send actions with store states after forward/backward transfer */
    #sendStoresChanges(states) {
        for (const state in states) {
            Actions.sendStoreState(state);
        }
    }

    /**
     * If path was changed push it to history.
     * @param path what path is it
     * @param length what length of history is. For detect direction
     * @param state what state to save in history
     * @param id by default empty string
     * @param page what page by default empty string
     */
    #pushToHistory(path, length, state, id = '', page = '') {
        window.history.pushState(
            {
                historyLen: length,
                stateInHistory: state,
                id,
                page,
            },
            '',
            path,
        );
    }

    /**
     * Check for need to render object or not
     * @param path
     * @return {boolean} true if not need to render
     */
    #checkForAuth(path) {
        let foundInFutureLinks = false;
        for (const key in unAuthNavConfig) {
            if (unAuthNavConfig[key].href === path) foundInFutureLinks = true;
        }
        for (const key in authNavConfig) {
            if (authNavConfig[key].href === path) foundInFutureLinks = true;
        }
        for (const key in sidebarConfig) {
            if (sidebarConfig[key].href === path) foundInFutureLinks = true;
        }

        return foundInFutureLinks;
    }
}

export default new Router();
