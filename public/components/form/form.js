import { FormFooter } from '../formFooter/formFooter.js';
import { Header } from '../Header/header.js';
import { Input } from '../input/input.js';
import templateHtml from './form.handlebars';
import { Sex } from '../sex/sex.js';
import { Date } from '../date/date.js';

/**
 * Class for artists content in main page.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json general fields.
 * @param {json} sexConf - Config with json fields for gender.
 * @param {json} dateConf - Config with json fields for date fields.
 */
export class Form {
    #parent;

    #config;

    #confSex;

    #confDate;

    /**
     *
     * @param {HTMLElement} parent -- html element where Form will be placed
     * @param {Object} config -- config for Form component
     * @param {Object} sexConf -- config for Sex component
     * @param {Object} dateConf -- config for date component
     */
    constructor(parent, config, sexConf = '', dateConf = '') {
        this.#parent = parent;
        this.#config = config;
        this.#confDate = dateConf;
        this.#confSex = sexConf;
    }

    /**
     *  @description render Form in parent element
     */
    render() {
        this.#parent.innerHTML = this.HTML();
        this.#parent.querySelector('.header-placement').innerHTML = this.#renderHeader();
        this.#parent.querySelector('.inputs-placement').innerHTML = this.#renderInputs();
        if (this.#confDate !== '') {
            this.#parent.querySelector('.form__placement-additionall').innerHTML += this.#renderDate();
        }

        if (this.#confSex !== '') {
            this.#parent.querySelector('.form__placement-additionall').innerHTML += this.#renderSex();
        }

        this.#parent.querySelector('.bottom-placement').innerHTML = this.#renderFooter();
    }

    /**
     * If cfg is given it will be used in compile template else inner config used
     * @param {Object} cfg -- config for form
     * @returns html string
     */
    HTML(cfg = '') {
        const template1 = templateHtml;
        if (cfg === '') {
            return template1(this.#config);
        }

        return template1(cfg);
    }

    /**
     * Return Footer component html
     * @returns html string
     */
    #renderFooter() {
        const footer = new FormFooter(this.#parent, this.#config);
        return footer.HTML(this.#config);
    }

    /**
     * Return Header component html
     * @returns html string
     */
    #renderHeader() {
        const head = new Header(this.#parent, this.#config);

        return head.HTML();
    }

    /**
     * Return Sex component html
     * @returns html string
    */
    #renderSex() {
        const sex = new Sex(this.#parent, this.#confSex);
        return sex.HTML(this.#confSex);
    }

    /**
     * Return Date component html
     * @returns html string
    */
    #renderDate() {
        const date = new Date(this.#parent, this.#confDate);
        return date.HTML(this.#confDate);
    }

    /**
     * Return Inputs elements html
     * @returns html string
    */
    #renderInputs() {
        let htmlInputs = '';
        for (const obj of this.#config.inputs) {
            const inp = new Input(this.#parent, obj);
            htmlInputs += inp.HTML(obj);
        }

        return htmlInputs;
    }
}
