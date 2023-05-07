import { apiUrl } from '@config/apiUrls';
import Ajax from '../../modules/Ajax';

/**
 * Like album
 */
export async function likeArtist(id) {
    let status;
    await Ajax.post({
        url: apiUrl.ARTIST_LIKE(id),
        body: null,
        reject: (message) => {
            console.error('Artist like request api error:', message);
        },
    }).then(() => {
        status = 'OK';
    }).catch((message) => {
        status = message;
    });

    return status;
}

/**
 * Dislike album
 */
export async function unLikeArtist(id) {
    let status;
    await Ajax.post({
        url: apiUrl.ARTIST_UNLIKE(id),
        body: null,
        reject: (message) => {
            console.error('Artist unlike request api error:', message);
        },
    }).then(() => {
        status = 'OK';
    }).catch((message) => {
        status = message;
    });

    return status;
}
