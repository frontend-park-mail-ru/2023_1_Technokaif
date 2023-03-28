import ComponentsStore from '../stores/ComponentsStore';
import { checkAuth } from '../utils/functions/checkAuth';
import { authNavConfig, sidebarConfig, unAuthNavConfig } from '../utils/config/config';
import Navbar from '../components/Navbar/Navbar';
import Menu from '../components/Menu/Menu';
import { clearBars, prePageRender } from '../utils/functions/prePageRender';
import { componentsNames } from '../utils/config/ComponentsNames';
import { EventTypes } from '../stores/EventTypes';
import Actions from '../actions/Actions';

/**
 * Base View class to handle render functions.
 */
export class BaseView {
    /**
     * Name of view.
     */
    #viewName;

    /**
     * Constructor for base view.
     */
    constructor(name) {
        this.#viewName = name;
    }

    /**
     * Function to get view name.
     * @returns {string}
     */
    get name() {
        return this.#viewName;
    }

    // todo: change function of navbar rendering. Make middleware for auth and navbar class inside
    //  navbar component render.
    /**
     * Create Navbar component and render it in parent
     * @param {HTMLElement} parent -- where to place Navbar
     */
    #renderNavbar(parent) {
        console.log(parent);
        const config = (checkAuth()) ? authNavConfig : unAuthNavConfig;
        const navbar = new Navbar(parent, config, 'navbar');
        navbar.render();
    }

    /**
     * Create Sidebar component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    #renderSidebar(parent) {
        const sidebar = new Menu(parent, sidebarConfig, 'sidebar');
        sidebar.render();
    }

    /**
     * Callback to pass throw store to subscribe rendering components.
     * @param list
     */
    renderComponentsList(list) {
        list.forEach((componentName) => {
            const parent = ComponentsStore.checkWhereToPlace(componentName);

            switch (componentName) {
            case componentsNames.NAVBAR:
                this.#renderNavbar(parent);
                break;
            case componentsNames.SIDEBAR:
                this.#renderSidebar(parent);
                break;
            default:
                break;
            }
        });
    }

    /**
     * Some logic before render.
     */
    #preRender() {
        if (ComponentsStore.prePageNeed(this.#viewName)) {
            prePageRender();
        } else {
            clearBars();
        }
    }

    /**
     * Render element in parent. Clear parent before.
     */
    render() {
        this.#preRender();

        ComponentsStore.subscribe(
            (list) => {
                console.log(this);
                this.renderComponentsList(list);
            },
            EventTypes.ON_NOT_RENDERED_ITEMS,
        );

        // Actions.whatRender(this.#viewName);
    }
}
