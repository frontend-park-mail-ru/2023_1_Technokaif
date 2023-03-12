import { artistsTemplate as templateHtml } from './ArtistsComp.hbs.js';

/**
 * Class for artists content in main page.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class ArtistsComp {
    #parent;

    #config;

    /**
     * Create Artist component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Album
     * @param {object} config -- what config use to compule template
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * @description render Artist in parent
     */
    render() {
        const template = Handlebars.compile(templateHtml);
        this.#parent.innerHTML = template(this.#config);
    }

    /**
     * If cfg is given then return compiled template with cfg else with inner config
     * @param {object} cfg -- external configure object
     * @returns Html string of template to place
    */
    HTML(cfg = '') {
        const template = Handlebars.compile(templateHtml);
        if (cfg === '') {
            return template(cfg);
        }

        return template(this.#config);
    }
}
