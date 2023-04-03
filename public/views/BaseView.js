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
     * List of components provided in this page
     */
    #components;

    /**
     * Constructor for base view.
     */
    constructor(name, components) {
        this.#viewName = name;
        this.#components = components;
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
            case componentsNames.NAVBAR:
            case componentsNames.SIDEBAR:
                component.render(parent);
                Actions.addElementOnPage(componentName);
                break;
            default:
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
