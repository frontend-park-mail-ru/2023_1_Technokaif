import './static/css/style.less';
import Router from './router/Router';
import { FeedView } from './views/FeedView';
import ComponentsStore from './stores/ComponentsStore';
import { pageNames } from './utils/config/pageNames';
import { componentsNames } from './utils/config/ComponentsNames';
import API from './api/API';
import UserInfoStore from './stores/UserInfoStore';
import ContentStore from './stores/ContentStore';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import ComponentsRenders from './components/ComponentsRenders';

/**
 * Render main page of app
 */
function renderMainPage() {
    ComponentsStore.register(
        pageNames.FEED,
        [
            {
                name: componentsNames.NAVBAR,
                render: ComponentsRenders.renderNavbar,
                unrender: ComponentsRenders.unrenderNavbar,
            },
            {
                name: componentsNames.SIDEBAR,
                render: ComponentsRenders.renderSidebar,
                unrender: ComponentsRenders.unrenderSidebar,
            },
            {
                name: componentsNames.MAIN_PAGE_WINDOW,
                render: ComponentsRenders.renderFeedContent,
                unrender: ComponentsRenders.unrenderFeedContent,
            },
        ],
    );

    // ComponentsStore.register(pageNames.LOGIN, [componentsNames.FORM]);
    // ComponentsStore.register(pageNames.REGISTER, [componentsNames.FORM]);
    Router.register('/', () => { const feed = new FeedView(); feed.render(); }, [ComponentsStore, API, ContentStore]);
    Router.register('/login', () => { const login = new LoginView(); login.render(); }, [ComponentsStore, API, UserInfoStore]);
    Router.register('/register', () => { const register = new RegisterView(); register.render(); }, [ComponentsStore, API, UserInfoStore]);
    Router.start();
}

renderMainPage();
