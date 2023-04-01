import { Tape } from '../Tape/tape';
import templateHtml from './mainWindow.handlebars';
import { homeSetup } from '../../utils/setup/homeSetup.js';

import './mainWindow.less';

/**
 * Create MainWindow content with tapes
 */
export class MainWindowContent {
    /**
     * Parent where to render
     */
    #parent;

    /**
     * Config to use in tapes
     */
    #configs;

    /**
     * Config to use in mainWindow
     */
    #config;

    /**
     * Create MainWindowContent component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place MainWindowContent
     * @param configForMenu
     * @param configsForElements
     */
    constructor(parent, configForMenu, configsForElements) {
        this.#parent = parent;
        this.#configs = configsForElements;
        this.#config = configForMenu;
    }

    /**
     * @description render MainWindowContent in parent
     */
    render() {
        this.#parent.innerHTML = this.HTML();
        const insertBlock = this.#parent.querySelector('.main-page-window');

        this.#configs.forEach((configForInsertElement) => {
            const tape = new Tape(insertBlock, configForInsertElement);
            insertBlock.innerHTML += tape.HTML();
        });
    }

    /**
     * If cfg is given then return compiled template with cfg else with inner config
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
