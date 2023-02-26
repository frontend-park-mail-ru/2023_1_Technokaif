'use strict';
import { renderLogin } from './api/auth/auth.js';
import { checkAuth } from './api/auth/checkAuth.js';
import { renderSignup } from './api/auth/registration.js';
import { authNavConfig, componentsConfig, sidebarConfig, unAuthNavConfig } from './modules/config.js';
import Menu from './components/Menu/Menu.js';
import { renderHome } from './pages/home/home.js';
import { createDivAndInsertInParent } from './utils/utils.js';
import Navbar from './components/Navbar/Navbar.js';

console.log('lol kek cheburek');

const rootElement = document.getElementById('root');
const menuElement = document.createElement('aside');
const contentElement = document.createElement('main');
rootElement.appendChild(menuElement);
rootElement.appendChild(contentElement);

// const Handlebars = require('handlebars'/);
function renderSidebar (parent) {
    const sidebar = new Menu(parent, sidebarConfig, 'sidebar');
    sidebar.render();
}

function renderNavbar (parent) {
    let config = {};

    localStorage.setItem('jwt', 'warshfna');
    localStorage.clear();

    if (checkAuth()) {
        config = authNavConfig;
    } else {
        config = unAuthNavConfig;
    }

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
        const elements = {};
        if (checkAuth()) {
            elements.renderArea = contentElement;
        } else {
            elements.renderArea = menuElement;
            elements.elementToDestroy = contentElement;
        }

        redirect(unAuthNavConfig[section], elements);
    }
});

function renderContent (parent) {
    renderHome(parent);
}

function printLogo (parent) {
    const logoDiv = createDivAndInsertInParent(parent, 'logo');
    logoDiv.innerHTML += '<h1>Fluire</h1>';
}

function renderMainPage () {
    printLogo(menuElement);
    renderSidebar(menuElement);
    renderNavbar(contentElement);
    renderContent(contentElement);
}

renderMainPage();
