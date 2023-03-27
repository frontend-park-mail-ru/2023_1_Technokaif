/**
 * Base View class to handle render functions.
 */
export default class BaseView {
    #parent;

    #config;

    /**
     * Create BaseView. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place MainWindowContent
     * @param {object} config -- what config use to compile template
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render() {

    }
}
