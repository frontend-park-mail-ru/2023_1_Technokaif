import IStore from '@store/IStore';
import ActionTypes from '@actions/ActionTypes';
import { EventTypes } from '@config/EventTypes';
import { componentsNames } from '@config/componentsNames';
import { componentsJSNames } from '@config/componentsJSNames';

declare interface Component{
    name:string,
    render: {(HTMLElement): void}
}

const dynamicPages = [
    componentsNames.ARTIST_CONTENT,
    componentsNames.ALBUM,
    componentsNames.LIBRARY_PLAYLISTS,
    componentsNames.PLAYLIST,
];

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

    /** Is prepage render needed */
    #isPrepageNeed;

    /**
     * Constructor for ComponentsStore.
     */
    constructor() {
        super('ComponentsStore');
        this.#isPrepageNeed = [];
        this.#whatExistOnPage = [];
        this.#whatNeedForPage = [];
        this.#allElements = [];
    }

    /**
     * Function to handle dispatcher behaviour.
     * @param action
     */
    override dispatch(action) {
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
            super.dispatch(action);
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
            return document.getElementById(`${componentsJSNames.BODY}`);
        case componentsNames.NAVBAR:
        case componentsNames.FEED_CONTENT:
        case componentsNames.USER:
        case componentsNames.ARTIST_CONTENT:
        case componentsNames.ALBUM:
        case componentsNames.LIBRARY_TRACKS:
        case componentsNames.LIBRARY_ARTISTS:
        case componentsNames.LIBRARY_ALBUMS:
        case componentsNames.LIBRARY_PLAYLISTS:
        case componentsNames.PLAYLIST:
        case componentsNames.SEARCH_CONTENT:
            return document.getElementsByClassName(`${componentsJSNames.MAIN}`)[0];
        case componentsNames.LOGIN_FORM:
        case componentsNames.REGISTER_FORM:
        case componentsNames.PAGE404:
            return document.getElementById(`${componentsJSNames.ROOT}`);
        case componentsNames.PLAYER:
            return document.getElementById('player__placement');
        case componentsNames.LIBRARY_LIST: {
            return document.getElementsByClassName('navbar_library')[0];
        }
        default:
            console.error('position to place element by name', elementName, 'not found');
            return document.getElementById(`${componentsJSNames.ROOT}`);
        }
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
     * @param {boolean} isPrePageNeed
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
    register(nameOfPage, requiredComponents, isPrePageNeed) {
        this.#whatNeedForPage.push({ page: nameOfPage, components: requiredComponents });
        requiredComponents.forEach((component) => {
            if (!this.#allElements.includes(component)) {
                this.#allElements.push(component);
            }
        });
        this.#isPrepageNeed.push({
            name: nameOfPage,
            isPrePageNeed,
        });
    }

    /**
     * Check what elements we need to render and emit callbacks to render.
     * @param pageName
     */
    #checkElementsForPage(pageName) {
        const { components } = this.#whatNeedForPage.find((element) => element.page === pageName);
        const notExist: Component[] = [];
        components.forEach((component: Component) => {
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

        if (this.#whatExistOnPage.length > 0) {
            let dynamicIdComponent: Component = components[0];
            if (components.some((item) => {
                if (dynamicPages.includes(item.name)) {
                    dynamicIdComponent = item;
                    return true;
                }

                return false;
            })) {
                needToBeDeletedExist.splice(0, 0, dynamicIdComponent);
                if (!notExist.includes(dynamicIdComponent)) {
                    notExist.splice(0, 0, dynamicIdComponent);
                }
            }
        }

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
    prePageNeed(viewName) {
        let isNeeded = false;
        if (this.#isPrepageNeed.find((page) => page.name === viewName && page.isPrePageNeed)) {
            isNeeded = true;
        }
        return isNeeded;
    }
}

export default new ComponentsStore();
