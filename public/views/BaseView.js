import ComponentsStore from '../stores/ComponentsStore';
import { prePageRender } from '../utils/functions/prePageRender';
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

    /**
     * Callback to pass throw store to subscribe rendering components.
     * @param list
     */
    renderComponentsList(list) {
        console.log('render', list);
        list.forEach((component) => {
            const componentName = component.name;
            const parent = ComponentsStore.checkWhereToPlace(componentName);
            if (component.render.length !== 2) {
                component.render(parent);
            }

            Actions.addElementOnPage(componentName);
        });
    }

    /**
     * Callback to pass throw store to subscribe unrender of components.
     * @param list
     */
    unrenderComponentsList(list) {
        console.log('unrender', list);
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
    }
}
