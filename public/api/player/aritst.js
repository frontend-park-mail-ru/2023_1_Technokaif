import Ajax from '../../modules/Ajax.js';
import { apiUrl } from '../../utils/config/apiUrls.js';
import { generatePageById } from '../../utils/functions/urlGenerators';

// todo can be rewritten to one function
/**
 * Function for get Artist track from server
 */
export async function artistAjax(id) {
    let items;
    const url = `${generatePageById(apiUrl.ARTIST_API, id)}/tracks`;

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
