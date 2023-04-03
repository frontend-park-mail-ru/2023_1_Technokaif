import { Header } from '../Header/header.js';
import templateHtml from './headerWithButton.handlebars';
import { Button } from '../Button/button';

import './headerWithButton.less';

/**
 * Class for not found content in main page.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json general fields.
 */
export class HeaderWithButton {
    #parent;

    #config;

    /**
     *
     * @param {HTMLElement} parent -- html element where Form will be placed
     * @param {Object} config -- config for Form component
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     *  @description render component in parent element
     */
    render() {
        this.#parent.innerHTML = this.HTML();
        this.#parent.querySelector('.header-placement').innerHTML = this.#renderHeader();
        this.#parent.querySelector('.button-placement').innerHTML = this.#renderButton();
    }

    /**
     * If cfg is given it will be used in compile template else inner config used
     * @param {Object} cfg -- config for form
     * @returns html string
     */
    HTML(cfg = '') {
        const template = templateHtml;
        if (cfg === '') {
            return template(this.#config);
        }

        return template(cfg);
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
     * Return button element html
     * @returns html string
     */
    #renderButton() {
        const submitButton = new Button(this.#parent, this.#config);

        return submitButton.HTML();
    }
}
