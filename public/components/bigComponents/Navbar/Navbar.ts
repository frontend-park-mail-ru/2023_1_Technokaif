import Router from '../../../router/Router';
import ApiActions from '../../../actions/ApiActions';
import { componentsNames } from '../../../utils/config/componentsNames';
import templateHtml from './navbar.handlebars';
import { EventTypes } from '../../../utils/config/EventTypes';
import API from '../../../stores/API';
import { authNavConfig, unAuthNavConfig } from '../../../utils/config/config';
import { componentsJSNames } from '../../../utils/config/componentsJSNames';
import ComponentsStore from '../../../stores/ComponentsStore';
import Actions from '../../../actions/Actions';
import unsubscribeFromAllStoresOnComponent from '../../../utils/functions/unsubscribeFromAllStores';
import { checkAuth } from '../../../utils/functions/checkAuth';
import { routingUrl } from '../../../utils/config/routingUrls';
import UserInfoStore from '../../../stores/UserInfoStore';
import { DIRECTIONS_DROPDOWN, DropDown } from '../../smallComponents/dropDown/dropDown';
import { dropDownAvatarSetup, navbarAvatarSetup } from '../../../utils/setup/avatarInNavbar';
import { AvatarNavbar } from '../../smallComponents/navbarAvatar/avatarNavbar';
import './mobileNavs.less';

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

    #dropDown;

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
        this.#dropDown = null;
    }

    /**
     * Returns all entries of config
     */
    get items() {
        return Object.entries(this.#config).map(([key, value]) => ({
            key,
            value,
        }));
    }

    /**
     * Add event listener to component. If HTMLAnchorElement or HTMLButtonElement was 'clicked'
     * then redirect to section in dataset of element
     */
    #callEventListener() {
        ComponentsStore.subscribe(
            (list) => {
                const component = list.filter((comp) => comp.name === componentsNames.NAVBAR);
                if (component.length !== 0) {
                    Actions.removeElementFromPage(componentsNames.NAVBAR);
                    unsubscribeFromAllStoresOnComponent(componentsNames.NAVBAR);
                    this.unRender();
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
                    const element: HTMLDivElement = document.querySelector(`.${componentsNames.PLAYER}`) as HTMLDivElement;
                    element.hidden = true;
                }
            },
            EventTypes.LOGOUT_STATUS,
            componentsNames.NAVBAR,
        );

        UserInfoStore.subscribe(
            () => {
                if (checkAuth()) {
                    // const div = document.createElement('div');
                    if (this.#dropDown) {
                        document.querySelector('.js__avatar-placement').innerHTML = '';
                    }
                    const configForAvatar = navbarAvatarSetup;

                    const values = UserInfoStore.state;
                    if (!values.avatarSrc) {
                        configForAvatar.imgSrc = '/static/svg/default-artist.svg';
                    } else {
                        configForAvatar.imgSrc = `/media${values.avatarSrc}`;
                    }

                    configForAvatar.text = values.username;
                    const pr = new Promise((resolve) => {
                        const avatar = new AvatarNavbar(document.querySelector('.js__avatar-placement'), configForAvatar);
                        avatar.appendElement();
                        resolve('');
                    });
                    pr.then(() => {
                        const avatar = document.querySelector('.navbar-avatar');
                        if (!avatar) {
                            console.error('Avatar doesn\'t exist');
                            return;
                        }
                        this.#renderDrop(avatar);
                    });
                }
            },
            EventTypes.USER_DATA_GOT_FOR_PAGE,
            componentsNames.NAVBAR,
        );

        const mainElement: HTMLDivElement = document.querySelector(`.${componentsJSNames.MAIN}`) as HTMLDivElement;

        mainElement.addEventListener('click', (e) => {
            e?.preventDefault?.();
            if (e.target instanceof HTMLAnchorElement
                    || e.target instanceof HTMLButtonElement) {
                const { section } = e.target.dataset;
                if (!section) {
                    console.error('Error in navbar redirect section');
                    return;
                }
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

        const closebtn: HTMLDivElement = document.querySelector('.closebtn');
        closebtn.addEventListener('click', () => {
            const menu: HTMLDivElement = document.getElementById('sidebar');
            const menuElement: HTMLDivElement = document.querySelector('.menu-burger');
            const closeElement: HTMLDivElement = document.querySelector('.closebtn');
            menuElement.hidden = false;
            closeElement.hidden = true;
            menu.classList.remove('open');
        });

        const openbtn: HTMLDivElement = document.querySelector('.openbtn');
        openbtn.addEventListener('click', () => {
            const menu: HTMLDivElement = document.getElementById('sidebar');
            const menuElement: HTMLDivElement = document.querySelector('.menu-burger');
            const closeElement: HTMLDivElement = document.querySelector('.closebtn');
            menuElement.hidden = true;
            closeElement.hidden = false;
            menu.classList.add('open');
        });

        const logo: HTMLDivElement = document.querySelector('.burger-logo');
        logo.addEventListener('click', () => {
            Router.go('/');
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

            // @ts-ignore
            newcfg.items.push(tmpItem);
        }

        return newcfg;
    }

    /** Render drop */
    #renderDrop(placement) {
        if (this.#dropDown) {
            this.#dropDown.unRender();
        }
        if (!checkAuth()) {
            return;
        }

        if (!placement) {
            console.warn('Placement for avatar doesn\'t exist');
            return;
        }

        this.#dropDown = new DropDown(
            placement,
            dropDownAvatarSetup,
            DIRECTIONS_DROPDOWN.DOWN,
        );
        this.#dropDown.render();

        const bt1 = document.createElement('a');
        bt1.textContent = 'Profile';
        bt1.setAttribute('data-section', 'profile');
        bt1.classList.add('dropdown-element');

        const bt2 = document.createElement('a');
        bt2.textContent = 'Logout';
        bt2.setAttribute('data-section', 'logout');
        bt2.classList.add('dropdown-element');

        this.#dropDown.addOptionsElement(bt1);
        this.#dropDown.addOptionsElement(bt2);
    }

    /**
     * Render Navbar element in parent
     */
    render() {
        const items = this.#translateToItems(this.#config);
        // @ts-ignore
        items.name = this.#name;
        if (checkAuth()) {
            ApiActions.user(localStorage.getItem('userId'));
        }

        const template = templateHtml;
        const templateInnerHtml = template(items);
        if (!this.#parent) {
            console.error('No parent on page');
            return;
        }
        this.#parent.innerHTML += templateInnerHtml;

        // this.#renderDrop();
        this.#callEventListener();
    }

    /**
     * Function to rerender navbar using only to change state from notAuth to auth state
     */
    #reRender() {
        this.#config = (checkAuth()) ? authNavConfig : unAuthNavConfig;
        this.#name = (checkAuth()) ? 'authNavbar' : 'unAuthNavbar';
        if (checkAuth()) {
            ApiActions.user(localStorage.getItem('userId'));
        }

        const navbar = document.querySelector(`.${componentsNames.NAVBAR}`);
        this.#parent.removeChild(navbar);

        const items = this.#translateToItems(this.#config);
        // @ts-ignore
        items.name = this.#name;

        const template = templateHtml;
        const templateInnerHtml = template(items);
        const tempElement = document.createElement('div');

        tempElement.innerHTML = templateInnerHtml;

        const newElement = tempElement.firstChild;
        this.#parent.insertBefore(newElement, this.#parent.firstChild);
        // this.#renderDrop();
        this.#callEventListener();
    }

    /**
     * Function to unrender Navbar component
     */
    private unRender() {
        const element = document.querySelector(`.${componentsJSNames.NAVBAR}`);
        if (this.#dropDown) {
            this.#dropDown.unRender();
        }
        if (!element) {
            console.error('Cannot unrender navbar');
            return;
        }

        element.remove();
    }
}

export default Navbar;
