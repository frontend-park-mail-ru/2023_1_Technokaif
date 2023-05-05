import { apiUrl } from '@config/apiUrls';
import { generatePageById } from '@functions/urlGenerators';
import Ajax from '../../modules/Ajax';

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
