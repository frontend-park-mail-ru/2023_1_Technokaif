import { FormFooter } from '../../smallComponents/formFooter/formFooter.js';
import { Header } from '../../smallComponents/Header/header.js';
import { Input } from '../../smallComponents/input/input.js';
import templateHtml from './form.handlebars';
import { Sex } from '../../smallComponents/sex/sex.js';
import { Date } from '../../smallComponents/date/date.js';
import { Button } from '../../smallComponents/Button/button';

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

    #insertedElement;

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
        this.#insertedElement = null;
    }

    /**
     *  @description render Form in parent element
     */
    render() {
        this.#parent.innerHTML += this.HTML();
        this.#insertedElement = this.#parent.querySelector(`.${this.#config.content}`);
        this.#insertedElement.querySelector('.header-placement').innerHTML = this.#renderHeader();
        this.#insertedElement.querySelector('.inputs-placement').innerHTML = this.#renderInputs();
        if (this.#confDate !== '') {
            this.#insertedElement.querySelector('.form__placement-additionall').innerHTML += this.#renderDate();
        }

        if (this.#confSex !== '') {
            this.#insertedElement.querySelector('.form__placement-additionall').innerHTML += this.#renderSex();
        }

        if (this.#config['bottom-placement']) {
            this.#insertedElement.querySelector('.button-placement').innerHTML = this.#renderButton();
            this.#insertedElement.querySelector('.bottom-placement').innerHTML = this.#renderFooter();
        }
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
        if (this.#config.bottomClass) {
            const footer = new FormFooter(this.#parent, this.#config);
            return footer.HTML(this.#config);
        }
        return '';
    }

    /**
     * Return Header component html
     * @returns html string
     */
    #renderHeader() {
        if (this.#config.formHeader) {
            const head = new Header(this.#parent, this.#config);
            return head.HTML();
        }
        return '';
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

    /**
     * Return button element html
     * @returns html string
     */
    #renderButton() {
        const submitButton = new Button(this.#parent, this.#config);
        return submitButton.HTML();
    }
}
