import Ajax from '../../modules/Ajax.ts';
import { apiUrl } from '../../utils/config/apiUrls.js';
import { generatePageById } from '../../utils/functions/urlGenerators';

// todo can be rewritten to one function
/**
 * Function for get Album track from server
 */
export async function getAlbumTracksFromServer(id) {
    let items;
    const url = `${generatePageById(apiUrl.ALBUM_API, id)}tracks`;

    await Ajax.get({
        url,
        reject: (message) => {
            console.error('Album request api error:', message);
        },
    }).then((data) => {
        items = data;
    });

    return items;
}
