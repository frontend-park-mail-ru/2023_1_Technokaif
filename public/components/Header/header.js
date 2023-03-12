import { headerTemplate as templateHtml } from './header.hbs.js';

/**
 * Class for header in login and registration.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class Header {
    #parent;

    #config;

    /**
     * Create Header component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Album
     * @param {object} config -- what config use to compule template
    */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * @description render Album in parent
    */
    render() {
        const template1 = Handlebars.compile(templateHtml);
        this.#parent.innerHTML = template1(this.#config);
    }

    /**
     * If cfg is given then return compiled template with cfg else with inner config
     * @param {object} cfg -- external configure object
     * @returns Html string of template to place
    */
    HTML(cfg = '') {
        const template1 = Handlebars.compile(templateHtml);
        if (cfg === '') {
            return template1(cfg);
        }

        return template1(this.#config);
    }
}
