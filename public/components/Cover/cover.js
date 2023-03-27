import templateHtml from './cover.handlebars';

/**
 * Create element with image and text below. Inside text: title, description, footer
 */
export class Cover {
    /**
     * Where to render
     */
    #parent;

    /**
     * What config use to template
     */
    #config;

    /**
     * Create Cover component.
     * @param {HTMLElement} parent - place where to render
     * @param {JSON} config - to template
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Render component inside parent
     */
    render() {
        const template = templateHtml;
        this.#parent.innerHTML = template(this.#config);
    }

    /**
     * HTML text of component
     * @returns {string} - element in string format
     */
    HTML() {
        return templateHtml(this.#config);
    }
}
