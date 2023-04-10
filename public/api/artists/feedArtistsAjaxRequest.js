import Ajax from '../../modules/Ajax.js';
import { apiUrl } from '../../utils/config/apiUrls.js';

/**
 * Function for main page content render.
 */
export async function feedArtistsAjax() {
    let items;

    await Ajax.get({
        url: apiUrl.FEED_ARTISTS_API,
        reject: (message) => {
            console.error('Feed artists api error:', message);
        },
    }).then((data) => {
        items = data;
    });

    return items;
}
