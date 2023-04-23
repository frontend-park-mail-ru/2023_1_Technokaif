import { BaseView } from './BaseView';
import { pageNames } from '../utils/config/pageNames';
import Actions from '../actions/Actions';
import { componentsNames } from '../utils/config/componentsNames';
import ComponentsStore from '../stores/ComponentsStore';
import { EventTypes } from '../utils/config/EventTypes';

// todo Validate all create func to check

/**
 * Class for feed page view.
 */
class RegisterView extends BaseView {
    /** Set default value of name * */
    constructor() {
        super(pageNames.REGISTER);
    }

    /**
     * Function to make all special subscribes for FeedView
     */
    #addSubscribes() {
        ComponentsStore.subscribe(
            (list) => {
                this.#renderUserComponents(list);
            },
            EventTypes.ON_NOT_RENDERED_ITEMS,
        );
    }

    /**
     * Callback to pass throw store to subscribe rendering components.
     * @param list
     */
    #renderUserComponents(list) {
        list.forEach((component) => {
            const componentName = component.name;
            const parent = ComponentsStore.checkWhereToPlace(componentName);
            switch (componentName) {
            case componentsNames.REGISTER_FORM:
                component.render(parent);
                Actions.addElementOnPage(componentName);
                break;
            default:
            }
        });
    }

    /**
     * Render all view by components.
     */
    render() {
        super.render();
        this.#addSubscribes();

        Actions.whatRender(super.name);
    }
}

export default new RegisterView();
