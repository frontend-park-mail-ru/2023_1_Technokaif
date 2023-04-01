import { componentsJSNames } from '../config/componentsJSNames';

/**
 * Function to clear root element.
 */
export function clearBars() {
    document.getElementById('root').innerHTML = '';
}

/**
 * Render Navbar and Menu components.
 */
export function prePageRender() {
    if (document.querySelector('factBody')) {
        return;
    }

    const bodyElement = document.createElement('factBody');
    bodyElement.classList.add('main-page-window__factBody');
    const menuElement = document.createElement('aside');
    menuElement.classList.add('sidebar');
    menuElement.classList.add(componentsJSNames.SIDEBAR);
    const mainElement = document.createElement('main');
    const contentElement = document.createElement('content-main');
    bodyElement.id = 'factBody';
    contentElement.id = 'main';
    mainElement.id = 'cont';

    const sidebarElement = document.createElement('div');
    sidebarElement.classList.add('navbar');
    sidebarElement.classList.add(componentsJSNames.NAVBAR);

    const root = document.getElementById('root');
    root.appendChild(bodyElement);
    bodyElement.appendChild(menuElement);
    bodyElement.appendChild(mainElement);
    mainElement.appendChild(sidebarElement);
    mainElement.appendChild(contentElement);
}
