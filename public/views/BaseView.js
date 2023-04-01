import ComponentsStore from '../stores/ComponentsStore';
import { prePageRender } from '../utils/functions/prePageRender';
import { EventTypes } from '../utils/config/EventTypes';
import Actions from '../actions/Actions';
import UserInfoStore from '../stores/UserInfoStore';
import { componentsNames } from '../utils/config/componentsNames';

/**
 * Base View class to handle render functions.
 */
export class BaseView {
    /**
     * Name of view.
     */
    #viewName;

    #unsubscribe;

    /**
     * Constructor for base view.
     */
    constructor(name) {
        this.#viewName = name;
        this.#unsubscribe = [];
    }

    /**
     * Function to get view name.
     * @returns {string}
     */
    get name() {
        return this.#viewName;
    }

    // todo do not use render of Navbar without Action. At least make an action.
    /**
     * Function to render Navbar element after logout
     */
    #renderNavbarAfterLogout() {
        const navbarComponent = ComponentsStore.getComponentByName(componentsNames.NAVBAR);
        navbarComponent.unrender();
        const navbarDiv = document.createElement('div');
        navbarDiv.classList.add(`${componentsNames.NAVBAR}`);
        navbarDiv.classList.add('navbar');

        document.querySelector('#cont').insertBefore(navbarDiv, document.querySelector('#cont').firstChild);
        const parent = ComponentsStore.checkWhereToPlace(componentsNames.NAVBAR);
        navbarComponent.render(parent);
    }

    /**
     * Function to make all basic subscribes
     */
    #addSubscribes() {
        ComponentsStore.subscribe(
            (list) => {
                this.unrenderComponentsList(list);
            },
            EventTypes.ON_REMOVE_ANOTHER_ITEMS,
        );

        ComponentsStore.subscribe(
            (list) => {
                this.renderComponentsList(list);
            },
            EventTypes.ON_NOT_RENDERED_ITEMS,
        );

        UserInfoStore.subscribe(
            (message) => {
                if (message !== 'OK') {
                    console.error('bad respond from server during logout');
                } else {
                    this.#renderNavbarAfterLogout();
                }
            },
            EventTypes.LOGOUT_STATUS,
        );
    }

    /**
     * Callback to pass throw store to subscribe rendering components.
     * @param list
     */
    renderComponentsList(list) {
        list.forEach((component) => {
            const componentName = component.name;
            const parent = ComponentsStore.checkWhereToPlace(componentName);
            if (component.render.length === 1) {
                component.render(parent);
                Actions.addElementOnPage(componentName);
            }
        });
    }

    /**
     * Callback to pass throw store to subscribe unrender of components.
     * @param list
     */
    unrenderComponentsList(list) {
        list.forEach((component) => {
            const componentName = component.name;
            const parent = ComponentsStore.checkWhereToPlace(componentName);
            component.unrender(parent);
            Actions.removeElementFromPage(componentName);
        });
    }

    /**
     * Some logic before render.
     */
    #preRender() {
        if (ComponentsStore.prePageNeed(this.#viewName)) {
            prePageRender();
        }
    }

    /**
     * Function to unsubscribe from componentsStore
     */
    componentsStoreUnsubscribe() {
        ComponentsStore.unsubscribeAll();
    }

    /**
     * Render element in parent. Clear parent before.
     */
    render() {
        this.#preRender();

        this.#addSubscribes();
    }
}
