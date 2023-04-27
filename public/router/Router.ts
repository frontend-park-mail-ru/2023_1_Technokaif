import IStore from '../stores/IStore';
import Actions from '../actions/Actions';
import { routingUrl } from '../utils/config/routingUrls';
import { PermissionUser, RegularPathToTake, PathConfig } from './routerDeclarations';
import { ACTION_ON_PATH, DIRECTIONS } from '../utils/config/config';
/**
 * Class for routing urls in app.
 */
class Router extends IStore {
    /** List of all routes that can be taken */
    #routes;

    /** Where to go if page doesn't exist */
    #pageNotFoundRoute;

    /** Routes like /artist/{id}/ */
    #routesWithRegularTestUrl;

    /** Parameters of previous page */
    #previousParams;

    /** Previous length of page */
    #length;

    /** Permissions for Users */
    #permissions: PermissionUser[];

    /** Construct a router */
    constructor() {
        super('Router');
        this.#routes = [];
        this.#pageNotFoundRoute = '/404';
        this.#routesWithRegularTestUrl = [];
        this.#permissions = [];

        const previousParamsFromStore = sessionStorage.getItem('previousParams');
        if (previousParamsFromStore) {
            this.#previousParams = JSON.parse(previousParamsFromStore);
        } else {
            this.#previousParams = null;
        }
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
     * Push to whereRegister whatRegister if what register doesn't exist in whereRegister already.
     * @param {JSON} whatRegister
     * @param {[]} whereRegister
     * @private
     */
    #pathRegister(whatRegister: PathConfig, whereRegister: PathConfig[]) {
        if (whereRegister.find((obj) => obj.path === whatRegister.path
            && obj.render === whatRegister.render
            && obj.store === whatRegister.store)) {
            console.warn('Path already registered: ', whatRegister.path);
            return;
        }

        whereRegister.push(whatRegister);
    }

    /**
     * Register path to render function.
     * @param {string} path - url address
     * @param {*} render - function to call on url
     * @param {[IStore]} stores Stores to save in this path
     */
    register(path, render, stores) {
        const config: PathConfig = {
            path,
            render,
            store: stores,
        };
        this.#pathRegister(config, this.#routes);
    }

    /**
     * Register permission for user
     * @param isUser check if user
     * @param getPermittedPath get path where to go
     * @param getActionToTakeOnPop get action to take on popEvent
     */
    registerPermission(
        isUser: () => boolean,
        getPermittedPath: (string) => string,
        // @ts-ignore
        getActionToTakeOnPop: (string, string) => string,
    ) {
        if (this.#permissions.find((permission) => permission.isUser === isUser
            && permission.getActionToTakeOnPop === getActionToTakeOnPop
            && permission.getPermittedPath === getPermittedPath)) {
            console.warn('Permission was already registered: ', isUser);
            return;
        }

        this.#permissions.push({
            isUser,
            getPermittedPath,
            getActionToTakeOnPop,
        });
    }

    /**
     * Register path with regular expression
     * @param {string} path - url address in regEx
     * @param {*} render - function to call on url
     * @param {[IStore]} stores Stores to save in this path
     */
    registerRouteWithRegEx(path:string, render, stores) {
        const config: PathConfig = {
            path,
            render,
            store: stores,
        };
        this.#pathRegister(config, this.#routesWithRegularTestUrl);
    }

    /**
     * Return null if regular path like /profile, / etc
     * @param path what path to check
     * @private
     */
    #isRegExp(path):null|PathConfig {
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
     * Return params for object with store field
     * @param object
     * @return {{stateStore: *[], id: null, page: null}}
     */
    #goToRegularPath(object): RegularPathToTake {
        // todo maybe problem in future
        const stateStore:object[] = [];
        for (const state in object.store) {
            stateStore.push(object.store[state].state);
        }
        // @ts-ignore
        return { stateStore, id: null, page: null };
    }

    /**
     * Return empty JSON if problem in URL exist else return params}
     * @param path
     * @param {JSON} regObj has store field.
     * @return {{}|{stateStore: *[], id: *, page: *}}
     */
    #goToRegExpPath(path, regObj:PathConfig): RegularPathToTake|null {
        // todo think about rename to params of regexppath
        const result = path.match(routingUrl.GENERAL_REG_EXP);
        if (result !== null) {
            const [, page, id] = result;
            const stateStore = [];
            for (const state in regObj.store) {
                // @ts-ignore
                stateStore.push(regObj.store[state].state);
            }
            // @ts-ignore
            return { id, page, stateStore };
        }
        return null;
    }

    /**
     * Get parameters to push into state in history
     * @param path
     * @return {{objectRender: null, params: {}}}
     * @private
     */
    #getParamsForHistoryAndObjectToRender(path: string) {
        const regObj = this.#isRegExp(path);
        let objectRender:PathConfig;
        let params:null|RegularPathToTake;

        if (regObj) {
            params = this.#goToRegExpPath(path, regObj);
            // todo maybe error
            if (params?.id) {
                Actions.sendId(params.id, params.page);
                objectRender = regObj;
            }
        } else {
            objectRender = this.#routes.find((routeObj) => routeObj.path === path);
            if (objectRender) {
                params = this.#goToRegularPath(objectRender);
            }
        }
        // @ts-ignore
        return { objectRender, params };
    }

    /** Go to page with path */
    go(pathToGo, popstateEvent = false, renderPage = true) {
        let path = '';
        const isRefresh = sessionStorage.getItem('isRefresh') === 'true';
        const isStart = sessionStorage.getItem('isStart') === 'true';

        if (!popstateEvent) {
            this.#permissions.forEach((permission) => {
                if (permission.isUser()) {
                    path = permission.getPermittedPath(pathToGo);
                }
            });
        } else {
            path = pathToGo;
        }

        // @ts-ignore
        let { objectRender, params } = this.#getParamsForHistoryAndObjectToRender(path);
        let needPush = true;
        if (!objectRender) {
            objectRender = this.#routes.find((routeObj) => routeObj.path
                === this.#pageNotFoundRoute);
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
            this.#length = window.history.length;
        }
        sessionStorage.setItem('isStart', 'false');
        sessionStorage.setItem('isRefresh', 'false');

        if (popstateEvent) {
            this.#sendStoresChanges(window.history.state.stateInHistory);
        }

        this.#previousParams = params || {};
        if (renderPage) {
            objectRender.render();
        }
        // todo rewrite
        window.history.replaceState({
            historyLen: window.history.length,
            stateInHistory: this.#previousParams.stateStore,
            id: this.#previousParams.id,
            page: this.#previousParams.page,
        }, '', path);
    }

    /** First start Router */
    start() {
        if (sessionStorage.getItem('isStart') !== 'true') {
            sessionStorage.setItem('isStart', 'true');
        }

        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('previousParams', JSON.stringify(this.#previousParams));
            sessionStorage.setItem('isRefresh', 'true');
        });

        window.addEventListener('popstate', (event) => {
            let { state } = event;
            if (!state || !state.historyLen) {
                if (window.history.length === 1) {
                    console.warn('Leaving page');
                    return;
                }

                state = window.history.state;
            }
            event.preventDefault();

            const pathToGo = window.location.pathname;
            let direction:string;

            if (state.historyLen > this.#length) {
                direction = DIRECTIONS.forward;
            } else {
                direction = DIRECTIONS.backward;
            }
            console.group();
            console.log('History', window.history.state);
            console.log('State', state);
            console.log('Direction', direction);
            console.log('len', this.#length);
            console.log('Path', pathToGo);

            this.#length = state.historyLen;

            let actionOnPath:string;
            this.#permissions.forEach((permission) => {
                if (!permission.isUser()) {
                    return;
                }
                actionOnPath = permission.getActionToTakeOnPop(pathToGo, direction);
            });

            console.log('Action', actionOnPath);
            console.groupEnd();
            // @ts-ignore
            switch (actionOnPath) {
            case ACTION_ON_PATH.goForward:
                // todo check if history can go forward
                window.history.forward();
                window.dispatchEvent(new Event('popstate'));
                return;
                break;
            case ACTION_ON_PATH.goBackward:
                window.history.back();
                window.dispatchEvent(new Event('popstate'));
                return;
                break;
            case ACTION_ON_PATH.login:
                this.go('/login');
                break;
            case ACTION_ON_PATH.canBeAccessed:
                this.go(pathToGo, true);
                break;
            default:
                // @ts-ignore
                console.warn('Error in actions on path, action taken:', actionOnPath);
            }
        });
        this.go(window.location.pathname);
    }
}

export default new Router();
