import { checkAuth } from '../utils/functions/checkAuth';
import { authNavConfig, sidebarConfig, unAuthNavConfig } from '../utils/config/config';
import Navbar from './Navbar/Navbar';
import Menu from './Menu/Menu';
import { MainWindowContent } from './MainWindow/mainWindow';
import { componentsNames } from '../utils/config/ComponentsNames';

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
        const navbar = new Navbar(parent, config, 'navbar');
        navbar.render();
    }

    /**
     * Destroy Navbar component in parent block
     * @param {HTMLElement} parent -- from what delete component
     */
    unrenderNavbar(parent) {
        parent.removeChild(document.querySelector(`.${componentsNames.NAVBAR}`));
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
        parent.removeChild(document.querySelector(`.${componentsNames.SIDEBAR}`));
    }

    /**
     * Create Feed Content component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     * @param {*[]} tapesConfigs -- tape configs with artist, album and track items.
     */
    renderFeedContent(parent, tapesConfigs) {
        const mainPage = new MainWindowContent(parent, { mainPageWindowDiv: 'main-page-window' }, tapesConfigs);
        mainPage.render();
    }

    /**
     * Destroy Feed Content component in parent block
     * @param {HTMLElement} parent -- from what delete component
     */
    unrenderFeedContent(parent) {
        parent.removeChild(document.querySelector(`.${componentsNames.MAIN_PAGE_WINDOW}`));
    }
}

export default new ComponentsRenders();
