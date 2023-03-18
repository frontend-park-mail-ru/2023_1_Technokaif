/**
 * Create div block with classes and apeend it to parent
 * @param {HTMLElement} parent -- where to place div block
 * @param  {...any} classes -- what classes div block contain
 * @return created div block
 */
export function createDivAndInsertInParent(parent, ...classes) {
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
 * @return digits in two symbols
 * @description if digits < 9 then it will return 0+digit else return digit
 */
export function translateOneDigitToTwo(elemToTranslate) {
    let result = elemToTranslate;
    if (elemToTranslate <= 9) {
        result = `0${elemToTranslate}`;
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
export function errorGenerate(event, element, where, errorMessage, checkForErrors) {
    element.addEventListener(event, () => {
        where.innerHTML = '';

        if (element.value === '') {
            return;
        }

        const errorExist = checkForErrors(element.value);
        if (errorExist) {
            const message = document.createElement('p');
            message.classList.add('error');
            message.textContent = errorMessage;

            where.appendChild(message);
        }
    });
}

/**
 *
 * @param {HTMLElements} buttons -- radio buttons to checked
 * @returns array of string values of all checked buttons
 */
export function getCheckedValueRadioButtons(buttons) {
    const rad = buttons;
    const elements = [];
    for (let i = 0; i < rad.length; i++) {
        if (rad[i].checked) {
            elements.push(rad[i].value);
        }
    }
    return elements;
}
