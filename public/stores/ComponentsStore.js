import IStore from './IStore';

/**
 * Store for components.
 */
class ComponentsStore extends IStore {
    /**
     * Constructor for ComponentsStore.
     */
    constructor() {
        super('ComponentsStore');
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
}

export default new ComponentsStore();
