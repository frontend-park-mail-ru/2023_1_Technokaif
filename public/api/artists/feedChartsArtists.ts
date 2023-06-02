import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';

/**
 * Function for main page content render.
 */
export async function feedChartArtistsAjax(days) {
    let items;

    await Ajax.post({
        url: apiUrl.FEED_ARTISTS_API,
        body: days,
        reject: (message) => {
            console.error('Feed albums api error:', message);
        },
    }).then((data) => {
        items = data;
    });

    return items;
}
