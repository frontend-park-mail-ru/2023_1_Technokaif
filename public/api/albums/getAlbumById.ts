import Ajax from '../../modules/Ajax';
import { apiUrl } from '../../utils/config/apiUrls.js';
import { generatePageById } from '../../utils/functions/urlGenerators';

/**
 * get album by its ID
 */
export async function getAlbumById(id) {
    let items;
    const url = `${generatePageById(apiUrl.ALBUM_API, id)}`;

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
