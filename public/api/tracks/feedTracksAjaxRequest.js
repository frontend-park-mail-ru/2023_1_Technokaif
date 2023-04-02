import Ajax from '../../modules/Ajax.js';
import { PATH } from '../../utils/config/urls.js';

/**
 * Function for main page content render.
 */
export async function feedTracksAjax() {
    let items;

    await Ajax.get({
        url: PATH.feedTracksApi,
        reject: (message) => {
            console.error('Feed tracks api error:', message);
        },
    }).then((data) => {
        items = data;
    });

    return items;
}
