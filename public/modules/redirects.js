'use strict';

// todo: el in redirect() can be null e.g. if we redirect from reg to auth. Change logic.
export function redirect (configSection, renderAreaElement, ...elementsToDestroy) {
    const el = document.querySelector(`[data-section="${configSection.key}"]`);
    if (el !== null && el.classList.contains('active')) {
        return;
    }

    elementsToDestroy.forEach((el) => {
        el.innerHTML = '';
    });

    const activeElement = document.querySelector('.active');
    if (activeElement !== undefined && activeElement !== null) {
        activeElement.classList.remove('active');
    }

    el.classList.add('active');

    configSection.render(renderAreaElement);
}
