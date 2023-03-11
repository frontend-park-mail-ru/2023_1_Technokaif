import { dateTemplate as templateHtml } from './date.hbs.js';

/**
 * Class for date fields manipulations.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class Date {
    #parent;

    #config;

    /**
     * Create Date component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Date
     * @param {object} config -- what config use to compule template
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * @description render Date in parent
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
