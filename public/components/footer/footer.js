import { footerTemplate as templateHtml } from './footer.hbs.js';

export class Footer {
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
        const template1 = Handlebars.compile(templateHtml); // eslint-disable-line
        this.#parent.innerHTML = template1(this.#config);
    }

    HTML (cfg = '') {
        const template1 = Handlebars.compile(templateHtml); // eslint-disable-line
        if (cfg === '') {
            return template1(cfg);
        }

        return template1(this.#config);
    }
}
