// import { albumsTemplate as templateHtml } from './AlbumsComp.hbs.js';
import templateHtml from './AlbumsComp.handlebars';
// const templateHtml = require('./AlbumsComp.handlebars');

/**
 * Class for albums content in main page.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class AlbumsComp {
    #parent;

    #config;

    /**
     * Create Albums component. Empty innerHtml before placement
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
        const template = templateHtml;
        this.#parent.innerHTML = template(this.#config);
    }

    /**
     * If cfg is given then return compiled template with cfg else with inner config
     * @param {object} cfg -- external configure object
     * @returns Html string of template to place
     */
    HTML(cfg = '') {
        const template = templateHtml;
        if (cfg === '') {
            return template(cfg);
        }

        return template(this.#config);
    }
}
