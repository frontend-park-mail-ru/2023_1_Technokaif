import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';

/** All actions to render/remove/check components on page */
class ComponentsActions {
    /** Action to emit two functions for ComponentsStore: what render on page and what
   *  to unrender by pageName */
    whatRender(name) {
        Dispatcher.dispatch({
            type: ActionTypes.CHECK_WHAT_RENDER,
            name,
        });
    }

    /** Action to add a component in ComponentsStore state */
    addElementOnPage(name) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_COMPONENT_ON_PAGE,
            name,
        });
    }

    /** Action to remove a component from ComponentsStore state */
    removeElementFromPage(name) {
        Dispatcher.dispatch({
            type: ActionTypes.REMOVE_COMPONENT_FROM_PAGE,
            name,
        });
    }

    /** When player dying notify store */
    playerDelete() {
        Dispatcher.dispatch({
            type: ActionTypes.CLEAR_ALL,
        });
    }
}

export default new ComponentsActions();
