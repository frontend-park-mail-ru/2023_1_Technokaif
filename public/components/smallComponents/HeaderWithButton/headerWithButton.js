import { Header } from '../Header/header.js';
import templateHtml from './headerWithButton.handlebars';
import { Button } from '../Button/button';

import './headerWithButton.less';
import Router from '../../../router/Router';
import ComponentsStore from '../../../stores/ComponentsStore';
import Actions from '../../../actions/Actions';
import unsubscribeFromAllStoresOnComponent from '../../../utils/functions/unsubscribeFromAllStores';
import { EventTypes } from '../../../utils/config/EventTypes';
import { componentsNames } from '../../../utils/config/componentsNames';
import { componentsJSNames } from '../../../utils/config/componentsJSNames';

/**
 * Class for not found content in main page.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json general fields.
 */
export class HeaderWithButton {
    #parent;

    #config;

    #name;

    /**
     *
     * @param {HTMLElement} parent -- html element where Form will be placed
     * @param {Object} config -- config for Form component
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
        this.#name = componentsNames.PAGE404;
    }

    /**
     * Function to subscribe Routing links to feed by logo and button
     */
    #subscribeComponents() {
        ComponentsStore.subscribe(
            (list) => {
                const component = list.filter((comp) => comp.name === this.#name);
                if (component.length !== 0) {
                    component.forEach((element) => {
                        Actions.removeElementFromPage(element.name);
                    });

                    unsubscribeFromAllStoresOnComponent(this.#name);
                    this.unRender();
                }
            },
            EventTypes.ON_REMOVE_ANOTHER_ITEMS,
            this.#name,
        );

        const header = document.querySelector('.header');
        header.addEventListener('click', (event) => {
            event.preventDefault();
            Router.go('/');
        });

        const button = document.querySelector('.primary');
        button.addEventListener('click', (event) => {
            event.preventDefault();
            Router.go('/');
        });
    }

    /**
     *  @description render component in parent element
     */
    render() {
        this.#parent.innerHTML = this.HTML();
        this.#parent.querySelector('.header-placement').innerHTML = this.#renderHeader();
        this.#parent.querySelector('.button-placement').innerHTML = this.#renderButton();
        this.#subscribeComponents();
    }

    /**
     * Function using to unrender component
     */
    unRender() {
        const element = document.querySelector(`.${componentsJSNames.PAGE404}`);
        if (!element) {
            console.error('Error while unRendering of page404');
            return;
        }
        this.#parent.removeChild(element);
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
