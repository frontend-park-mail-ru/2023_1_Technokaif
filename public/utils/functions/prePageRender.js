import { componentsJSNames } from '../config/componentsJSNames';

/**
 * Function to clear root element.
 */
export function clearBars() {
    document.querySelector('#root').innerHTML = '';
}

/**
 * Render Navbar and Menu components.
 */
export function prePageRender() {
    const bodyElement = document.createElement('factbody');
    bodyElement.classList.add('main-page-window__factBody');
    bodyElement.id = `${componentsJSNames.BODY}`;

    const root = document.querySelector('#root');
    root.appendChild(bodyElement);
}
