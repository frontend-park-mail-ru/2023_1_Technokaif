import { apiUrl } from '@config/apiUrls';
import { generatePageById } from '@functions/urlGenerators';
import Ajax from '../../modules/Ajax.ts';

// todo can be rewritten to one function
/**
 * Function for get Artist track from server
 */
export async function artistTracksAjax(id) {
    let items;
    const url = `${generatePageById(apiUrl.ARTIST_API, id)}tracks`;

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
