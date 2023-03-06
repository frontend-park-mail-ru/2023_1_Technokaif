import { tracksTemplate as templateHtml } from './TracksComp.hbs.js';

/**
 * Class for tracks content in main page.
 */
export class TracksComp {
    #parent;
    #config;

    constructor (parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    get config () {
        return this.#config;
    }

    render () {
        const template = Handlebars.compile(templateHtml);
        this.#parent.innerHTML = template(this.#config);
    }

    HTML (cfg = '') {
        const template = Handlebars.compile(templateHtml);
        if (cfg === '') {
            return template(cfg);
        }

        return template(this.#config);
    }
}
