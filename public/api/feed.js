import { createHomePageContent } from '../components/MainWindow/mainWindow.js';
import { Ajax } from '../modules/ajax.js';
import { PATH } from '../utils/config/urls.js';

/**
 * Function for main page content render.
 * @param {HTMLElement} parent
 */
export function feedAjax(parent) {
    const AjaxReq = new Ajax();
    AjaxReq.get({
        url: PATH.feedApi,
        whatRender: ({ status, context }) => {
            if (status === 200) {
                createHomePageContent(parent, context);
            }
        },
    });
}
