import Ajax from '../../modules/Ajax';
import { apiUrl } from '../../utils/config/apiUrls.js';

/**
 * Like/dislike playlist
 */
export async function likePlaylist(id) {
    let status;
    await Ajax.post({
        url: apiUrl.PLAYLIST_LIKE(id),
        body: null,
        reject: (message) => {
            console.error('Playlist like request api error:', message);
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
export async function dislikePlaylist(id) {
    let status;
    await Ajax.post({
        url: apiUrl.PLAYLIST_UNLIKE(id),
        body: null,
        reject: (message) => {
            console.error('Playlist dislike request api error:', message);
        },
    }).then(() => {
        status = 'OK';
    }).catch((message) => {
        status = message;
    });

    return status;
}
