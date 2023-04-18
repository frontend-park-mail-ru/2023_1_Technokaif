import Ajax from '../../modules/Ajax.js';
import { apiUrl } from '../../utils/config/apiUrls.js';
import { generatePageById } from '../../utils/functions/urlGenerators';

/** Like track */
export async function likeTrack(id) {
    const url = `${`${generatePageById(apiUrl.LIKE_TRACK, id)}like`}`;
    await Ajax.post({
        url,
        reject: (message) => {
            console.error('Track request api error:', message);
        },
    });
}

/** Dislike track */
export async function unlikeTrack(id) {
    const url = `${`${generatePageById(apiUrl.UNLIKE_TRACK, id)}unlike`}`;
    await Ajax.post({
        url,
        reject: (message) => {
            console.error('Track request api error:', message);
        },
    });
}
