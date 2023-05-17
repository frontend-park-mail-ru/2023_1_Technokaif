import { componentsNames } from '@config/componentsNames';
import { EventTypes } from '@config/EventTypes';
import { componentsJSNames } from '@config/componentsJSNames';
import { checkAuth } from '@functions/checkAuth';
import { routingUrl } from '@config/routingUrls';
import PlaylistActions from '@API/PlaylistActions';
import Router from '@router/Router';
import ComponentsStore from '@store/ComponentsStore';
import unsubscribeFromAllStoresOnComponent from '@functions/unsubscribeFromAllStores';
import API from '@store/API';
import ComponentsActions from '@Actions/ComponentsActions';
import templateHtml from './menu.handlebars';

/**
 * Class for Menu: Home, Search, Playlist, Create Playlist, Liked Songs.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 * @param {string} name - Name using in classes.
 */
class Menu {
    #parent;

    #config;

    #name;

    /**
     *
     * @param {HTMLElement} parent -- where to place component
     * @param {Object} config -- config to compile template
     * @param {string} name -- name of Component
     */
    constructor(parent, config, name) {
        this.#parent = parent;
        this.#config = config;
        this.#name = name;
    }

    /**
     * @returns all entries in config
     */
    get items() {
        return Object.entries(this.#config).map(([key, value]) => ({
            key,
            value,
        }));
    }

    /**
     * add event listener to component. On 'click' redirect to section on dataset
     */
    callEventListener() {
        const logo = document.querySelector('.sidebar__logo');
        if (!logo) {
            console.error('Menu element error');
            return;
        }
        logo.addEventListener('click', () => {
            Router.go(routingUrl.ROOT);
        });
        ComponentsStore.subscribe(
            (list) => {
                const component = list.find((comp) => comp.name === componentsNames.SIDEBAR);
                if (component) {
                    ComponentsActions.removeElementFromPage(componentsNames.SIDEBAR);
                    unsubscribeFromAllStoresOnComponent(componentsNames.SIDEBAR);
                    this.#unRender();
                }
            },
            EventTypes.ON_REMOVE_ANOTHER_ITEMS,
            componentsNames.SIDEBAR,
        );
        API.subscribe(
            (playlistId) => {
                Router.go(routingUrl.PLAYLIST_PAGE(playlistId));
            },
            EventTypes.CREATED_PLAYLIST,
            componentsNames.SIDEBAR,
        );
        this.#parent.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target instanceof HTMLAnchorElement) {
                const { section } = e.target.dataset;
                if (this.#config[section] !== undefined) {
                    if (section === 'createPlaylist' && checkAuth()) {
                        const id = localStorage.getItem('userId');
                        if (!id) {
                            console.error('Error in user id');
                            return;
                        }
                        PlaylistActions.createPlaylist({
                            description: '',
                            name: 'New playlist',
                            users: [
                                +id,
                            ],
                        });

                        return;
                    }
                    if ((section === 'library' || section === 'createPlaylist' || section === 'likedSongs') && !checkAuth()) {
                        Router.go(routingUrl.LOGIN);
                    } else {
                        Router.go(this.#config[section].href);
                    }
                }
            }
        });
    }

    /**
     * Render component in parent element
     */
    render() {
        const items = this.#translateToItems(this.#config);
        // @ts-ignore
        items.name = this.#name;

        const template = templateHtml;
        const templateInnerHtml = template(items);
        this.#parent.innerHTML += templateInnerHtml;

        this.callEventListener();
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

            // @ts-ignore
            newcfg.items.push(tmpItem);
        }

        return newcfg;
    }

    /**
     * Function to unrender Sidebar component
     */
    #unRender() {
        const element = document.querySelector(`.${componentsJSNames.SIDEBAR}`);
        if (!element) {
            return;
        }
        this.#parent.removeChild(element);
    }
}

export default Menu;
