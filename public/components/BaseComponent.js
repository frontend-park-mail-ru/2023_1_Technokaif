import ComponentsStore from '../stores/ComponentsStore';
import Actions from '../actions/Actions';
import unsubscribeFromAllStoresOnComponent from '../utils/functions/unsubscribeFromAllStores';
import { EventTypes } from '../utils/config/EventTypes';
import ContentStore from '../stores/ContentStore';
import { pageNames } from '../utils/config/pageNames';
import { componentsNames } from '../utils/config/componentsNames';
import { componentsJSNames } from '../utils/config/componentsJSNames';

/**
 * Base Component class to handle render functions.
 */
export class BaseComponent {
    /**
     * Parent where to render
     */
    #parent;

    /**
     * This element.
     */
    #element;

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
        if (!this.#parent) {
            console.warn('Parent doesn\'t exist in ', name);
        }
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
                let component = list.filter((comp) => comp.name === this.#name);
                if (component.length !== 0) {
                    Actions.removeElementFromPage(this.#name);
                    unsubscribeFromAllStoresOnComponent(this.#name);
                    ContentStore.state[this.#name] = {};
                    // todo костыль
                    ContentStore.state[pageNames.FEED] = {};
                    this.unRender();

                    if (this.#name === componentsNames.FEED_CONTENT) {
                        component = list.filter((comp) => comp.name === componentsNames.MAIN);
                        if (component.length !== 0) {
                            Actions.removeElementFromPage(componentsNames.MAIN);
                            unsubscribeFromAllStoresOnComponent(componentsNames.MAIN);
                            const parent = ComponentsStore.checkWhereToPlace(componentsNames.MAIN);
                            parent.removeChild(document.querySelector(`.${componentsJSNames.MAIN}`));
                        }
                    }
                }
            },
            EventTypes.ON_REMOVE_ANOTHER_ITEMS,
            this.#name,
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
        this.#parent.innerHTML += this.#template(this.#config);
    }

    /**
     * UnRender component
     */
    unRender() {
        const element = document.getElementsByClassName(`${this.name}`)[0];
        if (!element) {
            console.error('bad remove in', this.name);
        } else {
            element.parentNode.removeChild(element);
        }
    }

    /** Set template to newTemplate */
    set template(newTemplate) {
        this.#template = newTemplate;
    }

    /**
     * HTML template filler
     * @returns {string} - element in string
     */
    HTML() {
        return this.#template(this.#config);
    }
}
