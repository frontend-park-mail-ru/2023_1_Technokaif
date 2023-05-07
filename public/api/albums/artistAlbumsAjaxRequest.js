import { apiUrl } from '@config/apiUrls';
import Ajax from '../../modules/Ajax.ts';

/**
 * Function for main page content render.
 */
export async function artistAlbumsAjax(id) {
    let items;

    await Ajax.get({
        url: apiUrl.ARTIST_ALBUMS_API.bind(apiUrl)(id),
        reject: (message) => {
            console.error('Artist albums request api error:', message);
        },
    }).then((data) => {
        items = data;
    });

    return items;
}
