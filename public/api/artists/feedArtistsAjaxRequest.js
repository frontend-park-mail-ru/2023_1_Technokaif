import Ajax from '../../modules/Ajax.js';
import { PATH } from '../../utils/config/urls.js';

/**
 * Function for main page content render.
 */
export async function feedArtistsAjax() {
    let items;

    await Ajax.get({
        url: PATH.feedArtistsApi,
        reject: (message) => {
            console.error('Feed artists api error:', message);
        },
    }).then((data) => {
        items = data;
    });

    return items;
}
