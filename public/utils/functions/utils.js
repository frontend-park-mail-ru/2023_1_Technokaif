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

/**
 *
 * @param {string} elemToTranslate -- digit to translate to two digits
 * @returns digits in two symbols
 * @description if digits < 9 then it will return 0+digit else return digit
 */
export function translateOneDigitToTwo (elemToTranslate) {
    let result = elemToTranslate;
    if (elemToTranslate <= 9) {
        result = '0' + elemToTranslate;
    }
    return result;
}

/**
 * Create <p> element with class error. Add eventListener on element.
 * @param {string} event -- what event trigger appearance of error
 * @param {HTMLElement} element -- which element to add the error
 * @param {HTMLElement} where -- where error be placed
 * @param {string} errorMessage -- what message to display
 * @param {function} checkForErrors -- function to determine the error
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
