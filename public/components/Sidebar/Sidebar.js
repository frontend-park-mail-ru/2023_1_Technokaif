export class Sidebar {
    #parent
    #config

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = parent;
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
            ...value
        }))
    }

    render() {
        this.items.map(({key, href, name}, index) => {
            const sideBarElement = document.createElement('a');
            sideBarElement.textContent = name;
            sideBarElement.href = href;
            sideBarElement.dataset.section = key;
            sideBarElement.classList.add('menu__item')

            if (index === 0) {
                sideBarElement.classList.add('active');
            }

            return sideBarElement;
        }).forEach((e) => this.#parent.appendChild(e));
    }
}
