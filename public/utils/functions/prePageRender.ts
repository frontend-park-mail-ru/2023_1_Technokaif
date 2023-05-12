import { componentsJSNames } from '@config/componentsJSNames';

/**
 * Function to clear root element.
 */
export function clearBars() {
    const element = document.querySelector('#root');
    if (element) {
        element.innerHTML = '';
    }
}

/**
 * Render Navbar and Menu components.
 */
export function prePageRender() {
    let bodyElement = document.querySelector('#factbody');
    if (!bodyElement) {
        bodyElement = document.createElement('factbody');
    }

    bodyElement.classList.add('main-page-window__factBody');
    bodyElement.id = `${componentsJSNames.BODY}`;

    const root = document.querySelector('#root');
    if (!root) {
        console.error('Root doesn\'t exist');
        return;
    }
    root.appendChild(bodyElement);
}
