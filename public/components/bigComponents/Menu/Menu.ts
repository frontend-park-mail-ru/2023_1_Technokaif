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
import UserActions from '@API/UserActions';
import ContentStore from '@store/ContentStore';
import { instancesNames } from '@config/instances';
import { pageNames } from '@config/pageNames';
import {
    ListWithCoversAndNames,
} from '@smallComponents/listWithCoversAndNames/listWithCoversAndNames';
import { setupMenuPlaylists } from '@setup/navbarMenuSetup';
import { Playlist } from '@setup/playlistSetup';
import { UserPlaylist } from '@bigComponents/Playlist/Library/userPlaylist';
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
    private addEventListeners() {
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
                this.unRenderPlaylists();
                UserActions.userPlaylists(localStorage.getItem('userId'));
                Router.go(routingUrl.PLAYLIST_PAGE(playlistId));
            },
            EventTypes.CREATED_PLAYLIST,
            componentsNames.SIDEBAR,
        );

        API.subscribe(
            () => {
                this.unRenderPlaylists();
                UserActions.userPlaylists(localStorage.getItem('userId'));
            },
            EventTypes.DELETED_PLAYLIST,
            componentsNames.SIDEBAR,
        );

        ContentStore.subscribe(
            (instance) => {
                const playlists = ContentStore.state[pageNames.LIBRARY_PLAYLISTS][instance];
                const element: HTMLDivElement|null = this.#parent.querySelector(`.${componentsNames.MENU_PLAYLISTS_LIST}`);
                if (element) {
                    return;
                }

                switch (instance) {
                case instancesNames.USER_PLAYLISTS_PAGE:
                    this.renderPlaylists(playlists);
                    break;
                default:
                    break;
                }
            },
            EventTypes.GOT_USER_PLAYLISTS,
            componentsNames.SIDEBAR,
        );

        API.subscribe(
            (message) => {
                if (message !== 'OK') {
                    console.error('bad response from server during login');
                } else {
                    UserActions.userPlaylists(localStorage.getItem('userId'));
                }
            },
            EventTypes.LOGIN_STATUS,
            componentsNames.SIDEBAR,
        );

        this.#parent.addEventListener('click', (e) => {
            e.preventDefault();

            const sidebarItem: HTMLElement|null = e.target.closest(`.${componentsNames.SIDEBAR_ITEM}`);
            if (!sidebarItem) {
                return;
            }
            const sidebarLink: HTMLAnchorElement|null = sidebarItem.querySelector(`.${componentsNames.SIDEBAR_LINK}`);
            if (!sidebarItem?.contains(e.target) || !sidebarLink) {
                return;
            }

            if (!sidebarLink || !sidebarItem) {
                return;
            }

            const { section } = sidebarLink.dataset;
            if (!section) {
                console.error('Dont have an id data on menu link');
                return;
            }
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
        });
    }

    /**
     * Function to render playlists list in navbar for auth user
     * @private
     */
    private renderPlaylists(playlists: Array<Playlist>) {
        const placement: HTMLElement|null = document.querySelector(`.${componentsNames.SIDEBAR}`);
        if (!placement) {
            console.error('Cannot get element placement for listWithCover');
            return;
        }

        new ListWithCoversAndNames(
            placement,
            setupMenuPlaylists(playlists),
            componentsNames.MENU_PLAYLISTS_LIST,
        ).appendElement();

        const menuElement: HTMLDivElement|null = placement.querySelector('.menu-playlists');
        if (!menuElement) {
            console.error('Cannot get menu element for listWithCover');
            return;
        }

        if (!playlists.length) {
            menuElement.classList.add('empty-playlist-menu');
        }
    }

    /**
     * Unrender list of playlists
     * @private
     */
    private unRenderPlaylists() {
        const parent: HTMLElement|null = document.querySelector(`.${componentsNames.SIDEBAR}`);
        const element: HTMLElement|null = document.querySelector(`.${componentsNames.MENU_PLAYLISTS_LIST}`);
        if (!element || !parent) {
            console.error('Something bad in menu list elements or sidebar');
            return;
        }

        parent?.removeChild(element);
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
        if (checkAuth()) {
            UserActions.userPlaylists(localStorage.getItem('userId'));
        }

        this.addEventListeners();
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
