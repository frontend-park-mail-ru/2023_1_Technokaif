import templateHtml from './header.handlebars';

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
        const template1 = templateHtml;
        this.#parent.innerHTML = template1(this.#config);
    }

    // todo delete cfg input in html
    /**
     * If cfg is given then return compiled template with cfg else with inner config
     * @param {object} cfg -- external configure object
     * @returns Html string of template to place
    */
    HTML(cfg = '') {
        const template1 = templateHtml;
        if (cfg === '') {
            console.log('Head');
            console.log(template1);
            console.log('cfg = ', this.#config);
            console.log('out = ', template1(this.#config));
            return templateHtml(this.#config);
        }
        return template1(cfg);
    }
}
