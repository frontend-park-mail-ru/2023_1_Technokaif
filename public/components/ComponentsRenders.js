import { checkAuth } from '../utils/functions/checkAuth';
import { authNavConfig, sidebarConfig, unAuthNavConfig } from '../utils/config/config';
import Navbar from './Navbar/Navbar';
import Menu from './Menu/Menu';
import { MainWindowContent } from './MainWindow/mainWindow';
import { componentsNames } from '../utils/config/ComponentsNames';
import { Form } from './form/form';
import { logFormSetup } from '../pages/login/authSetup';
import { dateSetup, regFormSetup, sexSetup } from '../pages/registration/creationSetup';

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
        document.querySelector('#cont').removeChild(document.querySelector(`.${componentsNames.NAVBAR}`));
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
        document.querySelector('#factBody').removeChild(document.querySelector(`.${componentsNames.SIDEBAR}`));
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

    /**
     * Create Form for login component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderFormLogin(parent) {
        const form = new Form(
            parent,
            logFormSetup(),
        );

        form.render();
    }

    /**
     * Destroy Form for login component in parent block
     * @param {HTMLElement} parent -- from what delete component
     */
    unrenderFormLogin(parent) {
        parent.removeChild(document.querySelector(`.${componentsNames.FORM}`));
    }

    /**
     * Create Form for register component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     * @param genderConfig
     * @param dateConfig
     */
    renderFormRegister(parent) {
        // todo don't send configs here....
        const form = new Form(
            parent,
            regFormSetup(),
            sexSetup(),
            dateSetup(),
        );

        form.render();
    }

    /**
     * Destroy Form for register component in parent block
     * @param {HTMLElement} parent -- from what delete component
     */
    unrenderFormRegister(parent) {
        parent.removeChild(document.querySelector(`.${componentsNames.FORM}`));
    }
}

export default new ComponentsRenders();
