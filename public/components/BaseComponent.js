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
        this.#name = name;
        this.#config = config;
        this.#template = template;
    }

    /**
     * Getter of element
     * @returns {*}
     */
    get element() {
        return this.#element;
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

    }

    /**
     * Render element in parent. Clear parent before.
     */
    render() {
        this.#subscribeAll();
        this.#parent.innerHTML = this.#template(this.#config);
        this.#element = document.querySelector(`.${this.name}`);
    }

    /** Append element to parent without clearing it */
    appendElement() {
        this.#subscribeAll();
        this.#parent.innerHTML += this.#template(this.#config);
        this.#element = document.querySelector(`.${this.name}`);
    }

    /**
     * UnRender component
     */
    unRender() {
        this.#parent.removeChild(this.#element);
    }

    /**
     * HTML template filler
     * @returns {string} - element in string
     */
    HTML() {
        return this.#template(this.#config);
    }
}
