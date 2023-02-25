'use strict'

export function createInput(type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
}

export function createCheckbox(name = "") {
    const div = document.createElement('sex-inside');
    const input = document.createElement('input');
    input.type = "checkbox";
    const label = document.createElement('label');
    label.textContent = name;
    label.classList.add('text');
    div.appendChild(input);
    div.appendChild(label);

    return div;
}

export function createSelect(options, name) {
    const select = document.createElement('select');
    select.name = name;

    options.forEach((name) => {
        const option = document.createElement('option');
        option.value = name;
        option.innerText = name;
        select.appendChild(option);
    });

    return select;
}

export function createDivAndInsertInParent(parent, ...classes) {
    const divBlock = document.createElement('div');
    classes.forEach((cl) => {
        divBlock.classList.add(cl);
    });

    parent.appendChild(divBlock);
    return divBlock;
}

export function insertIntoElement(parent, ...elements) {
    elements.forEach((el) => {
        parent.appendChild(el);
    });
}

export function createSpanButton(clas, text, type = 'submit') {
    const button = document.createElement('span');

    button.classList.add(clas);
    button.textContent = text;
    button.type = type;

    return button;
}
