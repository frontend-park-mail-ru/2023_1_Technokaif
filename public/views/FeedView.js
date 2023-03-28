import { BaseView } from './BaseView';
import { MainWindowContent } from '../components/MainWindow/mainWindow';
import { homeSetup } from '../pages/home/homeSetup';
import API from '../api/API';

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
     * Render all view by components.
     */
    render() {
        super.render();
        this.callEventListener();
    }
}
