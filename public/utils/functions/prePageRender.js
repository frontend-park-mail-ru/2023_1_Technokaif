import Menu from '../../components/Menu/Menu.js';
import { authNavConfig, sidebarConfig, unAuthNavConfig } from '../config/config.js';
import { checkAuth } from './checkAuth.js';
import { createDivAndInsertInParent } from './utils.js';
import Navbar from '../../components/Navbar/Navbar.js';

/**
 * Function to clear root element.
 */
export function clearBars() {
    document.getElementById('root').innerHTML = '';
}

function renderSidebar(parent) {
    const sidebar = new Menu(parent, sidebarConfig, 'sidebar');
    sidebar.render();
}

function renderNavbar(parent) {
    const config = (checkAuth()) ? authNavConfig : unAuthNavConfig;

    const navbarDiv = createDivAndInsertInParent(parent, 'navbar');
    const navbar = new Navbar(navbarDiv, config, 'navbar');
    navbar.render();
}

/**
 * Render Navbar and Menu components.
 */
export function prePageRender() {
    const bodyElement = document.createElement('factBody');
    const menuElement = document.createElement('aside');
    const mainElement = document.createElement('main');
    const contentElement = document.createElement('content-main');
    bodyElement.id = 'factBody';
    contentElement.id = 'main';
    mainElement.id = 'cont';

    const root = document.getElementById('root');
    root.appendChild(bodyElement);
    bodyElement.appendChild(menuElement);
    renderSidebar(menuElement);
    bodyElement.appendChild(mainElement);
    renderNavbar(mainElement);
    mainElement.appendChild(contentElement);
}
