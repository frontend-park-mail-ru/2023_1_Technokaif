'use strict'

import {renderLogin, renderSignup} from "./auth/auth.js"

console.log('lol kek cheburek');

const rootElement = document.getElementById('root');
const contentElement = document.createElement('main');
rootElement.appendChild(contentElement);

renderLogin(contentElement);
