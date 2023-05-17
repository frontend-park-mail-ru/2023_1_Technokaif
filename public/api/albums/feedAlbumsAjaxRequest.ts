import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';

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
