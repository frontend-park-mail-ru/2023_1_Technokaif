import { sexTempate as templateHtml } from './sex.hbs.js';

/**
 * Class for gender choose fields in forms.
 */
export class Sex {
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
        this.#parent.innerHTML = this.HTML();
    }

    HTML(cfg = '') {
        const template1 = Handlebars.compile(templateHtml); // eslint-disable-line
        if (cfg === '') {
            return template1(cfg);
        }

        return template1(this.#config);
    }
}
