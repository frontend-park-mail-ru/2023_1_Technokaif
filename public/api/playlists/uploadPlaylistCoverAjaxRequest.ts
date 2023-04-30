import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented user update avatar function.
 * @param id
 * @param cover
 */
export async function uploadPlaylistCover(id: string, cover: FormData) {
    let status;
    await Ajax.post({
        url: apiUrl.UPLOAD_PLAYLIST_COVER(id),
        body: cover,
        reject: (message) => {
            console.error('Upload playlist cover request api error:', message);
        },
    }).then(() => {
        status = 'OK';
    }).catch((message) => {
        status = message;
    });

    return status;
}
