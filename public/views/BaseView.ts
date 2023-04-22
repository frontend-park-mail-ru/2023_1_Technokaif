import ComponentsStore from '../stores/ComponentsStore.js';
import { prePageRender } from '../utils/functions/prePageRender.js';
import { EventTypes } from '../utils/config/EventTypes.js';
import Actions from '../actions/Actions';
import { componentsNames } from '../utils/config/componentsNames.js';

/** Object that contain name and render function */
export interface NameAndRender {
    name: string,
    render: (arg0: HTMLElement) => void,
}

/**
 * Base View class to handle render functions.
 */
export abstract class BaseView {
    /**
     * Name of view.
     */
    #viewName: string;

    /**
     * Constructor for base view.
     */
    protected constructor(name: string) {
        this.#viewName = name;
    }

    /**
     * Function to get view name.
     * @returns {string}
     */
    public get name(): string {
        return this.#viewName;
    }

    /**
     * Function to make all basic subscribes
     */
    #addSubscribes(): void {
        ComponentsStore.subscribe(
            (list: Array<NameAndRender>):void => {
                this.#renderComponentsList(list);
            },
            EventTypes.ON_NOT_RENDERED_ITEMS,
        );
    }

    /**
     * Callback to pass throw store to subscribe rendering components.
     * @param list
     */
    #renderComponentsList(list: Array<NameAndRender>):void {
        list.forEach((component) => {
            const componentName = component.name;
            const parent = ComponentsStore.checkWhereToPlace(componentName);
            switch (componentName) {
            case componentsNames.SIDEBAR:
            case componentsNames.MAIN:
            case componentsNames.NAVBAR:
            case componentsNames.PAGE404:
            case componentsNames.PLAYER:
                // todo
                // @ts-ignore
                component.render(parent);
                // @ts-ignore
                Actions.addElementOnPage(componentName);
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
