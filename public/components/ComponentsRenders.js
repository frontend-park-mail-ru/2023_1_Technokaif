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

/**
 * Class for components renders functions.
 */
class ComponentsRenders {
    // todo: change function of navbar rendering. Make middleware for auth and navbar class inside
    //  navbar component render.
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
     * Destroy Navbar component in parent block
     * @param {HTMLElement} parent -- from what delete component
     */
    unrenderNavbar(parent) {
        parent.removeChild(document.querySelector(`.${componentsJSNames.NAVBAR}`));
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
     * Destroy Sidebar component in parent block
     * @param {HTMLElement} parent -- from what delete component
     */
    unrenderSidebar(parent) {
        parent.removeChild(document.querySelector(`.${componentsJSNames.SIDEBAR}`));
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
     * Destroy Sidebar component in parent block
     * @param {HTMLElement} parent -- from what delete component
     */
    unrenderMainElement(parent) {
        parent.removeChild(document.querySelector(`.${componentsJSNames.MAIN}`));
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
     * Destroy Feed Content component in parent block
     * @param {HTMLElement} parent -- from what delete component
     */
    unrenderFeedContent(parent) {
        parent.removeChild(document.querySelector(`.${componentsJSNames.FEED_CONTENT}`));
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
     * Destroy Feed Content component in parent block
     * @param {HTMLElement} parent -- from what delete component
     */
    unrenderArtistContent(parent) {
        parent.removeChild(document.querySelector(`.${componentsJSNames.ARTIST_CONTENT}`));
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
     * Destroy Form for login component in parent block
     * @param {HTMLElement} parent -- from what delete component
     */
    unrenderFormLogin(parent) {
        parent.removeChild(document.querySelector(`.${componentsJSNames.FORM}`));
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
     * Destroy Form for register component in parent block
     * @param {HTMLElement} parent -- from what delete component
     */
    unrenderFormRegister(parent) {
        parent.removeChild(document.querySelector(`.${componentsJSNames.FORM}`));
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
     * Destroy Page404 component in parent block
     * @param {HTMLElement} parent -- from what delete component
     */
    unrenderPage404(parent) {
        parent.removeChild(document.querySelector(`.${componentsJSNames.PAGE404}`));
    }

    /**
     * Create UserPage
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderUserPage(parent) {
        const user = new User(parent, userSetup());
        user.render();
    }

    /**
     * Destroy UserPage component in parent block
     * @param {HTMLElement} parent -- from what delete component
     */
    unrenderUserPage(parent) {
        parent.removeChild(document.querySelector(`.${componentsJSNames.USER}`));
    }
}

export default new ComponentsRenders();
