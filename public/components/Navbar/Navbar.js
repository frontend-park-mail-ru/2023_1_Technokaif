import { redirect } from '../../modules/redirects.js';
import { authNavConfig, unAuthNavConfig } from '../../utils/config/config.js';
import { checkAuth } from '../../utils/functions/checkAuth.js';

/**
 * Class for Navbar element: Login, Registration, Logout and user info.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 * @param {string} name - Name using in classes.
 */
class Navbar {
    #parent;

    #config;

    #name;

    /**
     *
     * @param {HTMLElement} parent -- where to place
     * @param {Object} config -- config to configure Navbar
     * @param {string} name -- name of Navbar
     */
    constructor(parent, config, name) {
        this.#parent = parent;
        this.#config = config;
        this.#name = name;
    }

    /**
     * Returns all entries of config
     */
    get items() {
        return Object.entries(this.#config).map(([key, value]) => ({
            key,
            ...value,
        }));
    }

    /**
     * Add event listener to component. If HTMLAnchorElement or HTMLButtonElement was 'clicked'
     * then redirect to section in dataset of element
     */
    callEventListener() {
        document.getElementById('cont').addEventListener('click', (e) => {
            e?.preventDefault?.();
            if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) {
                const { section } = e.target.dataset;
                if (section) {
                    if (checkAuth()) {
                        redirect(authNavConfig[section]);
                    } else {
                        redirect(unAuthNavConfig[section]);
                    }
                }
            }
        });
    }

    /**
     * Render Navbar element in parent
     */
    render() {
        this.items.map(({
            key, href, name, type, logoSrc,
        }, index) => {
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
