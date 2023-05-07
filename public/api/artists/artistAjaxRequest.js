import { apiUrl } from '@config/apiUrls';
import { generatePageById } from '@functions/urlGenerators';
import Ajax from '../../modules/Ajax.ts';

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
