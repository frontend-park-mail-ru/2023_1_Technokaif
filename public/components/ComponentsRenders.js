import { checkAuth } from '../utils/functions/checkAuth';
import { authNavConfig, sidebarConfig, unAuthNavConfig } from '../utils/config/config';
import Navbar from './Navbar/Navbar';
import Menu from './Menu/Menu';
import { MainWindowContent } from './MainWindow/mainWindow';
import { Form } from './form/form';
import { logFormSetup } from '../utils/setup/loginSetup';
import { dateSetup, regFormSetup, sexSetup } from '../utils/setup/registrationSetup';
import { componentsJSNames } from '../utils/config/componentsJSNames';
import { HeaderWithButton } from './HeadetWithButton/headerWithButton';
import { page404Setup } from '../utils/setup/page404Setup';
import { componentsNames } from '../utils/config/componentsNames';

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
     * Rerender Navbar component in parent
     * @param {HTMLElement} parent -- where to place Navbar
     */
    reRenderNavbar(parent) {
        const config = (checkAuth()) ? authNavConfig : unAuthNavConfig;
        const name = (checkAuth()) ? 'authNavbar' : 'unAuthNavbar';

        const navbar = new Navbar(parent, config, name);
        navbar.reRender();
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
        parent.removeChild(document.querySelector(`.${componentsJSNames.FEED_CONTENT}`));
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
        parent.removeChild(document.querySelector(`.${componentsJSNames.FORM}`));
    }

    /**
     * Create Form for register component and render it in parent
     * @param {HTMLElement} parent -- where to place Sidebar
     */
    renderFormRegister(parent) {
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
}

export default new ComponentsRenders();
