import './static/css/style.less';
import Router from './router/Router';
import { FeedView } from './views/FeedView';
import ComponentsStore from './stores/ComponentsStore';

/**
 * Render main page of app
 */
function renderMainPage() {
    ComponentsStore.register(pageNames.FEED, [componentsNames.NAVBAR, componentsNames.SIDEBAR,
        componentsNames.MAIN_PAGE_WINDOW]);
    Router.register('/', () => { const feed = new FeedView(); feed.render(); }, ComponentsStore);
    Router.start();
}

renderMainPage();
