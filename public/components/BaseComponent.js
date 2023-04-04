import ComponentsStore from '../stores/ComponentsStore';
import unsubscribeFromAllStoresOnComponent from '../utils/functions/unsubscribeFromAllStores';
import { EventTypes } from '../utils/config/EventTypes';

/**
 * Base Component class to handle render functions.
 */
export class BaseComponent {
    /**
     * Parent where to render
     */
    #parent;

    /**
     * Name of component
     */
    #name;

    /**
     * Config to put in template
     */
    #config;

    /**
     * Template to create
     */
    #template;

    /**
     * Create BaseModel. Empty innerHtml before placement
     * @param {HTMLElement} parent - where to place MainWindowContent
     * @param name - name of current component
     * @param {Object} config - what config use to compile template
     * @param {function} template - template to create elements
     */
    constructor(parent, config, template, name = 'elementary component') {
        this.#parent = parent;
        this.#name = name;
        this.#config = config;
        this.#template = template;
    }

    /**
     * Component Name getter
     * @returns {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * Subscribe there on all general events
     */
    #subscribeAll() {
        ComponentsStore.subscribe(
            (list) => {
                const component = list.filter((comp) => comp.name === this.name);
                if (component.length !== 0) {
                    unsubscribeFromAllStoresOnComponent(this.name);
                    this.unRender();
                }
            },
            EventTypes.ON_REMOVE_ANOTHER_ITEMS,
        );
    }

    /**
     * Render element in parent. Clear parent before.
     */
    render() {
        this.#subscribeAll();
        this.#parent.innerHTML = this.#template(this.#config);
    }

    /** Append element to parent without clearing it */
    appendElement() {
        this.#subscribeAll();
        this.#parent.innerHTML = this.#template(this.#config);
    }

    /**
     * UnRender component
     */
    unRender() {
        this.#parent.removeChild(this.name);
    }

    /**
     * HTML template filler
     * @returns {string} - element in string
     */
    HTML() {
        return this.#template(this.#config);
    }
}
