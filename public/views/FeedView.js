import { BaseView } from './BaseView';
import ComponentsStore from '../stores/ComponentsStore';
import Actions from '../actions/Actions';
import ApiActions from '../actions/ApiActions';
import ContentStore from '../stores/ContentStore';
import { homeSetup } from '../pages/home/homeSetup';
import { pageNames } from '../utils/config/pageNames';
import { EventTypes } from '../stores/EventTypes';
import { componentsNames } from '../utils/config/ComponentsNames';

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
     * Create feed content component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     * @param component -- component with render callback to render
     */
    #renderFeedContent(parent, component) {
        ContentStore.subscribe(() => {
            const state = ContentStore.state[pageNames.FEED];
            const configs = [];
            for (const key in state) {
                configs.push(homeSetup(key, state[key]));
            }

            // todo fuck go back its strange dynamic logic
            component.render(parent, configs);
        }, EventTypes.CHANGE_CONTENT);

        ApiActions.feed();
    }

    /**
     * Function to create a callback on event.
     */
    callEventListener() {

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
            case componentsNames.MAIN_PAGE_WINDOW:
                this.#renderFeedContent(parent, component);
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
        ComponentsStore.subscribe(
            (list) => {
                this.#renderFeedComponents(list);
            },
            EventTypes.ON_NOT_RENDERED_ITEMS,
        );

        Actions.whatRender(super.name);
        ComponentsStore.unsubscribeAll();
        this.callEventListener();
    }
}

export default new FeedView();
