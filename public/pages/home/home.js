'use strict';

import { createContent } from '../../components/MainWindowRender/mainWindow.js';

export function renderHome (parent) {
    const home = document.createElement('div');

    Ajax.get({
        url: '/feed',
        callback: (status, responseString) => {
            let isAuthorized = false;

            if (status === 200) {
                isAuthorized = true;
            }

            const items = JSON.parse(responseString);

            if (items && Array.isArray(items)) {
                const div = document.createElement('div');
                home.appendChild(div);

                items.forEach(({ text, description, imgSrc }) => {
                    div.innerHTML += `<img src="${imgSrc}" width="500" /><div>${text}</div><div>${description}</div>`;
                });
            }
        }
    });

    parent.appendChild(home);
    createContent(home);
}

function renderUnAuthHome (parent) {

}
