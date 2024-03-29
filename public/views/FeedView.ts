import { pageNames } from '@config/pageNames';
import { EventTypes } from '@config/EventTypes';
import { componentsNames } from '@config/componentsNames';
import ComponentsStore from '@store/ComponentsStore';
import ComponentsActions from '@Actions/ComponentsActions';
import { BaseView } from './BaseView';

/**
 * Class for feed page view.
 */
class FeedView extends BaseView {
    /**
     * Constructor for feed page view.
     */
    constructor() {
        super(pageNames.FEED);
    }

    /**
     * Function to make all special subscribes for FeedView
     */
    #addSubscribes() {
        ComponentsStore.subscribe(
            (list) => {
                this.#renderFeedComponents(list);
            },
            EventTypes.ON_NOT_RENDERED_ITEMS,
        );
    }

    /**
     * Callback to pass throw store to subscribe rendering components.
     * @param list
     */
    #renderFeedComponents(list) {
        list.forEach((component) => {
            const componentName = component.name;
            const parent = ComponentsStore.checkWhereToPlace(componentName);
            switch (componentName) {
            case componentsNames.FEED:
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

export default new FeedView();
