import { inputTemplate as templateHtml } from './input.hbs.js';

export class Input {
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
        this.#parent.innerHTML = this.HTML();
    }

    HTML (cfg = '') {
        const template1 = Handlebars.compile(templateHtml);
        if (cfg === '') {
            return template1(cfg);
        }

        return template1(this.#config);
    }
}
