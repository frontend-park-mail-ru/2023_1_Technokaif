import { createHomePageContent } from '../components/MainWindow/mainWindow.js';
import Ajax from '../modules/Ajax.js';
import { PATH } from '../utils/config/urls.js';

/**
 * Function for main page content render.
 * @param {HTMLElement} parent
 */
export function feedAjax(parent) {
    Ajax.get({
        url: PATH.feedApi,
        resolve: (data) => {
            createHomePageContent(parent, data);
        },
    });
}
