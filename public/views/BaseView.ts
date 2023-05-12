import { prePageRender } from '@functions/prePageRender';
import { EventTypes } from '@config/EventTypes';
import { componentsNames } from '@config/componentsNames';
import { componentsJSNames } from '@config/componentsJSNames';
import { pageNames } from '@config/pageNames';
import ComponentsStore from '@store/ComponentsStore';
import ComponentsActions from '@Actions/ComponentsActions';

/** Object that contain name and render function */
export interface NameAndRender {
    name: string,
    render: (arg0: Element) => void,
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
        if (this.#viewName === pageNames.LOGIN || this.#viewName === pageNames.REGISTER) {
            return;
        }

        list.forEach((component) => {
            const componentName = component.name;
            const parent = ComponentsStore.checkWhereToPlace(componentName);
            if (!parent) {
                console.error('Can\'t find parent for component', componentName);
                return;
            }

            switch (componentName) {
            case componentsNames.SIDEBAR:
            case componentsNames.MAIN:
            case componentsNames.NAVBAR:
            case componentsNames.PAGE404:
            case componentsNames.PLAYER:
            case componentsNames.LIBRARY_LIST:
                component.render(parent);
                ComponentsActions.addElementOnPage(componentName);
                break;
            default:
            }
        });
    }

    /**
     * Some logic before render.
     */
    #preRender() {
        const isNeed = ComponentsStore.prePageNeed(this.#viewName);
        if (isNeed) {
            if (document.querySelector(`${componentsJSNames.MAIN}`) === null) {
                prePageRender();
            }
        } else {
            const bodyElement = document.querySelector('factbody');
            const root = document.querySelector('#root');
            if (!root || !bodyElement) {
                return;
            }
            root.removeChild(bodyElement);
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
