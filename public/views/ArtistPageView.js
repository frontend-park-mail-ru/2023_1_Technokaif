import { BaseView } from './BaseView';
import { pageNames } from '../utils/config/pageNames';
import ComponentsStore from '../stores/ComponentsStore';
import { EventTypes } from '../utils/config/EventTypes';
import { componentsNames } from '../utils/config/componentsNames';
import Actions from '../actions/Actions';

/**
 * Class for artist page view.
 */
class ArtistPageView extends BaseView {
    /**
     * Constructor for feed page view.
     */
    constructor() {
        super(pageNames.ARTIST_PAGE);
    }

    /**
     * Function to make all special subscribes for FeedView
     */
    #addSubscribes() {
        ComponentsStore.subscribe(
            (list) => {
                this.#renderComponents(list);
            },
            EventTypes.ON_NOT_RENDERED_ITEMS,
        );
    }

    /**
     * Callback to pass throw store to subscribe rendering components.
     * @param list
     */
    #renderComponents(list) {
        list.forEach((component) => {
            const componentName = component.name;
            const parent = ComponentsStore.checkWhereToPlace(componentName);
            switch (componentName) {
            case componentsNames.ARTIST_CONTENT:
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

export default new ArtistPageView();
