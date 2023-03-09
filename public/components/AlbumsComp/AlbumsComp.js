import { albumsTemplate as templateHtml } from './AlbumsComp.hbs.js';

/**
 * Class for albums content in main page.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class AlbumsComp {
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
        const template = Handlebars.compile(templateHtml);
        this.#parent.innerHTML = template(this.#config);
    }

    HTML(cfg = '') {
        const template = Handlebars.compile(templateHtml);
        if (cfg === '') {
            return template(cfg);
        }

        return template(this.#config);
    }
}
