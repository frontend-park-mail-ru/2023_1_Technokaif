import Router from '../../router/Router';
import templateHtml from './menu.handlebars';

/**
 * Class for Menu: Home, Search, Library, Create Playlist, Liked Songs.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 * @param {string} name - Name using in classes.
 */
class Menu {
    #parent;

    #config;

    #name;

    /**
     *
     * @param {HTMLElement} parent -- where to place component
     * @param {Object} config -- config to compile template
     * @param {string} name -- name of Component
     */
    constructor(parent, config, name) {
        this.#parent = parent;
        this.#config = config;
        this.#name = name;
    }

    /**
     * @returns all entries in config
     */
    get items() {
        return Object.entries(this.#config).map(([key, value]) => ({
            key,
            ...value,
        }));
    }

    /**
     * add event listener to component. On 'click' redirect to section on dataset
     */
    callEventListener() {
        this.#parent.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target instanceof HTMLAnchorElement) {
                const { section } = e.target.dataset;
                Router.go(this.#config[section].href);
            }
        });
    }

    /**
     * Render component in parent element
     */
    render() {
        const items = this.#translateToItems(this.#config);
        items.name = this.#name;

        const template = templateHtml;
        const templateInnerHtml = template(items);
        this.#parent.innerHTML += templateInnerHtml;

        this.callEventListener();
    }

    /**
     * Get all Items from lastCfg and returns in object
     * @param {config} lastCfg -- config where search items
     * @returns newCfg -- items
     */
    #translateToItems(lastCfg) {
        const newcfg = { items: [] };
        for (const obj in lastCfg) {
            const tmpItem = {};

            for (const property in lastCfg[obj]) {
                tmpItem[property] = lastCfg[obj][property];
            }

            newcfg.items.push(tmpItem);
        }

        return newcfg;
    }
}

export default Menu;
