import { BaseView } from './BaseView';
import ComponentsStore from '../stores/ComponentsStore';
import Actions from '../actions/Actions';
import ApiActions from '../actions/ApiActions';
import ContentStore from '../stores/ContentStore';
import { homeSetup } from '../utils/setup/homeSetup';
import { pageNames } from '../utils/config/pageNames';
import { EventTypes } from '../utils/config/EventTypes';
import { componentsNames } from '../utils/config/componentsNames';
import unsubscribeFromAllStores from '../utils/functions/unsubscribeFromAllStores';

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
        pageNames.FEED,
        ComponentsStore.subscribe(
            (list) => {
                this.#renderFeedComponents(list);
            },
            EventTypes.ON_NOT_RENDERED_ITEMS,
        );

        ContentStore.subscribe(pageNames.FEED, () => {
            console.log('in content');
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
            switch (componentName) {
            case componentsNames.FEED_CONTENT:
                this.#feedComponent = component;
                ApiActions.feed();
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
        unsubscribeFromAllStores(pageNames.FEED);
        super.render();
        this.#addSubscribes();

        Actions.whatRender(super.name);
    }
}

export default new FeedView();
