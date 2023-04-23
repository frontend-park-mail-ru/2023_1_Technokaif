import Ajax from '../../modules/Ajax.ts';
import { apiUrl } from '../../utils/config/apiUrls.js';
import { generatePageById } from '../../utils/functions/urlGenerators';

// todo can be rewritten to one function
/**
 * Function for get Artist track from server
 */
export async function trackOneAjax(id) {
    let items;
    const url = `${generatePageById(apiUrl.TRACK_API, id)}`;

    await Ajax.get({
        url,
        reject: (message) => {
            console.error('Track one request api error:', message);
        },
    }).then((data) => {
        items = data;
    });

    return items;
}
