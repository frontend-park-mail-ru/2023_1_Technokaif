'use strict';

/**
 * Create div block with classes and apeend it to parent
 * @param {HTMLElement} parent -- where to place div block
 * @param  {...any} classes -- what classes div block contain
 * @returns created div block
 */
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

/**
 * Create <p> element with class error. Add eventListener on element.
 * @param {*} event -- what event trigger appearance of error
 * @param {*} element -- which element to add the error
 * @param {*} where -- where error be placed
 * @param {*} errorMessage -- what message to display
 * @param {*} checkForErrors -- function to determine the error
 */
export function errorGenerate (event, element, where, errorMessage, checkForErrors) {
    element.addEventListener(event, (el) => {
        where.innerHTML = '';

        const errorExist = checkForErrors(element.value);
        if (errorExist) {
            const message = document.createElement('p');
            message.classList.add('error');
            message.textContent = errorMessage;

            where.appendChild(message);
        }
    });
}
