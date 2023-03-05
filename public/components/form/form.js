import { Footer } from '../footer/footer.js';
import { Header } from '../Header/header.js';
import { Input } from '../input/input.js';
import { formTemplate as templateHtml } from './form.hbs.js';

export class Form {
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
        this.#parent.querySelector('.header-placement').innerHTML = this.#renderHeader();
        this.#parent.querySelector('.inputs-placement').innerHTML = this.#renderInputs();
        this.#parent.querySelector('.bottom-placement').innerHTML = this.#renderFooter();
    }

    HTML (cfg = '') {
        const template1 = Handlebars.compile(templateHtml);
        if (cfg === '') {
            return template1(this.#config);
        }

        return template1(cfg);
    }

    #renderFooter () {
        const footer = new Footer(this.#parent, this.#config);
        return footer.HTML(this.#config);
    }

    #renderHeader () {
        const head = new Header(this.#parent, this.#config);
        return head.HTML(this.#config);
    }

    #renderInputs () {
        let htmlInputs = '';
        for (const obj of this.#config.inputs) {
            const inp = new Input(this.#parent, obj);
            htmlInputs += inp.HTML(obj);
        }
        console.log(htmlInputs);
        return htmlInputs;
    }
}
