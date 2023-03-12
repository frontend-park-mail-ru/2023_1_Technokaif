import { clearBars, prePageRender } from '../utils/functions/prePageRender.js';

/**
 * Function to redirect to any page.
 * @param {json} configSection -- json with current config options using to redirect to page.
 */
export function redirect(configSection) {
    const el = document.querySelector(`[data-section="${configSection.key}"]`);
    // el !== null &&
    if (el?.classList?.contains('active')) {
        return;
    }

    // const activeElement = document.querySelector('.active');
    // if (activeElement !== undefined && activeElement !== null) {
    //     activeElement.classList.remove('active');
    // }

    el?.classList.add('active');

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

    if (configSection.render != null) {
        configSection.render(root);
    }
}
