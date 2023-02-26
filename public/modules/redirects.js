'use strict'

function redirect(configSection, elements) {
    const el = document.querySelector(`[data-section="${configSection.key}"]`)
    if (el.classList.contains('active')) {
        return;
    }

    elements['renderArea'].innerHTML = '';
    elements['elementToDestroy'].innerHTML = '';

    const activeElement = document.querySelector('.active');
    if (activeElement !== undefined && activeElement !== null) {
        activeElement.classList.remove('active');
    }

    el.classList.add('active');

    configSection.render(elements['renderArea']);
}
