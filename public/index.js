'use strict'

import {renderLogin} from "./api/auth/auth.js"
import {checkAuth} from "./api/auth/checkAuth.js"
import {renderSignup} from "./api/auth/registration.js"
import {authNavConfig, componentsConfig, sidebarConfig, unAuthNavConfig} from "./modules/config.js";
import Menu from "./components/Menu/Menu.js";
import {renderHome} from "./home/home.js";

console.log('lol kek cheburek');

const rootElement = document.getElementById('root');
const menuElement = document.createElement('aside');
const contentElement = document.createElement('main');
rootElement.appendChild(menuElement);
rootElement.appendChild(contentElement);

function renderSidebar(parent) {
    const sidebar = new Menu(parent, sidebarConfig, "sidebar");
    sidebar.render();
}

function renderNavbar(parent) {
    let config = {};
    if (checkAuth()) {
        config = authNavConfig;
    } else {
        config = unAuthNavConfig;
    }

    const navbar = new Menu(parent, config, "navbar");
    navbar.render();
}

menuElement.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
        const {section} = e.target.dataset;

        redirect(sidebarConfig[section], contentElement);
    }
});

contentElement.addEventListener('click', (e) => {
    if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
        const {section} = e.target.dataset;

        redirect(unAuthNavConfig[section], contentElement);
    }
});

function renderContent(parent) {
    renderHome(contentElement);
}

renderSidebar(menuElement);
renderNavbar(contentElement);
renderContent(contentElement);
