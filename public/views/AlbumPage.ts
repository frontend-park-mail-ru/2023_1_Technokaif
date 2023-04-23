import { BaseView } from './BaseView';
import { pageNames } from '../utils/config/pageNames';
import ComponentsStore from '../stores/ComponentsStore';
import { EventTypes } from '../utils/config/EventTypes';
import { componentsNames } from '../utils/config/componentsNames';
import Actions from '../actions/Actions.js';

/** Class that render Album page */
class AlbumPageView extends BaseView {
    /**
     * Constructor for feed page view.
     */
    constructor() {
        super(pageNames.ALBUM);
    }

    /**
     * Function to make all special subscribes for Album
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
            case componentsNames.ALBUM:
                component.render(parent);
                // todo
                // @ts-ignore
                Actions.addElementOnPage(componentName);
                break;
            default:
            }
        });
    }

    /**
     * Render all view by components.
     */
    public override render(): void {
        super.render();
        this.#addSubscribes();

        // todo
        // @ts-ignore
        Actions.whatRender(super.name);
    }
}

export default new AlbumPageView();
