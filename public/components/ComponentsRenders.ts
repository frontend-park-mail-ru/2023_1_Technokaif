import { checkAuth } from '@functions/checkAuth';
import { authNavConfig, sidebarConfig, unAuthNavConfig } from '@config/config';
import { FeedContent } from '@bigComponents/FeedContent/feedContent';
import { componentsJSNames } from '@config/componentsJSNames';
import { HeaderWithButton } from '@smallComponents/HeaderWithButton/headerWithButton';
import { page404Setup } from '@setup/page404Setup';
import { componentsNames } from '@config/componentsNames';
import { ArtistContent } from '@bigComponents/ArtistContent/artistContent';
import { setupArtistContent } from '@setup/artistSetup';
import { userSetup } from '@setup/userSetup';
import { User } from '@bigComponents/userComponent/user';
import { RegisterComponent } from '@bigComponents/registerComponent/registerComponent';
import { LoginComponent } from '@bigComponents/loginComponent/loginComponent';
import { Album } from '@bigComponents/Album/album';
import { setupAlbum } from '@setup/albumSetup';
import { LibraryList } from '@smallComponents/libraryList/libraryList';
import { FavoriteTracks } from '@bigComponents/Playlist/Library/favoriteTracks';
import { FavoriteArtists } from '@bigComponents/Library/favoriteArtists';
import { FavoriteAlbums } from '@bigComponents/Library/favoriteAlbums';
import { SearchContent } from '@bigComponents/searchContent/searchContent';
import { LibraryPlaylists } from '@bigComponents/Library/libraryPlaylists';
import { UserPlaylist } from '@bigComponents/Playlist/Library/userPlaylist';
import { PlayerWithDummy } from '@bigComponents/playerWithDummy/playerWithDummy';
import { ID_REG } from '@config/id';
import { routingUrl } from '@config/routingUrls';
import Router from '../router/Router';
import Menu from './bigComponents/Menu/Menu';
import Navbar from './bigComponents/Navbar/Navbar';

/**
 * Class for components renders functions.
 */
class ComponentsRenders {
    /**
     * Create Navbar component and render it in parent
     * @param {HTMLElement} parent -- where to place Navbar
     */
    renderNavbar(parent) {
        const config = (checkAuth()) ? authNavConfig : unAuthNavConfig;
        const name = (checkAuth()) ? 'authNavbar' : 'unAuthNavbar';

        new Navbar(parent, config, name).render();
    }

    /**
     * Create Sidebar component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderSidebar(parent) {
        new Menu(parent, sidebarConfig, 'sidebar').render();
    }

    /**
     * Create Sidebar component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderMainElement(parent) {
        const main = document.createElement('main');
        main.classList.add(`${componentsJSNames.MAIN}`, `${componentsNames.MAIN}`);
        main.id = ID_REG.mainElementId;

        parent.appendChild(main);
    }

    /**
     * Create Feed Content component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderFeedContent(parent) {
        new FeedContent(parent, { mainPageWindowDiv: 'main-page-window' }).render();
    }

    /**
     * Create Feed Content component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderArtistContent(parent) {
        new ArtistContent(parent, setupArtistContent()).render();
    }

    /**
     * Create Form for login component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderFormLogin(parent) {
        new LoginComponent(parent).render();
    }

    /**
     * Create Form for register component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderFormRegister(parent) {
        new RegisterComponent(parent).render();
    }

    /**
     * Create Page404
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderPage404(parent) {
        new HeaderWithButton(parent, page404Setup()).render();
    }

    /**
     * Create UserPage
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderUserPage(parent) {
        if (!checkAuth()) {
            Router.go(routingUrl.ROOT);
            return;
        }

        new User(parent, userSetup()).render();
    }

    /** Render player in parent */
    renderPlayer(parent) {
        new PlayerWithDummy(parent).render();
    }

    /** Render in navbar */
    renderLibraryList(parent) {
        if (!checkAuth()) {
            Router.go(routingUrl.LOGIN);
        }

        new LibraryList(parent).render();
    }

    /** Render library in parent */
    renderTracksLibrary(parent) {
        if (!checkAuth()) {
            Router.go(routingUrl.LOGIN);
        }

        new FavoriteTracks(parent, componentsNames.LIBRARY_TRACKS).renderFavoriteTracks();
    }

    /** Render library in parent */
    renderArtistsLibrary(parent) {
        if (!checkAuth()) {
            Router.go(routingUrl.LOGIN);
        }

        new FavoriteArtists(parent, componentsNames.LIBRARY_ARTISTS).renderFavoriteArtists();
    }

    /** Render library in parent */
    renderAlbumsLibrary(parent) {
        if (!checkAuth()) {
            Router.go(routingUrl.LOGIN);
        }

        new FavoriteAlbums(parent, componentsNames.LIBRARY_ALBUMS).renderFavoriteAlbums();
    }

    /** Render library in parent */
    renderPlaylistsLibrary(parent) {
        if (!checkAuth()) {
            Router.go(routingUrl.LOGIN);
        }

        new LibraryPlaylists(parent, componentsNames.LIBRARY_PLAYLISTS).renderFavoritePlaylists();
    }

    /** Render Playlist in parent */
    renderPlaylist(parent) {
        new UserPlaylist(parent, componentsNames.PLAYLIST).render();
    }

    /** Render Album in parent */
    renderAlbum(parent) {
        new Album(parent, setupAlbum()).render();
    }

    /** Render Track in parent */
    renderTrack(parent) {
        new Album(parent, setupAlbum()).render();
    }

    /** Render search content */
    renderSearchContent(parent) {
        new SearchContent(parent, componentsNames.SEARCH_CONTENT, { mainDiv: 'search-content' }).render();
    }
}

export default new ComponentsRenders();
