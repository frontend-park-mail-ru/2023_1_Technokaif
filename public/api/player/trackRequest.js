import Ajax from '../../modules/Ajax.ts';
import { apiUrl } from '../../utils/config/apiUrls.js';
import { generatePageById } from '../../utils/functions/urlGenerators';

/**
 * Function for get Track tape from server
 */
export async function trackAjax(id) {
    let items;
    const url = `${generatePageById(apiUrl.TRACK_API, id)}`;

    await Ajax.get({
        url,
        reject: (message) => {
            console.error('Track request api error:', message);
        },
    }).then((data) => {
        items = data;
    });

    return items;
}
