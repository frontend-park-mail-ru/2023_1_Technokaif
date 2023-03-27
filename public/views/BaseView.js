/**
 * Base View class to handle render functions.
 */
export class BaseView {
    /**
     * Parent where to render
     */
    #parent;

    /**
     * Config to put in template
     */
    #config;

    /**
     * Template to create
     */
    #template;

    /**
     * Create BaseView. Empty innerHtml before placement
     * @param {HTMLElement} parent - where to place MainWindowContent
     * @param {JSON} config - what config use to compile template
     * @param {function} template - template to create elements
    */
    constructor(parent, config, template) {
        this.#parent = parent;
        this.#config = config;
        this.#template = template;
    }

    /**
     * Render element in parent. Clear parent before.
     */
    render() {
        this.#parent.innerHTML = this.#template(this.#config);
    }

    /**
     * HTML template filler
     * @returns {string} - element in string
     */
    HTML() {
        return this.#template(this.#config);
    }
}
