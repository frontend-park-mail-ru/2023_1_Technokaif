import IStore from './IStore';
import ActionTypes from '../actions/ActionTypes';

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

    /**
     * Function to handle dispatcher behaviour.
     * @param action
     */
    dispatch(action) {
        super.dispatch();

        switch (action.type) {
        case ActionTypes.CHECK_WHAT_RENDER:
            this.#checkElementsForPage(action.name);
            break;
        case ActionTypes.ADD_COMPONENT_ON_PAGE:
            this.#addElementOnPage(action.name);
            break;
        default:
            console.error('invalid action in componentsStore');
        }
    }

    /**
     * Function to check position to place element.
     * @param elementName
     * @returns {Element}
     */
    checkWhereToPlace(elementName) {
        switch (elementName) {
        case componentsNames.NAVBAR:
            return document.querySelector('.cont');
        case componentsNames.SIDEBAR:
            return document.querySelector('.main-page-window__factBody');
        case componentsNames.MAIN_PAGE_WINDOW:
            return document.querySelector('#main');
        default:
            console.error('position to place element by name', elementName, 'not found');
            return document.querySelector('#root');
        }
    }

    /**
     * Function to clear #whatExistOnPage field.
     */
    #clearAllElements() {
        this.#whatExistOnPage = [];
    }

    /**
     * Add element in local and state variables.
     * @param element
     */
    #addElementOnPage(element) {
        this.#whatExistOnPage.push(element);
        this.addNewItem(this.#whatExistOnPage);
    }

    /**
     * Register the page and it's requirement.
     * @param {string} nameOfPage - name of Page
     * @param {Array} requiredElements - json with names of needed
     */
    register(nameOfPage, requiredElements) {
        this.#whatNeedForPage.push({ page: nameOfPage, namesOfElements: requiredElements });
        this.addNewItem(this.#whatNeedForPage);
    }

    /**
     * Check what elements we need to render and emit callbacks to render.
     * @param pageName
     */
    #checkElementsForPage(pageName) {
        const page = this.#whatNeedForPage.find((element) => element.page === pageName);

        const notExist = [];
        page.namesOfElements.forEach((element) => {
            const existOnPage = this.#whatExistOnPage.find(element);

            if (existOnPage === undefined) {
                notExist.push(element);
            }
        });

        if (notExist !== []) {
            this.jsEmit(EventTypes.ON_NOT_RENDERED_ITEMS, notExist);
        }
    }

    /**
     * Function to check if we need to create a
     * @param pageName
     * @returns {boolean}
     */
    prePageNeed(pageName) {
        return !(pageName === pageNames.LOGIN || pageName === pageNames.REGISTER);
    }
}

export default new ComponentsStore();
