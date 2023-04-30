import { checkAuth } from '../utils/functions/checkAuth';
import { authNavConfig, sidebarConfig, unAuthNavConfig } from '../utils/config/config';
import Navbar from './bigComponents/Navbar/Navbar';
import Menu from './bigComponents/Menu/Menu';
import { FeedContent } from './bigComponents/FeedContent/feedContent';
import { componentsJSNames } from '../utils/config/componentsJSNames';
import { HeaderWithButton } from './smallComponents/HeaderWithButton/headerWithButton';
import { page404Setup } from '../utils/setup/page404Setup';
import { componentsNames } from '../utils/config/componentsNames';
import { ArtistContent } from './bigComponents/ArtistContent/artistContent';
import { setupArtistContent } from '../utils/setup/artistSetup';
import { userSetup } from '../utils/setup/userSetup';
import { User } from './bigComponents/userComponent/user';
import { RegisterComponent } from './bigComponents/registerComponent/registerComponent';
import { LoginComponent } from './bigComponents/loginComponent/loginComponent';
import Router from '../router/Router';
import { Album } from './bigComponents/Album/album.js';
import { setupAlbum } from '../utils/setup/albumSetup';
import { LibraryList } from './smallComponents/libraryList/libraryList';
import { FavoriteTracks } from './bigComponents/Playlist/Library/favoriteTracks';
import { FavoriteArtists } from './bigComponents/Library/favoriteArtists';
import { FavoriteAlbums } from './bigComponents/Library/favoriteAlbums';
import { SearchLine } from './smallComponents/searchLine/search';
import { searchSetup } from '../utils/setup/searchSetup';
import { SearchContent } from './bigComponents/searchContent/searchContent';
import { PlayerWithDummy } from './bigComponents/playerWithDummy/playerWithDummy';

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

        const navbar = new Navbar(parent, config, name);
        navbar.render();
    }

    /**
     * Create Sidebar component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderSidebar(parent) {
        const sidebar = new Menu(parent, sidebarConfig, 'sidebar');
        sidebar.render();
    }

    /**
     * Create Sidebar component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderMainElement(parent) {
        const main = document.createElement('main');
        main.classList.add(`${componentsJSNames.MAIN}`, `${componentsNames.MAIN}`);
        main.id = 'cont';

        parent.appendChild(main);
    }

    /**
     * Create Feed Content component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderFeedContent(parent) {
        const mainPage = new FeedContent(parent, { mainPageWindowDiv: 'main-page-window' });
        mainPage.render();
    }

    /**
     * Create Feed Content component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderArtistContent(parent) {
        const artistPage = new ArtistContent(parent, setupArtistContent());
        artistPage.render();
    }

    /**
     * Create Form for login component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderFormLogin(parent) {
        const form = new LoginComponent(parent);
        form.render();
    }

    /**
     * Create Form for register component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderFormRegister(parent) {
        const form = new RegisterComponent(parent);
        form.render();
    }

    /**
     * Create Page404
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderPage404(parent) {
        const page404 = new HeaderWithButton(parent, page404Setup());
        page404.render();
    }

    /**
     * Create UserPage
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderUserPage(parent) {
        if (!checkAuth()) {
            Router.go('/');
            return;
        }

        const user = new User(parent, userSetup());
        user.render();
    }

    /** Render player in parent */
    renderPlayer(parent) {
        const player = new PlayerWithDummy(parent);
        player.render();
    }

    /** Render in navbar */
    renderLibraryList(parent) {
        if (!checkAuth()) {
            Router.go('/login');
        }

        const libraryList = new LibraryList(parent);
        libraryList.render();
    }

    /** Render library in parent */
    renderTracksLibrary(parent) {
        if (!checkAuth()) {
            Router.go('/login');
        }

        const library = new FavoriteTracks(parent, componentsNames.LIBRARY_TRACKS);
        library.renderFavoriteTracks();
    }

    /** Render library in parent */
    renderArtistsLibrary(parent) {
        if (!checkAuth()) {
            Router.go('/login');
        }

        const library = new FavoriteArtists(parent, componentsNames.LIBRARY_ARTISTS);
        library.renderFavoriteArtists();
    }

    /** Render library in parent */
    renderAlbumsLibrary(parent) {
        if (!checkAuth()) {
            Router.go('/login');
        }

        const library = new FavoriteAlbums(parent, componentsNames.LIBRARY_ALBUMS);
        library.renderFavoriteAlbums();
    }

    /** Render Album in parent */
    renderAlbum(parent) {
        const album = new Album(parent, setupAlbum());
        album.render();
    }

    /** Render search line */
    renderSearchLine(parent) {
        const searchLine = new SearchLine(parent, searchSetup().searchLine);
        searchLine.render();
    }

    /** Render search content */
    renderSearchContent(parent) {
        const searchContent = new SearchContent(parent, componentsNames.SEARCH_CONTENT, { mainDiv: 'search-content' });
        searchContent.render();
    }
}

export default new ComponentsRenders();
