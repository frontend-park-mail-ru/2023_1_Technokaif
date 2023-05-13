import { FormFooter } from '@smallComponents/formFooter/formFooter';
import { Header } from '@smallComponents/Header/header';
import { Input } from '@smallComponents/input/input';
import { Date } from '@smallComponents/date/date';
import { Button } from '@smallComponents/Button/button';
import templateHtml from './form.handlebars';

/**
 * Class for artists content in main page.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json general fields.
 * @param {json} dateConf - Config with json fields for date fields.
 */
export class Form {
    #parent;

    #config;

    #insertedElement;

    #confDate;

    /**
     *
     * @param {HTMLElement} parent -- html element where Form will be placed
     * @param {Object} config -- config for Form component
     * @param {Object} dateConf -- config for date component
     */
    constructor(parent, config, dateConf = {}) {
        this.#parent = parent;
        this.#config = config;
        this.#confDate = dateConf;
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
        if (this.#confDate) {
            const element: HTMLElement|null = this.#insertedElement.querySelector('.form__placement-additionall');
            if (element) {
                element.innerHTML += this.#renderDate();
            } else {
                console.error('Error in render additional');
            }
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
            return footer.HTML();
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
     * Return Date component html
     * @returns html string
    */
    #renderDate() {
        const date = new Date(this.#parent, this.#confDate);
        return date.HTML();
    }

    /**
     * Return Inputs elements html
     * @returns html string
    */
    #renderInputs() {
        let htmlInputs = '';
        for (const obj of this.#config.inputs) {
            const inp = new Input(this.#parent, obj);
            htmlInputs += inp.HTML();
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
