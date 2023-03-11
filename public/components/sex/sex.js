import { sexTempate as templateHtml } from './sex.hbs.js';

/**
 * Class for gender choose fields in forms.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class Sex {
    #parent;

    #config;

    /**
     * Create Sex component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Sex component
     * @param {object} config -- what config use to compule template
    */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * @description render Sex component in parent
    */
    render() {
        this.#parent.innerHTML = this.HTML();
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
