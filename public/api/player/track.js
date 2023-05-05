import { apiUrl } from '@config/apiUrls';
import { generatePageById } from '@functions/urlGenerators';
import Ajax from '../../modules/Ajax.ts';

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
