import { BaseView } from './BaseView';
import { MainWindowContent } from '../components/MainWindow/mainWindow';
import ComponentsStore from '../stores/ComponentsStore';
import Actions from '../actions/Actions';
import ApiActions from '../actions/ApiActions';

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
        ApiActions.feed();
        const mainPage = new MainWindowContent(parent, { mainPageWindowDiv: 'main-page-window' }, []);
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

                break;
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

        ComponentsStore.subscribe(
            this.renderComponentsList,
            EventTypes.ON_NOT_RENDERED_ITEMS,
        );

        Actions.whatRender(super.name);
        this.callEventListener();
    }
}
