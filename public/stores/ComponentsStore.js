import IStore from './IStore';
import ActionTypes from '../actions/ActionTypes';
import { EventTypes } from '../utils/config/EventTypes';
import { componentsNames } from '../utils/config/componentsNames';
import { componentsJSNames } from '../utils/config/componentsJSNames';

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
        case componentsNames.SIDEBAR:
        case componentsNames.MAIN:
            return document.querySelector(`#${componentsJSNames.BODY}`);
        case componentsNames.NAVBAR:
        case componentsNames.FEED_CONTENT:
        case componentsNames.USER:
        case componentsNames.ARTIST_CONTENT:
        case componentsNames.ALBUM:
            return document.querySelector(`.${componentsJSNames.MAIN}`);
        case componentsNames.LOGIN_FORM:
        case componentsNames.REGISTER_FORM:
        case componentsNames.PAGE404:
            return document.querySelector(`#${componentsJSNames.ROOT}`);
        case componentsNames.PLAYER:
            return document.querySelector('#player__placement');
        default:
            console.error('position to place element by name', elementName, 'not found');
            return document.querySelector(`#${componentsJSNames.ROOT}`);
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
        this.addNewItem(this.#whatExistOnPage);
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
        ).map((element) => this.#allElements.find((elem) => elem.name === element)).reverse();

        if (needToBeDeletedExist.length !== 0) {
            this.jsEmit(EventTypes.ON_REMOVE_ANOTHER_ITEMS, needToBeDeletedExist);
        }
        if (notExist.length !== 0) {
            this.jsEmitAndPopListeners(EventTypes.ON_NOT_RENDERED_ITEMS, notExist);
        }
    }

    /**
     * Function to check if we need to create a document elements
     * @returns {boolean}
     */
    prePageNeed() {
        return document.querySelector(`${componentsJSNames.MAIN}`) === null;
    }
}

export default new ComponentsStore();
