import { Footer } from '../footer/footer.js';
import { Header } from '../Header/header.js';
import { Input } from '../input/input.js';
import { formTemplate as templateHtml } from './form.hbs.js';
import { Sex } from '../sex/sex.js';
import { Date } from '../date/date.js';
export class Form {
    #parent;
    #config;
    #confSex;
    #confDate;

    constructor (parent, config, sexConf = '', dateConf = '') {
        this.#parent = parent;
        this.#config = config;
        this.#confDate = dateConf;
        this.#confSex = sexConf;
    }

    get config () {
        return this.#config;
    }

    render () {
        this.#parent.innerHTML = this.HTML();
        this.#parent.querySelector('.header-placement').innerHTML = this.#renderHeader();
        this.#parent.querySelector('.inputs-placement').innerHTML = this.#renderInputs();

        if (this.#confDate !== '') {
            this.#parent.querySelector('.inputs-placement').innerHTML += this.#renderDate();
        }

        if (this.#confSex !== '') {
            this.#parent.querySelector('.inputs-placement').innerHTML += this.#renderSex();
        }

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

    #renderSex () {
        const sex = new Sex(this.#parent, this.#confSex);
        return sex.HTML(this.#confSex);
    }

    #renderDate () {
        const date = new Date(this.#parent, this.#confDate);
        return date.HTML(this.#confDate);
    }

    #renderInputs () {
        let htmlInputs = '';
        for (const obj of this.#config.inputs) {
            const inp = new Input(this.#parent, obj);
            htmlInputs += inp.HTML(obj);
        }

        return htmlInputs;
    }
}
