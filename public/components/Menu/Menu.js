import { createDivAndInsertInParent } from '../../utils/utils.js';

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

    render () {
        const logoDiv = createDivAndInsertInParent(this.#parent, 'logo');
        logoDiv.innerHTML += '<h1>Fluire</h1><hr>';
        this.items.map(({ key, href, name }, index) => {
            const div = document.createElement('div');
            const element = document.createElement('a');

            element.textContent = name;
            element.href = href;
            element.dataset.section = key;
            div.classList.add(`${this.#name}__item`);

            if (index === 0) {
                element.classList.add('active');
            }
            div.appendChild(element);

            return div;
        }).forEach((e) => this.#parent.appendChild(e));
    }
}

export default Menu;
