'use strict';

import { createHomePageContent } from '../components/MainWindowRender/mainWindow.js';

export function feedAjax (parent) {
    window.Ajax.get({
        url: '/api/feed',
        callback: ({ status, context }) => {
            if (status === 200) {
                createHomePageContent(parent, context);
                return;
            }

            alert('Error: ' + context);
        }
    });
}
