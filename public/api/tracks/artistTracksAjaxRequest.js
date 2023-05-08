import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';

/**
 * Function for main page content render.
 */
export async function artistTracksAjax(id) {
    let items;

    await Ajax.get({
        url: apiUrl.ARTIST_TRACKS_API.bind(apiUrl)(id),
        reject: (message) => {
            console.error('Artist tracks request api error:', message);
        },
    }).then((data) => {
        items = data;
    });

    return items;
}
