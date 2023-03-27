import { Tape } from '../Tape/tape';
import templateHtml from './mainWindow.handlebars';
import { homeSetup } from '../../pages/home/homeSetup.js';

import './mainWindow.less';

/**
 * Class for main page content
 * @param {HTMLElement} parent -- where to place Home page
 * @param {*} items -- content of page
 */
export class MainWindowContent {
    #parent;

    #configs;

    /**
     * Create MainWindowContent component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place MainWindowContent
     * @param {object} config -- what config use to compule template
     */
    constructor(parent, configs) {
        this.#parent = parent;
        this.#configs = configs;
    }

    /**
     * @description render MainWindowContent in parent
     */
    render() {
        this.#parent.innerHTML = this.HTML();
        const insertBlock = this.#parent.querySelector('.main-page-window');

        insertBlock.innerHTML = '';
        this.#configs.forEach(configForInsertElement => {
            const tape = new Tape(insertBlock, configForInsertElement)
            insertBlock.innerHTML+= tape.HTML();
        });
    }

    /**
     * If cfg is given then return compiled template with cfg else with inner config
     * @param {object} cfg -- external configure object
     * @returns Html string of template to place
     */
    HTML() {
        return templateHtml(this.#config);
    }

    
}

/**
 * Create HomePageContent
 * @param {HTMLElement} parent -- where to render
 * @param {Object} items -- what items to render
 */
export function createHomePageContent(parent, items) {
    const mainPage = new MainWindowContent(parent, homeSetup(items));
    mainPage.render();
}
