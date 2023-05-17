import { apiUrl } from '@config/apiUrls';
import { generatePageById } from '@functions/urlGenerators';
import Ajax from '@modules/Ajax';

// todo can be rewritten to one function
/**
 * Function for get Album track from server
 */
export async function getAlbumTracksFromServer(id: string) {
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
