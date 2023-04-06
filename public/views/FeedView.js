import { BaseView } from './BaseView';
import ComponentsStore from '../stores/ComponentsStore';
import Actions from '../actions/Actions';
import { pageNames } from '../utils/config/pageNames';
import { EventTypes } from '../utils/config/EventTypes';
import { componentsNames } from '../utils/config/componentsNames';

/**
 * Class for feed page view.
 */
class FeedView extends BaseView {
    /**
     * A variable to save feed component beyond two events - render and api request
     */
    #feedComponent;

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

        ContentStore.subscribe(() => {
            const state = ContentStore.state[pageNames.FEED];
            const configs = [];
            for (const key in state) {
                configs.push(homeSetup(key, state[key]));
            }

            const componentName = this.#feedComponent.name;
            const parent = ComponentsStore.checkWhereToPlace(componentName);
            this.#feedComponent.render(parent, configs);
        }, EventTypes.CHANGE_CONTENT);
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
            case componentsNames.FEED_CONTENT:
                component.render(parent);
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

export default new FeedView();
