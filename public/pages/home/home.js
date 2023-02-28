'use strict';

import { createHomePageContent } from '../../components/MainWindowRender/mainWindow.js';

export function renderHome (parent) {
    window.Ajax.get({
        url: '/feed',
        callback: (status, responseString) => {
            const items = JSON.parse(responseString);
            if (status === 200) {
                createHomePageContent(parent, items);
                return;
            }

            alert('error');
        }
    });
}
