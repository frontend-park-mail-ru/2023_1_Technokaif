import { redirect } from '../../modules/redirects.js';
import { sidebarConfig } from '../../utils/config/config.js';
import { menuTemplate as templateHtml } from './menu.hbs.js';

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

    constructor(parent, config, name) {
        this.#parent = parent;
        this.#config = config;
        this.#name = name;
    }

    get config() {
        return this.#config;
    }

    set config(value) {
        this.#config = value;
    }

    get items() {
        return Object.entries(this.#config).map(([key, value]) => ({
            key,
            ...value,
        }));
    }

    callEventListener() {
        this.#parent.addEventListener('click', (e) => {
            if (e.target instanceof HTMLAnchorElement) {
                e.preventDefault();

                const { section } = e.target.dataset;
                redirect(sidebarConfig[section]);
            }
        });
    }

    render() {
        const items = this.#translateToItems(this.#config);
        items.name = this.#name;

        const template = Handlebars.compile(templateHtml);
        const templateInnerHtml = template(items);
        this.#parent.innerHTML += templateInnerHtml;

        this.callEventListener();
    }

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
