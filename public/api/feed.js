import Ajax from '../modules/Ajax.js';
import { PATH } from '../utils/config/urls.js';

// todo: change logic to three requests and concatenation to one items object to return.
/**
 * Function for main page content render.
 */
export async function feedAjax() {
    let items = { s: 'fsfs' };

    // todo change double then
    await Ajax.get({
        url: PATH.feedApi,
        reject: (message) => {
            console.error('Feed api error:', message);
        },
    }).then((data) => {
        items = data;
    });

    console.log('items', items);
    return items;
}
