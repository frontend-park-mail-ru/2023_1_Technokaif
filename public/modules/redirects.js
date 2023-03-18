import { clearBars, prePageRender } from '../utils/functions/prePageRender.js';

/**
 * Function to redirect to any page.
 * @param {json} configSection -- json with current config options using to redirect to page.
 */
export function redirect(configSection) {
    if (configSection.render === null) {
        return;
    }

    const el = document.querySelector(`[data-section="${configSection.key}"]`);
    if (el?.classList?.contains('.sidebar__item-active')) {
        return;
    }

    const activeElement = document.querySelector('.sidebar__item-active');
    if (activeElement !== undefined && activeElement !== null) {
        activeElement.classList.remove('sidebar__item-active');
    }

    el?.classList.add('sidebar__item-active');

    let root = null;

    if (configSection.key === 'login' || configSection.key === 'registration' || configSection.key === 'premium') {
        root = document.getElementById('root');
        clearBars();
    } else {
        if (document.getElementById('main') === null) {
            clearBars();
            prePageRender();
        }

        root = document.getElementById('main');
    }

    if (configSection.render !== null) {
        configSection.render(root);
    }
}
