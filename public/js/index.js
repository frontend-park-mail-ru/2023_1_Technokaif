'use strict'

import {renderLogin} from "../auth/auth.js"
import {Sidebar} from "../components/Sidebar/Sidebar.js"
import {renderSignup} from "../auth/registration.js"
import {config} from "./config";

console.log('lol kek cheburek');

const rootElement = document.getElementById('root');
const menuElement = document.createElement('aside');
const contentElement = document.createElement('main');
rootElement.appendChild(menuElement);
rootElement.appendChild(contentElement);

function renderSidebar(parent) {
    const sidebar = new Sidebar(parent, config);
    sidebar.render();
}

renderSidebar(contentElement);
