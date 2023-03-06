'use strict';

import { clearBars, prePageRender } from '../utils/functions/prePageRender.js';

export function redirect (configSection) {
    const el = document.querySelector(`[data-section="${configSection.key}"]`);
    if (el !== null && el.classList.contains('active')) {
        return;
    }

    const activeElement = document.querySelector('.active');
    if (activeElement !== undefined && activeElement !== null) {
        activeElement.classList.remove('active');
    }

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

    configSection.render(root);
}
