import ComponentsStore from '../stores/ComponentsStore';
import { prePageRender } from '../utils/functions/prePageRender';
import { EventTypes } from '../utils/config/EventTypes';
import Actions from '../actions/Actions';
import { componentsNames } from '../utils/config/componentsNames';

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

    /**
     * Function to make all basic subscribes
     */
    #addSubscribes() {
        ComponentsStore.subscribe(
            (list) => {
                this.renderComponentsList(list);
            },
            EventTypes.ON_NOT_RENDERED_ITEMS,
        );
        ComponentsStore.subscribe(
            (list) => {
                this.unrenderComponentsList(list);
            },
            EventTypes.ON_REMOVE_ANOTHER_ITEMS,
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
            switch (componentName) {
            case componentsNames.SIDEBAR:
            case componentsNames.MAIN:
            case componentsNames.NAVBAR:
            case componentsNames.LOGIN_FORM:
            case componentsNames.REGISTER_FORM:
            case componentsNames.PAGE404:
                component.render(parent);
                Actions.addElementOnPage(componentName);
                break;
            default:
            }
        });
    }

    /**
     * Callback to pass throw store to subscribe rendering components.
     * @param list
     */
    unrenderComponentsList(list) {
        list.forEach((component) => {
            const componentName = component.name;
            const parent = ComponentsStore.checkWhereToPlace(componentName);
            switch (componentName) {
            case componentsNames.SIDEBAR:
            case componentsNames.MAIN:
            case componentsNames.NAVBAR:
            case componentsNames.LOGIN_FORM:
            case componentsNames.REGISTER_FORM:
            case componentsNames.PAGE404:
                component.unrender(parent);
                Actions.removeElementFromPage(componentName);
                break;
            default:
            }
        });
    }

    /**
     * Some logic before render.
     */
    #preRender() {
        if (ComponentsStore.prePageNeed()) {
            prePageRender();
        }
    }

    /**
     * Render element in parent. Clear parent before.
     */
    render() {
        this.#preRender();

        this.#addSubscribes();
    }
}
