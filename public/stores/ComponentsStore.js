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

    #checkElementsForPage(pageName) {
        const page = this.#whatNeedForPage.find((element) => element.page === pageName);

        const notExist = [];
        page.namesOfElements.forEach((element) => {
            const existOnPage = this.#whatExistOnPage.find(element);

            if (!existOnPage) {
                notExist.push(element);
            }
        });

        this.jsEmit(EventTypes.ON_NOT_RENDERED_ITEMS, notExist);
    }
}

export default new ComponentsStore();
