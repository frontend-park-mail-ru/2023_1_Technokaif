import './static/css/style.less';
import Router from './router/Router';
import FeedView from './views/FeedView';
import ComponentsStore from './stores/ComponentsStore';
import { pageNames } from './utils/config/pageNames';
import { componentsNames } from './utils/config/componentsNames';
import API from './stores/API';
import UserInfoStore from './stores/UserInfoStore';

// todo Check why error is here
// eslint-disable-next-line import/no-named-as-default
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ComponentsRenders from './components/ComponentsRenders';
import Page404View from './views/Page404View';
import ArtistPageView from './views/ArtistPageView';
import { routingUrl } from './utils/config/routingUrls';

// todo Change import
// eslint-disable-next-line import/no-named-as-default
import UserView from './views/UserView';
import { checkAuthAjax } from './api/auth/checkAuthAjaxReq';
import serviceWorkerRegistration from './utils/sw/serviceWorkerRegistration';
import AlbumPageView from './views/AlbumPage';
import LibraryTracksView from './views/LibraryTracksView';
import LibraryAlbumsView from './views/LibraryAlbumsView';
import LibraryArtistsView from './views/LibraryArtistsView';

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
            },
            {
                name: componentsNames.MAIN,
                render: ComponentsRenders.renderMainElement,
            },
            {
                name: componentsNames.NAVBAR,
                render: ComponentsRenders.renderNavbar,
            },
            {
                name: componentsNames.FEED_CONTENT,
                render: ComponentsRenders.renderFeedContent,
            },
            {
                name: componentsNames.PLAYER,
                render: ComponentsRenders.renderPlayer,
            },
        ],
    );

    ComponentsStore.register(
        pageNames.LOGIN,
        [
            {
                name: componentsNames.LOGIN_FORM,
                render: ComponentsRenders.renderFormLogin,
            },
        ],
    );

    ComponentsStore.register(
        pageNames.REGISTER,
        [
            {
                name: componentsNames.REGISTER_FORM,
                render: ComponentsRenders.renderFormRegister,
            },
        ],
    );

    ComponentsStore.register(
        pageNames.PAGE404,
        [
            {
                name: componentsNames.PAGE404,
                render: ComponentsRenders.renderPage404,
            },
        ],
    );

    ComponentsStore.register(
        pageNames.ARTIST_PAGE,
        [
            {
                name: componentsNames.SIDEBAR,
                render: ComponentsRenders.renderSidebar,
            },
            {
                name: componentsNames.MAIN,
                render: ComponentsRenders.renderMainElement,
            },
            {
                name: componentsNames.NAVBAR,
                render: ComponentsRenders.renderNavbar,
            },
            {
                name: componentsNames.ARTIST_CONTENT,
                render: ComponentsRenders.renderArtistContent,
            },
            {
                name: componentsNames.PLAYER,
                render: ComponentsRenders.renderPlayer,
            },
        ],
    );

    ComponentsStore.register(
        pageNames.ALBUM,
        [
            {
                name: componentsNames.SIDEBAR,
                render: ComponentsRenders.renderSidebar,
            },
            {
                name: componentsNames.MAIN,
                render: ComponentsRenders.renderMainElement,
            },
            {
                name: componentsNames.NAVBAR,
                render: ComponentsRenders.renderNavbar,
            },
            {
                name: componentsNames.ALBUM,
                render: ComponentsRenders.renderAlbum,
            },
            {
                name: componentsNames.PLAYER,
                render: ComponentsRenders.renderPlayer,
            },
        ],
    );

    ComponentsStore.register(
        pageNames.USER,
        [
            {
                name: componentsNames.SIDEBAR,
                render: ComponentsRenders.renderSidebar,
            },
            {
                name: componentsNames.MAIN,
                render: ComponentsRenders.renderMainElement,
            },
            {
                name: componentsNames.NAVBAR,
                render: ComponentsRenders.renderNavbar,
            },
            {
                name: componentsNames.USER,
                render: ComponentsRenders.renderUserPage,
            },
            {
                name: componentsNames.PLAYER,
                render: ComponentsRenders.renderPlayer,
            },
        ],
    );

    ComponentsStore.register(
        pageNames.LIBRARY_TRACKS,
        [
            {
                name: componentsNames.SIDEBAR,
                render: ComponentsRenders.renderSidebar,
            },
            {
                name: componentsNames.MAIN,
                render: ComponentsRenders.renderMainElement,
            },
            {
                name: componentsNames.NAVBAR,
                render: ComponentsRenders.renderNavbar,
            },
            {
                name: componentsNames.USER,
                render: ComponentsRenders.renderUserPage,
            },
            {
                name: componentsNames.LIBRARY_LIST,
                render: ComponentsRenders.renderLibraryList,
            },
            {
                name: componentsNames.LIBRARY_TRACKS,
                render: ComponentsRenders.renderTracksLibrary,
            },
            {
                name: componentsNames.PLAYER,
                render: ComponentsRenders.renderPlayer,
            },
        ],
    );

    ComponentsStore.register(
        pageNames.LIBRARY_ARTISTS,
        [
            {
                name: componentsNames.SIDEBAR,
                render: ComponentsRenders.renderSidebar,
            },
            {
                name: componentsNames.MAIN,
                render: ComponentsRenders.renderMainElement,
            },
            {
                name: componentsNames.NAVBAR,
                render: ComponentsRenders.renderNavbar,
            },
            {
                name: componentsNames.USER,
                render: ComponentsRenders.renderUserPage,
            },
            {
                name: componentsNames.LIBRARY_LIST,
                render: ComponentsRenders.renderLibraryList,
            },
            {
                name: componentsNames.LIBRARY_ARTISTS,
                render: ComponentsRenders.renderArtistsLibrary,
            },
            {
                name: componentsNames.PLAYER,
                render: ComponentsRenders.renderPlayer,
            },
        ],
    );

    ComponentsStore.register(
        pageNames.LIBRARY_ALBUMS,
        [
            {
                name: componentsNames.SIDEBAR,
                render: ComponentsRenders.renderSidebar,
            },
            {
                name: componentsNames.MAIN,
                render: ComponentsRenders.renderMainElement,
            },
            {
                name: componentsNames.NAVBAR,
                render: ComponentsRenders.renderNavbar,
            },
            {
                name: componentsNames.USER,
                render: ComponentsRenders.renderUserPage,
            },
            {
                name: componentsNames.LIBRARY_LIST,
                render: ComponentsRenders.renderLibraryList,
            },
            {
                name: componentsNames.LIBRARY_ALBUMS,
                render: ComponentsRenders.renderAlbumsLibrary,
            },
            {
                name: componentsNames.PLAYER,
                render: ComponentsRenders.renderPlayer,
            },
        ],
    );

    serviceWorkerRegistration();

    checkAuthAjax().then((value) => {
        localStorage.setItem('isAuth', `${value}`);
    });

    Router.register(routingUrl.ROOT, () => { FeedView.render(); }, [API]);
    Router.register(routingUrl.LOGIN, () => { LoginView.render(); }, [API, UserInfoStore]);
    Router.register(routingUrl.REGISTER, () => { RegisterView.render(); }, [API, UserInfoStore]);
    Router.register(routingUrl.PAGE404, () => { Page404View.render(); }, [API, UserInfoStore]);
    Router.register(routingUrl.PROFILE, () => { UserView.render(); }, [API, UserInfoStore]);
    Router.register(routingUrl.LIBRARY_TRACKS, () => { LibraryTracksView.render(); }, [API]);
    Router.register(routingUrl.LIBRARY_ALBUMS, () => { LibraryAlbumsView.render(); }, [API]);
    Router.register(routingUrl.LIBRARY_ARTISTS, () => { LibraryArtistsView.render(); }, [API]);
    Router.registerRouteWithRegEx(`${routingUrl.ARTIST_PAGE_EXP}`, () => { ArtistPageView.render(); }, [API]);
    Router.registerRouteWithRegEx(`${routingUrl.ALBUM_PAGE_EXP}`, () => { AlbumPageView.render(); }, [API]);

    Router.start();
}

renderMainPage();
