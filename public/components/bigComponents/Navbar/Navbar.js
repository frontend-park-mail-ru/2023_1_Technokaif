import Router from '../../../router/Router';
import ApiActions from '../../../actions/ApiActions';
import { componentsNames } from '../../../utils/config/componentsNames';
import templateHtml from './navbar.handlebars';
import { EventTypes } from '../../../utils/config/EventTypes';
import API from '../../../stores/API.ts';
import { authNavConfig, unAuthNavConfig } from '../../../utils/config/config';
import { componentsJSNames } from '../../../utils/config/componentsJSNames';
import ComponentsStore from '../../../stores/ComponentsStore';
import Actions from '../../../actions/Actions';
import unsubscribeFromAllStoresOnComponent from '../../../utils/functions/unsubscribeFromAllStores';
import { checkAuth } from '../../../utils/functions/checkAuth';
import { routingUrl } from '../../../utils/config/routingUrls';

/**
 * Class for Navbar element: Login, Registration, Logout and user info.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 * @param {string} name - Name using in classes.
 */
class Navbar {
    #parent;

    #config;

    #name;

    /**
     * Constructor
     * @param {HTMLElement} parent -- where to place
     * @param {Object} config -- config to configure Navbar
     * @param {string} name -- name of Navbar
     */
    constructor(parent, config, name) {
        this.#parent = parent;
        this.#config = config;
        this.#name = name;
    }

    /**
     * Returns all entries of config
     */
    get items() {
        return Object.entries(this.#config).map(([key, value]) => ({
            key,
            ...value,
        }));
    }

    /**
     * Add event listener to component. If HTMLAnchorElement or HTMLButtonElement was 'clicked'
     * then redirect to section in dataset of element
     */
    #callEventListener() {
        ComponentsStore.subscribe(
            (list) => {
                let component = list.filter((comp) => comp.name === componentsNames.NAVBAR);
                if (component.length !== 0) {
                    Actions.removeElementFromPage(componentsNames.NAVBAR);
                    unsubscribeFromAllStoresOnComponent(componentsNames.NAVBAR);
                    this.#unRender();
                }

                component = list.filter((comp) => comp.name === componentsNames.MAIN);
                if (component.length !== 0) {
                    Actions.removeElementFromPage(componentsNames.MAIN);
                    unsubscribeFromAllStoresOnComponent(componentsNames.MAIN);
                    const parent = ComponentsStore.checkWhereToPlace(componentsNames.MAIN);
                    parent.removeChild(document.querySelector(`.${componentsJSNames.MAIN}`));
                }
            },
            EventTypes.ON_REMOVE_ANOTHER_ITEMS,
            componentsNames.NAVBAR,
        );
        API.subscribe(
            (message) => {
                if (message !== 'OK') {
                    console.error('bad respond from server during logout');
                } else {
                    this.#reRender();
                }
            },
            EventTypes.LOGOUT_STATUS,
            componentsNames.NAVBAR,
        );

        document.querySelector(`.${componentsJSNames.MAIN}`)
            .addEventListener('click', (e) => {
                e?.preventDefault?.();
                if (e.target instanceof HTMLAnchorElement
                    || e.target instanceof HTMLButtonElement) {
                    const { section } = e.target.dataset;
                    if (section === 'logout') {
                        if (window.location.pathname === routingUrl.PROFILE) {
                            Router.go('/');
                        }

                        ApiActions.logout();
                    } else if (Object.keys(this.#config)
                        .includes(section)) {
                        Router.go(this.#config[section].href);
                    }
                }
            });
    }

    /**
     * Get all Items from lastCfg and returns in object
     * @param {config} lastCfg -- config where search items
     * @returns newCfg -- items
    */
    #translateToItems(lastCfg) {
        const newcfg = { items: [] };
        for (const obj in lastCfg) {
            const tmpItem = {};

            for (const property in lastCfg[obj]) {
                tmpItem[property] = lastCfg[obj][property];
            }

            newcfg.items.push(tmpItem);
        }

        return newcfg;
    }

    /**
     * Render Navbar element in parent
     */
    render() {
        const items = this.#translateToItems(this.#config);
        items.name = this.#name;

        const template = templateHtml;
        const templateInnerHtml = template(items);
        this.#parent.innerHTML += templateInnerHtml;

        this.#callEventListener();
    }

    /**
     * Function to rerender navbar using only to change state from notAuth to auth state
     */
    #reRender() {
        this.#config = (checkAuth()) ? authNavConfig : unAuthNavConfig;
        this.#name = (checkAuth()) ? 'authNavbar' : 'unAuthNavbar';

        const navbar = document.querySelector(`.${componentsNames.NAVBAR}`);
        this.#parent.removeChild(navbar);

        const items = this.#translateToItems(this.#config);
        items.name = this.#name;

        const template = templateHtml;
        const templateInnerHtml = template(items);
        const contentHtml = this.#parent.innerHTML;
        this.#parent.innerHTML = (templateInnerHtml + contentHtml);
    }

    /**
     * Function to unrender Navbar component
     */
    #unRender() {
        this.#parent.removeChild(document.querySelector(`.${componentsJSNames.NAVBAR}`));
    }
}

export default Navbar;
