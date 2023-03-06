import { redirect } from '../../modules/redirects.js';
import { sidebarConfig } from '../../utils/config/config.js';
import { menuTemplate as templateHtml } from './menu.hbs.js';

class Menu {
    #parent;
    #config;
    #name;

    constructor (parent, config, name) {
        this.#parent = parent;
        this.#config = config;
        this.#name = name;
    }

    get config () {
        return this.#config;
    }

    set config (value) {
        this.#config = value;
    }

    get items () {
        return Object.entries(this.#config).map(([key, value]) => ({
            key,
            ...value
        }));
    }

    callEventListener () {
        this.#parent.addEventListener('click', (e) => {
            if (e.target instanceof HTMLAnchorElement) {
                e.preventDefault();

                const { section } = e.target.dataset;
                redirect(sidebarConfig[section]);
            }
        });
    }

    render () {
        const items = this.#translateToItems(this.#config);
        items.name = this.#name;

        const template= Handlebars.compile(templateHtml); // eslint-disable-line
        const templateInnerHtml = template(items);
        this.#parent.innerHTML += templateInnerHtml;

        this.callEventListener();
    }

    #translateToItems (lastCfg) {
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
