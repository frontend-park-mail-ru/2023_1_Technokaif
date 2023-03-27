import './tape.less';
import templateHTML from './tape.handlebars';

/**
 * Tape for elements
 */
export class Tape {
    /**
     * Where elements will be rendered
     */
    #parent;

    /**
     * What config use for template
     */
    #config;

    /**
     * Create Track component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Track
     * @param {object} config -- what config use to compule template
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Render tape in parent
     */
    render() {
        this.#parent.innerHTML = templateHTML(this.#config);
    }

    /**
     * Create html representation of tape
     * @returns {string} - element in string
     */
    HTML() {
        return templateHTML(this.#config);
    }
}
