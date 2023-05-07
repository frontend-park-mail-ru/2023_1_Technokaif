import { pageNames } from '@config/pageNames';
import { EventTypes } from '@config/EventTypes';
import { componentsNames } from '@config/componentsNames';
import Actions from '@Actions';
import ComponentsStore from '@store/ComponentsStore';
import ComponentsActions from '@Actions/ComponentsActions';
import { BaseView } from './BaseView';

/** Class that render Album page */
class LibraryPageView extends BaseView {
    /**
     * Constructor for feed page view.
     */
    constructor() {
        super(pageNames.LIBRARY_ARTISTS);
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
            case componentsNames.LIBRARY_ARTISTS:
                component.render(parent);
                ComponentsActions.addElementOnPage(componentName);
                break;
            default:
            }
        });
    }

    /** Render all view by components */
    public override render(): void {
        super.render();
        this.#addSubscribes();

        ComponentsActions.whatRender(super.name);
    }
}

export default new LibraryPageView();
