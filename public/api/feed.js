import Ajax from '../modules/Ajax.js';
import { PATH } from '../utils/config/urls.js';

// todo: change logic to three requests and concatenation to one items object to return.
/**
 * Function for main page content render.
 */
export function feedAjax() {
    let items = {};
    Ajax.get({
        url: PATH.feedApi,
        resolve: (data) => {
            items = data;
            return data;
        },
    });

    return items;
}
