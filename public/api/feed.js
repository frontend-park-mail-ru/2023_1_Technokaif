'use strict';

import { createHomePageContent } from '../components/MainWindowRender/mainWindow.js';
import { Ajax } from '../modules/ajax.js';
import { PATH } from '../utils/urls.js';

export function feedAjax (parent) {
    const AjaxReq = new Ajax();
    AjaxReq.get({
        url: PATH.feedApi,
        whatRender: ({ status, context }) => {
            if (status === 200) {
                createHomePageContent(parent, context);
                return;
            }

            alert('Error: ' + context);
        }
    });
}
