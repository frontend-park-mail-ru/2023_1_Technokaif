'use strict';

import { checkAuth } from './utils/checkAuth.js';
import { authNavConfig, sidebarConfig, unAuthNavConfig } from './utils/config.js';
import Menu from './components/Menu/Menu.js';
import { renderHome } from './pages/home/home.js';
import { createDivAndInsertInParent } from './utils/utils.js';
import Navbar from './components/Navbar/Navbar.js';
import { redirect } from './modules/redirects.js';

// console.log('lol kek cheburek');

const rootElement = document.getElementById('root');
const bodyElement = document.createElement('factBody');
const menuElement = document.createElement('aside');
export const contentElement = document.createElement('main');
rootElement.appendChild(bodyElement);
bodyElement.appendChild(menuElement);
bodyElement.appendChild(contentElement);

// const Handlebars = require('handlebars'/);
function renderSidebar (parent) {
    const sidebar = new Menu(parent, sidebarConfig, 'sidebar');
    sidebar.render();
}

function renderNavbar (parent) {
    const config = (checkAuth()) ? authNavConfig : unAuthNavConfig;

    const navbarDiv = createDivAndInsertInParent(parent, 'navbar');
    const navbar = new Navbar(navbarDiv, config, 'navbar');
    navbar.render();
}

menuElement.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
        const { section } = e.target.dataset;

        redirect(sidebarConfig[section], contentElement);
    }
});

contentElement.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) {
        e.preventDefault();
        const { section } = e.target.dataset;
        if (checkAuth()) {
            redirect(authNavConfig[section], contentElement);
        } else {
            redirect(unAuthNavConfig[section], rootElement, contentElement, menuElement);
        }
    }
});

function renderContent (parent) {
    renderHome(parent);
}

function renderMainPage () {
    renderSidebar(menuElement);
    renderNavbar(contentElement);
    renderContent(contentElement);
}

renderMainPage();
