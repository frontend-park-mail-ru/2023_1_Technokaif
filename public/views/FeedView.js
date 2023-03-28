import { BaseView } from './BaseView';
import { MainWindowContent } from '../components/MainWindow/mainWindow';
import { homeSetup } from '../pages/home/homeSetup';
import API from '../api/API';
import ComponentsStore from '../stores/ComponentsStore';
import Actions from '../actions/Actions';

/**
 * Class for feed page view.
 */
export class FeedView extends BaseView {
    /**
     * Constructor for feed page view.
     */
    constructor() {
        super(pageNames.FEED);
    }

    // todo: make render of feed content to work throw actions in store.
    /**
     * Create feed content component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    #renderFeedContent(parent) {
        API.feedRequest();
        const mainPage = new MainWindowContent(parent, homeSetup(items));
        mainPage.render();
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
    #renderComponentsList(list) {
        list.forEach((componentName) => {
            // const parent = ComponentsStore.checkWhereToPlace(componentName);
            switch (componentName) {
            // todo make another cases (like mainWindowContent)
            case componentsNames.MAIN_PAGE_WINDOW:
            default:
                break;
            }
        });
    }

    /**
     * Render all view by components.
     */
    render() {
        super.render();

        ComponentsStore.addChangeListener(
            this.renderComponentsList,
            EventTypes.ON_NOT_RENDERED_ITEMS,
        );

        Actions.whatRender(super.name);
        this.callEventListener();
    }
}
