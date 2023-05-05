import './static/css/style.less';
import './static/css/reset.less';
import { pageNames } from '@config/pageNames';
import { componentsNames } from '@config/componentsNames';
import { routingUrl } from '@config/routingUrls';
import { checkAuthAjax } from '@api/auth/checkAuthAjaxReq';
import { checkAuth } from '@functions/checkAuth';
import { getPermittedByAuthUser, getPermittedByUnAuthUser } from '@router/permittedPath';
import { popAuthUser, popNoAuthUser } from '@router/popPath';

// todo Check why error is here
// eslint-disable-next-line import/no-named-as-default
import LoginView from '@views/LoginView';
import RegisterView from '@views/RegisterView';
import Page404View from '@views/Page404View';
import ArtistPageView from '@views/ArtistPageView';

// todo Change import
// eslint-disable-next-line import/no-named-as-default
import UserView from '@views/UserView';
import AlbumPageView from '@views/AlbumPage';
import LibraryTracksView from '@views/LibraryTracksView';
import LibraryAlbumsView from '@views/LibraryAlbumsView';
import LibraryArtistsView from '@views/LibraryArtistsView';
import SearchView from '@views/SearchView';
import LibraryPlaylistsView from '@views/libraryPlaylistsView';
import PlaylistView from '@views/PlaylistView';
import ComponentsRenders from '@components/ComponentsRenders';
import UserInfoStore from '@store/UserInfoStore';
import API from '@store/API';
import ComponentsStore from '@store/ComponentsStore';
import FeedView from '@views/FeedView';
import Router from '@router/Router';
import serviceWorkerRegistration from './utils/sw/serviceWorkerRegistration';

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
        true,
    );

    ComponentsStore.register(
        pageNames.LOGIN,
        [
            {
                name: componentsNames.LOGIN_FORM,
                render: ComponentsRenders.renderFormLogin,
            },
        ],
        false,
    );

    ComponentsStore.register(
        pageNames.REGISTER,
        [
            {
                name: componentsNames.REGISTER_FORM,
                render: ComponentsRenders.renderFormRegister,
            },
        ],
        false,
    );

    ComponentsStore.register(
        pageNames.PAGE404,
        [
            {
                name: componentsNames.PAGE404,
                render: ComponentsRenders.renderPage404,
            },
        ],
        false,
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
        true,
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
        true,
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
        true,
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
        true,
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
        true,
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
        true,
    );

    ComponentsStore.register(
        pageNames.LIBRARY_PLAYLISTS,
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
                name: componentsNames.LIBRARY_LIST,
                render: ComponentsRenders.renderLibraryList,
            },
            {
                name: componentsNames.LIBRARY_PLAYLISTS,
                render: ComponentsRenders.renderPlaylistsLibrary,
            },
            {
                name: componentsNames.PLAYER,
                render: ComponentsRenders.renderPlayer,
            },
        ],
        true,
    );

    ComponentsStore.register(
        pageNames.SEARCH,
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
                name: componentsNames.SEARCH_CONTENT,
                render: ComponentsRenders.renderSearchContent,
            },
            {
                name: componentsNames.PLAYER,
                render: ComponentsRenders.renderPlayer,
            },
        ],
        true,
    );

    ComponentsStore.register(
        pageNames.PLAYLIST,
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
                name: componentsNames.PLAYLIST,
                render: ComponentsRenders.renderPlaylist,
            },
            {
                name: componentsNames.PLAYER,
                render: ComponentsRenders.renderPlayer,
            },
            {
                name: componentsNames.PLAYER,
                render: ComponentsRenders.renderPlayer,
            },
        ],
        true,
    );

    serviceWorkerRegistration();

    checkAuthAjax().then((value) => {
        localStorage.setItem('isAuth', `${value}`);
    });

    Router.registerPermission(checkAuth, getPermittedByAuthUser, popAuthUser);
    Router.registerPermission(() => !checkAuth(), getPermittedByUnAuthUser, popNoAuthUser);

    Router.register(routingUrl.ROOT, () => { FeedView.render(); }, [API]);
    Router.register(routingUrl.LOGIN, () => { LoginView.render(); }, [API, UserInfoStore]);
    Router.register(routingUrl.REGISTER, () => { RegisterView.render(); }, [API, UserInfoStore]);
    Router.register(routingUrl.PAGE404, () => { Page404View.render(); }, [API, UserInfoStore]);
    Router.register(routingUrl.PROFILE, () => { UserView.render(); }, [API, UserInfoStore]);
    Router.register(routingUrl.LIBRARY_TRACKS, () => { LibraryTracksView.render(); }, [API]);
    Router.register(routingUrl.LIBRARY_ALBUMS, () => { LibraryAlbumsView.render(); }, [API]);
    Router.register(routingUrl.LIBRARY_ARTISTS, () => { LibraryArtistsView.render(); }, [API]);
    Router.register(routingUrl.LIBRARY_PLAYLISTS, () => { LibraryPlaylistsView.render(); }, [API]);
    Router.register(routingUrl.SEARCH, () => { SearchView.render(); }, [API]);
    Router.registerRouteWithRegEx(`${routingUrl.ARTIST_PAGE_EXP}`, () => { ArtistPageView.render(); }, [API]);
    Router.registerRouteWithRegEx(`${routingUrl.ALBUM_PAGE_EXP}`, () => { AlbumPageView.render(); }, [API]);
    Router.registerRouteWithRegEx(`${routingUrl.PLAYLIST_PAGE_EXP}`, () => { PlaylistView.render(); }, [API]);
    Router.start();
}

renderMainPage();
