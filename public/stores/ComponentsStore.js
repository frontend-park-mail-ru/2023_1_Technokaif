import IStore from './IStore';
import ActionTypes from '../actions/ActionTypes';

/**
 * Store for
 */
class ComponentsStore extends IStore {
    /**
     * Constructor for ComponentsStore.
     */
    constructor() {
        super('ComponentsStore');
    }

    checkElementExist(elementName) {
        return document.querySelector(elementName);
    }

    checkWhereToPlace(elementName) {
        switch (elementName) {
        case 'js__navbar':
            return document.querySelector();
        case 'js__sidebar':
            break;
        case 'js__main-page-window':
            break;
        }
    }
}

export default new ComponentsStore();
