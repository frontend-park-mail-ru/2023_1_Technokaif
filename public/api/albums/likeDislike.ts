import { apiUrl } from '@config/apiUrls';
import { generatePageById } from '@functions/urlGenerators';
import Ajax from '../../modules/Ajax';

/**
 * Like album
 */
export async function likeAlbum(id) {
    const url = `${`${generatePageById(apiUrl.LIKE_ALBUM, id)}like`}`;

    await Ajax.post({
        url,
        body: null,
        reject: (message) => {
            console.error('Album request api error:', message);
        },
    });
}

/**
 * Dislike album
 */
export async function unLikeAlbum(id) {
    const url = `${`${generatePageById(apiUrl.UNLIKE_ALBUM, id)}unlike`}`;

    await Ajax.post({
        url,
        body: null,
        reject: (message) => {
            console.error('Album request api error:', message);
        },
    });
}
