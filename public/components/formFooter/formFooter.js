import { footerTemplate as templateHtml } from './formFooter.hbs.js';

/**
 * Class for next to form content(buttons...).
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class FormFooter {
    #parent;

    #config;

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    get config() {
        return this.#config;
    }

    render() {
        const template1 = Handlebars.compile(templateHtml); // eslint-disable-line
        this.#parent.innerHTML = template1(this.#config);
    }

    HTML(cfg = '') {
        const template1 = Handlebars.compile(templateHtml); // eslint-disable-line
        if (cfg === '') {
            return template1(cfg);
        }

        return template1(this.#config);
    }
}
