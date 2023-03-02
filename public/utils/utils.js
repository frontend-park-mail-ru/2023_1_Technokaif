'use strict';

export function createInput (type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
}

export function createCheckbox (name = '', type = 'checkbox', nameInEl = '') {
    const div = document.createElement('sex-inside');
    const input = document.createElement('input');
    input.type = type;
    if (nameInEl.length !== 0) {
        input.name = nameInEl;
    }

    const label = document.createElement('label');
    label.textContent = name;
    label.classList.add('text');
    div.appendChild(input);
    div.appendChild(label);

    return div;
}


export function createDivAndInsertInParent (parent, ...classes) {
    const divBlock = document.createElement('div');
    classes.forEach((cl) => {
        divBlock.classList.add(cl);
    });

    parent.appendChild(divBlock);
    return divBlock;
}

export function insertScriptAndReturnTemplate (parent, contextJson, templateHTML) {
    const template = Handlebars.compile(templateHTML);

    parent.innerHTML += template(contextJson);
}

export function translateOneDigitToTwo (elemToTranslate) {
    let result = elemToTranslate;
    if (elemToTranslate <= 9) {
        result = '0' + elemToTranslate;
    }
    return result;
}

export function errorGenerate (event, element, where, errorMessage, callback) {
    element.addEventListener(event, (el) => {
        where.innerHTML = '';

        if (!callback(element.value)) {
            const message = document.createElement('p');
            message.classList.add('error');
            message.textContent = errorMessage;

            where.appendChild(message);
        }
    });
}
