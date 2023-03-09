import { tracksTemplate as templateHtml } from './TracksComp.hbs.js';

/**
 * Class for tracks content in main page.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class TracksComp {
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
        // eslint-disable-next-line no-undef
        const template = Handlebars.compile(templateHtml);
        this.#parent.innerHTML = template(this.#config);
    }

    HTML(cfg = '') {
        // eslint-disable-next-line no-undef
        const template = Handlebars.compile(templateHtml);
        if (cfg === '') {
            return template(cfg);
        }

        return template(this.#config);
    }
}
