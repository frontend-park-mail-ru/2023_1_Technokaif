import IStore from './IStore';

/**
 * Store for components.
 */
class ComponentsStore extends IStore {
    /**
     * JSON
     * page: 'nameOfPage',
     * need: [namesOfElements],
     */
    #whatNeedForPage;

    /**
     * Array of elements on page
     */
    #whatExistOnPage;

    /**
     * Constructor for ComponentsStore.
     */
    constructor() {
        super('ComponentsStore');
        this.#whatExistOnPage = [];
    }

    dispatch(action) {
        super.dispatch();

        switch ()
    }

    /**
     * Function to check the existence of element.
     * @param elementName
     * @returns {boolean}
     */
    checkElementExist(elementName) {
        return document.querySelector(elementName) !== null;
    }

    /**
     * Function to check position to place element.
     * @param elementName
     * @returns {Element}
     */
    checkWhereToPlace(elementName) {
        switch (elementName) {
        case 'js__navbar':
            return document.querySelector('.cont');
        case 'js__sidebar':
            return document.querySelector('.main-page-window__factBody');
        case 'js__main-page-window':
            return document.querySelector('#main');
        default:
            console.error('position to place element by name', elementName, 'not found');
            return document.querySelector('#root');
        }
    }

    clearAllElements() {
        this.#whatExistOnPage = [];
    }

    addElementOnPage(element) {
        this.#whatExistOnPage.push(element);
    }

    /**
     * Register page and it's requirement
     * @param {string} nameOfPage - name of Page
     * @param {Array} requiredElements - json with names of needed
     */
    register(nameOfPage, requiredElements) {
        this.#whatNeedForPage.push({ nameOfPage, requiredElements });
    }

    checkElementsForPage(pageName) {
        const page = this.#whatNeedForPage.find((element) => element.page === pageName);

        const notExist = [];
        page.namesOfElements.forEach((element) => {
            const existOnPage = this.#whatExistOnPage.find(element);

            if (!existOnPage) {
                notExist.push(element);
            }
        });

        // тут emit с тем, что не существует
        // exapmle of js
        /*
            {
                nameOfPage: name,
                notExist: [strigns]
            }

        */
    }
}

export default new ComponentsStore();
