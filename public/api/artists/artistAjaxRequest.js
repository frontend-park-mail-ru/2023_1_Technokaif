import Ajax from '../../modules/Ajax.ts';
import { apiUrl } from '../../utils/config/apiUrls.js';
import { generatePageById } from '../../utils/functions/urlGenerators';

/**
 * Function for main page content render.
 */
export async function artistAjax(id) {
    let items;
    const url = generatePageById(apiUrl.ARTIST_API, id);

    await Ajax.get({
        url,
        reject: (message) => {
            console.error('Artist request api error:', message);
        },
    }).then((data) => {
        items = data;
    });

    return items;
}
