import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented track unlike function.
 * @param id
 */
export async function removeTrackLikeAjax(id) {
    let status;
    await Ajax.post({
        url: apiUrl.TRACK_UNLIKE(id),
        reject: (message) => {
            console.error('Track like request api error:', message);
        },
    }).then(() => {
        status = 'OK';
    }).catch((message) => {
        status = message;
    });

    return status;
}