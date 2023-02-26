'use strict'

function redirect(configSection, element) {
    const el = document.querySelector(`[data-section="${configSection.key}"]`)
    if (el.classList.contains('active')) {
        return;
    }

    element.innerHTML = '';

    document.querySelector('.active').classList.remove('active');
    el.classList.add('active');

    configSection.render(contentElement);
}
