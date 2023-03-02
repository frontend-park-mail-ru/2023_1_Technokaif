'use strict';

import { createHomePageContent } from '../../components/MainWindowRender/mainWindow.js';
import { PATH } from '../../utils/urls.js';

export function renderHome (parent) {
    window.Ajax.get({
        url: PATH.feedApi,
        callback: ({ status, context }) => {
            if (status === 200) {
                createHomePageContent(parent, context);
                return;
            }

            alert('Error: ' + context);
        }
    });
}
