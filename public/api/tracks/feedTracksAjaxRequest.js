import { apiUrl } from '@config/apiUrls';
import Ajax from '../../modules/Ajax.ts';

/**
 * Function for main page content render.
 */
export async function feedTracksAjax() {
    let items;

    await Ajax.get({
        url: apiUrl.FEED_TRACKS_API,
        reject: (message) => {
            console.error('Feed tracks api error:', message);
        },
    }).then((data) => {
        items = data;
    });

    return items;
}
