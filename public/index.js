import './static/css/style.less';
import Router from './router/Router';
import FeedView from './views/FeedView';
import ComponentsStore from './stores/ComponentsStore';
import { pageNames } from './utils/config/pageNames';
import { componentsNames } from './utils/config/componentsNames';
import API from './stores/API';
import UserInfoStore from './stores/UserInfoStore';
import ContentStore from './stores/ContentStore';

// todo Check why error is here
// eslint-disable-next-line import/no-named-as-default
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ComponentsRenders from './components/ComponentsRenders';
import Page404View from './views/Page404View';
import ArtistPageView from './views/ArtistPageView';
import { routingUrl } from './utils/config/routingUrls';
// import { AudioPlayer } from './components/player/player';

// todo Change import
// eslint-disable-next-line import/no-named-as-default
import UserView from './views/UserView';

/**
 * Render main page of app
 */
function renderMainPage() {
    ComponentsStore.register(
        pageNames.FEED,
        [
            {
                name: componentsNames.SIDEBAR,
                render: ComponentsRenders.renderSidebar,
                unrender: ComponentsRenders.unrenderSidebar,
            },
            {
                name: componentsNames.MAIN,
                render: ComponentsRenders.renderMainElement,
                unrender: ComponentsRenders.unrenderMainElement,
            },
            {
                name: componentsNames.NAVBAR,
                render: ComponentsRenders.renderNavbar,
                unrender: ComponentsRenders.unrenderNavbar,
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

    ComponentsStore.register(
        pageNames.PAGE404,
        [
            {
                name: componentsNames.PAGE404,
                render: ComponentsRenders.renderPage404,
                unrender: ComponentsRenders.unrenderPage404,
            },
        ],
    );

    ComponentsStore.register(
        pageNames.ARTIST_PAGE,
        [
            {
                name: componentsNames.SIDEBAR,
                render: ComponentsRenders.renderSidebar,
                unrender: ComponentsRenders.unrenderSidebar,
            },
            {
                name: componentsNames.MAIN,
                render: ComponentsRenders.renderMainElement,
                unrender: ComponentsRenders.unrenderMainElement,
            },
            {
                name: componentsNames.NAVBAR,
                render: ComponentsRenders.renderNavbar,
                unrender: ComponentsRenders.unrenderNavbar,
            },
            {
                name: componentsNames.ARTIST_CONTENT,
                render: ComponentsRenders.renderArtistContent,
                unrender: ComponentsRenders.unrenderArtistContent,
            },
        ],
    );

    ComponentsStore.register(
        pageNames.USER,
        [
            {
                name: componentsNames.SIDEBAR,
                render: ComponentsRenders.renderSidebar,
                unrender: ComponentsRenders.unrenderSidebar,
            },
            {
                name: componentsNames.MAIN,
                render: ComponentsRenders.renderMainElement,
                unrender: ComponentsRenders.unrenderMainElement,
            },
            {
                name: componentsNames.NAVBAR,
                render: ComponentsRenders.renderNavbar,
                unrender: ComponentsRenders.unrenderNavbar,
            },
            {
                name: componentsNames.USER,
                render: ComponentsRenders.renderUserPage,
                unrender: ComponentsRenders.unrenderUserPage,
            },
        ],
    );

    Router.register(routingUrl.ROOT, () => { FeedView.render(); }, [API, ContentStore]);
    Router.register(routingUrl.LOGIN, () => { LoginView.render(); }, [API, UserInfoStore]);
    Router.register(routingUrl.REGISTER, () => { RegisterView.render(); }, [API, UserInfoStore]);
    Router.register(routingUrl.PAGE404, () => { Page404View.render(); }, [API, UserInfoStore]);
    Router.register(routingUrl.PROFILE, () => { UserView.render(); }, [API, UserInfoStore]);
    Router.registerRouteWithRegEx(`${routingUrl.ARTIST_PAGE_EXP}`, () => { ArtistPageView.render(); }, [API, UserInfoStore]);

    Router.start();
}

renderMainPage();
