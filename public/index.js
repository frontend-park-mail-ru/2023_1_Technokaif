import './static/css/style.less';
import Router from './router/Router';
import { FeedView } from './views/FeedView';
import ComponentsStore from './stores/ComponentsStore';
import { pageNames } from './utils/config/pageNames';
import { componentsNames } from './utils/config/ComponentsNames';
import API from './api/API';
import UserInfoStore from './stores/UserInfoStore';

/**
 * Render main page of app
 */
function renderMainPage() {
    ComponentsStore.register(pageNames.FEED, [componentsNames.NAVBAR, componentsNames.SIDEBAR,
        componentsNames.MAIN_PAGE_WINDOW]);
    // todo first load stores singletons (check webpack) then delete new
    // eslint-disable-next-line no-new
    new API.constructor();
    // eslint-disable-next-line no-new
    new UserInfoStore.constructor();
    Router.register('/', () => { const feed = new FeedView(); feed.render(); }, [ComponentsStore]);
    Router.start();
}

renderMainPage();
