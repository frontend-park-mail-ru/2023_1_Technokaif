import ComponentsStore from '../stores/ComponentsStore';
import Actions from '../actions/Actions';
import { checkAuth } from '../utils/functions/checkAuth';
import { authNavConfig, sidebarConfig, unAuthNavConfig } from '../utils/config/config';
import { createDivAndInsertInParent } from '../utils/functions/utils';
import Navbar from '../components/Navbar/Navbar';
import Menu from '../components/Menu/Menu';
import { prePageRender } from '../utils/functions/prePageRender';

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

    // todo: change function of navbar rendering. Make middleware for auth and navbar class inside
    //  navbar component render.
    /**
     * Create Navbar component and render it in parent
     * @param {HTMLElement} parent -- where to place Navbar
     */
    #renderNavbar(parent) {
        const config = (checkAuth()) ? authNavConfig : unAuthNavConfig;

        const navbarDiv = createDivAndInsertInParent(parent, 'navbar');
        const navbar = new Navbar(navbarDiv, config, 'navbar');
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
    #renderComponentsList(list) {
        list.forEach((componentName) => {
            const parent = componentsStore.checkWhereToPlace(componentName);
            switch (componentName) {
            case componentsNames.NAVBAR:
                this.#renderNavbar(parent);
                break;
            case componentsNames.SIDEBAR:
                this.#renderSidebar(parent);
                break;
            default:
                console.error('Component by name', componentName, 'not found');
                return document.querySelector('#root');
            }
        });
    }

    /**
     * Some logic before render.
     */
    #preRender() {
        if (componentsStore.prePageNeed(this.#viewName)) {
            prePageRender();
        }
    }

    /**
     * Render element in parent. Clear parent before.
     */
    render() {
        this.#preRender();
        ComponentsStore.addChangeListener(
            this.#renderComponentsList,
            EventTypes.ON_NOT_RENDERED_ITEMS,
        );

        Actions.whatRender(this.#viewName);
    }
}
