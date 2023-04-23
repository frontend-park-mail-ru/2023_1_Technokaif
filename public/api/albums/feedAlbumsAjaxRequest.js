import Ajax from '../../modules/Ajax.ts';
import { apiUrl } from '../../utils/config/apiUrls.js';

/**
 * Function for main page content render.
 */
export async function feedAlbumsAjax() {
    let items;

    await Ajax.get({
        url: apiUrl.FEED_ALBUMS_API,
        reject: (message) => {
            console.error('Feed albums api error:', message);
        },
    }).then((data) => {
        items = data;
    });

    return items;
}
