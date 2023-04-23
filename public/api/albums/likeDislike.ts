// @ts-ignore
import Ajax from '../../modules/Ajax.ts';
import { apiUrl } from '../../utils/config/apiUrls.js';
import { generatePageById } from '../../utils/functions/urlGenerators';

/**
 * Like album
 */
export async function likeAlbum(id) {
    const url = `${`${generatePageById(apiUrl.LIKE_ALBUM, id)}like`}`;

    // todo
    // @ts-ignore
    await Ajax.post({
        url,
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

    // todo
    // @ts-ignore
    await Ajax.post({
        url,
        reject: (message) => {
            console.error('Album request api error:', message);
        },
    });
}
