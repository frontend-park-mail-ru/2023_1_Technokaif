class Navbar {
    #parent
    #config
    #name

    constructor(parent, config, name) {
        this.#parent = parent;
        this.#config = config;
        this.#name = name;
    }

    get items() {
        return Object.entries(this.#config).map(([key, value]) => ({
            key,
            ...value
        }))
    }

    render() {
        this.items.map(({key, href, name, type}, index) => {
            const div = document.createElement('div');
            const contentElement = document.createElement(type);

            contentElement.textContent = name;
            contentElement.href = href;
            contentElement.dataset.section = key;
            div.classList.add(`${this.#name}__item`);
            if (index === 0) {
                contentElement.classList.add('active');
            }
            div.appendChild(contentElement);

            return div;
        }).forEach((e) => this.#parent.appendChild(e));
    }
}

export default Navbar;
