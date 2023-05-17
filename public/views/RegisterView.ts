import { pageNames } from '@config/pageNames';
import { componentsNames } from '@config/componentsNames';
import { EventTypes } from '@config/EventTypes';
import ComponentsStore from '@store/ComponentsStore';
import ComponentsActions from '@Actions/ComponentsActions';
import { BaseView } from './BaseView';

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
                ComponentsActions.addElementOnPage(componentName);
                break;
            default:
            }
        });
    }

    /**
     * Render all view by components.
     */
    override render() {
        super.render();
        this.#addSubscribes();

        ComponentsActions.whatRender(super.name);
    }
}

export default new RegisterView();
