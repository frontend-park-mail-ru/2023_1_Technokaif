import { redirect } from '../../modules/redirects.js';
import { authNavConfig, unAuthNavConfig } from '../../utils/config.js';
import { checkAuth } from '../../utils/checkAuth.js';

class Navbar {
    #parent;
    #config;
    #name;

    constructor (parent, config, name) {
        this.#parent = parent;
        this.#config = config;
        this.#name = name;
    }

    get items () {
        return Object.entries(this.#config).map(([key, value]) => ({
            key,
            ...value
        }));
    }

    callEventListener () {
        document.getElementById('cont').addEventListener('click', (e) => {
            console.log(this.#parent);
            if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) {
                e.preventDefault();

                const { section } = e.target.dataset;
                if (checkAuth()) {
                    redirect(authNavConfig[section]);
                } else {
                    redirect(unAuthNavConfig[section]);
                }
            }
        });
    }

    render () {
        this.items.map(({ key, href, name, type, logoSrc }, index) => {
            const div = document.createElement('div');
            const contentElement = document.createElement(type);

            contentElement.textContent = name;
            contentElement.href = href;
            contentElement.dataset.section = key;
            div.classList.add(`${key}__${this.#name}__item`);
            if (index === 0) {
                contentElement.classList.add('active');
            }

            if (key === 'registration') {
                const verticalLine = document.createElement('div');
                div.appendChild(verticalLine);
                verticalLine.classList.add('border-left');
            }

            if (logoSrc !== undefined) {
                contentElement.href = logoSrc;
            }

            div.appendChild(contentElement);

            return div;
        }).forEach((e) => this.#parent.appendChild(e));

        this.callEventListener();
    }
}

export default Navbar;
