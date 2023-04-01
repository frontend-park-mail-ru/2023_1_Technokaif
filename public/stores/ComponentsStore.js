import IStore from './IStore';
import ActionTypes from '../actions/ActionTypes';
import { EventTypes } from './EventTypes';
import { componentsNames } from '../utils/config/ComponentsNames';
import { pageNames } from '../utils/config/pageNames';

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
     * Array of all various elements
     */
    #allElements;

    /**
     * Constructor for ComponentsStore.
     */
    constructor() {
        super('ComponentsStore');
        this.#whatExistOnPage = [];
        this.#whatNeedForPage = [];
        this.#allElements = [];
    }

    /**
     * Function to handle dispatcher behaviour.
     * @param action
     */
    dispatch(action) {
        super.dispatch();

        switch (action.type) {
        case ActionTypes.CHECK_WHAT_RENDER:
            console.log('in components store');
            this.#checkElementsForPage(action.name);
            break;
        case ActionTypes.ADD_COMPONENT_ON_PAGE:
            this.#addElementOnPage(action.name);
            break;
        case ActionTypes.REMOVE_COMPONENT_FROM_PAGE:
            this.#removeElementFromPage(action.name);
            break;
        default:
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
            return document.querySelector('.navbar');
        case componentsNames.SIDEBAR:
            return document.querySelector(`.${componentsNames.SIDEBAR}`);
        case componentsNames.MAIN_PAGE_WINDOW:
            return document.querySelector('#main');
        case componentsNames.FORM:
            return document.querySelector('#root');
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
     * Remove element from local and state variables.
     * @param element
     */
    #removeElementFromPage(element) {
        this.#whatExistOnPage = this.#whatExistOnPage.filter((elem) => (elem !== element));
        this.removeItem(this.#whatExistOnPage);
    }

    /**
     * Register the page and it's requirement.
     * @param {string} nameOfPage - name of Page
     * @param {json} requiredComponents
     * @example of requiredComponents
     * [
     *     {
     *          name: component1,
     *          render: renderCallback1,
     *          unrender: unrenderCallback1
     *     },
     *     {
     *          name: component2,
     *          render: renderCallback2,
     *          unrender: unrenderCallback2
     *     },
     * ]
     */
    register(nameOfPage, requiredComponents) {
        this.#whatNeedForPage.push({ page: nameOfPage, components: requiredComponents });
        this.addNewItem(this.#whatNeedForPage);
        requiredComponents.forEach((component) => {
            if (!this.#allElements.includes(component)) {
                this.#allElements.push(component);
            }
        });
    }

    /**
     * Check what elements we need to render and emit callbacks to render.
     * @param pageName
     */
    #checkElementsForPage(pageName) {
        const { components } = this.#whatNeedForPage.find((element) => element.page === pageName);

        const notExist = [];
        components.forEach((component) => {
            const alreadyExistsOnPage = this.#whatExistOnPage.find(
                (currentComponent) => currentComponent === component.name,
            );

            if (alreadyExistsOnPage === undefined) {
                notExist.push(component);
            }
        });

        let needToBeDeletedExist = this.#whatExistOnPage.filter(
            (elementOnPage) => !components.find((component) => component.name === elementOnPage),
        );

        needToBeDeletedExist = needToBeDeletedExist.filter(
            (item, index) => needToBeDeletedExist.indexOf(item) === index,
        ).map((element) => this.#allElements.find((elem) => elem.name === element));

        if (needToBeDeletedExist.length !== 0) {
            this.jsEmit(EventTypes.ON_REMOVE_ANOTHER_ITEMS, needToBeDeletedExist);
        }

        // todo костыль
        if (components[0].name === 'content') {
            // reg or login
            const index = notExist.findIndex((el) => el.name === 'content');
            if (index === -1) {
                const indexLast = this.#allElements.findIndex((el) => el.name === 'content');
                let element;
                if (pageName === 'LOGIN') {
                    element = this.#allElements.at(indexLast);
                } else {
                    element = this.#allElements.at(indexLast + 1);
                }
                notExist.push(element);
            }
        }
        if (notExist.length !== 0) {
            this.jsEmit(EventTypes.ON_NOT_RENDERED_ITEMS, notExist);
        }

        console.log('in components store func', notExist);
        console.log('in components store func not need', needToBeDeletedExist);
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
