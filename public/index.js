import './static/css/style.less';
import Router from './router/Router';
import FeedView from './views/FeedView';
import ComponentsStore from './stores/ComponentsStore';
import { pageNames } from './utils/config/pageNames';
import { componentsNames } from './utils/config/componentsNames';
import API from './stores/API';
import UserInfoStore from './stores/UserInfoStore';
import ContentStore from './stores/ContentStore';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
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
                name: componentsNames.FEED_CONTENT,
                render: ComponentsRenders.renderFeedContent,
                unrender: ComponentsRenders.unrenderFeedContent,
            },
        ],
    );

    ComponentsStore.register(
        pageNames.LOGIN,
        [
            {
                name: componentsNames.LOGIN_FORM,
                render: ComponentsRenders.renderFormLogin,
                unrender: ComponentsRenders.unrenderFormLogin,
            },
        ],
    );

    ComponentsStore.register(
        pageNames.REGISTER,
        [
            {
                name: componentsNames.REGISTER_FORM,
                render: ComponentsRenders.renderFormRegister,
                unrender: ComponentsRenders.unrenderFormRegister,
            },
        ],
    );

    Router.register('/', () => { FeedView.render(); }, [API, ContentStore]);
    Router.register('/login', () => { LoginView.render(); }, [API, UserInfoStore]);
    Router.register('/register', () => { RegisterView.render(); }, [API, UserInfoStore]);
    Router.start();
}

renderMainPage();
