'use strict'
import {renderLogin, renderSignup} from "./auth/auth.js"

console.log('lol kek cheburek');

const rootElement = document.getElementById('root');
const contentElement = document.createElement('main');
rootElement.appendChild(contentElement);

renderLogin(contentElement);

export function createInput(type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
}

export function createCheckbox(name = "") {
    const input = document.createElement('input');
    input.type = "checkbox";
    input.name = name;

    return input;
}

export function createSelect(options, name) {
    const select = document.createElement('select');
    select.name = name;

    options.forEach((name) => {
        const option = document.createElement('option');
        option.value = name;
        select.appendChild(option);
    });

    return select;
}
