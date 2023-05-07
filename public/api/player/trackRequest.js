import { apiUrl } from '@config/apiUrls';
import { generatePageById } from '@functions/urlGenerators';
import Ajax from '../../modules/Ajax.ts';

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
