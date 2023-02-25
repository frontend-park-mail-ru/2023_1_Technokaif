'use strict'

import {renderLogin} from "./auth/auth.js"
import Sidebar from "./components/Sidebar/Sidebar.js"
import {renderSignup} from "./auth/registration.js"
import {config} from "./modules/config.js";

console.log('lol kek cheburek');

const rootElement = document.getElementById('root');
const menuElement = document.createElement('aside');
const contentElement = document.createElement('main');
rootElement.appendChild(menuElement);
rootElement.appendChild(contentElement);

function renderSidebar(parent) {
    const sidebar = new Sidebar(parent, config);
    console.log(sidebar.items)
    console.log(sidebar.config)
    sidebar.render();
}

function renderContent(parent) {
    //const main = new Main(parent, )
    renderSignup(parent);
}

renderSidebar(menuElement);
renderContent(contentElement);
