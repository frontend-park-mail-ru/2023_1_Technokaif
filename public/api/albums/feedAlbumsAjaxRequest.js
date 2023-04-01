import Ajax from '../../modules/Ajax.js';
import { PATH } from '../../utils/config/urls.js';

/**
 * Function for main page content render.
 */
export async function feedAlbumsAjax() {
    let items;

    await Ajax.get({
        url: PATH.feedAlbumsApi,
        reject: (message) => {
            console.error('Feed albums api error:', message);
        },
    }).then((data) => {
        items = data;
    });

    return items;
}
