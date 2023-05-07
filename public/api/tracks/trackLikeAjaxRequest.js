import { apiUrl } from '@config/apiUrls';
import Ajax from '../../modules/Ajax.ts';

/**
 * Api-oriented track like function.
 * @param id
 */
export async function setTrackLikeAjax(id) {
    let status;
    await Ajax.post({
        url: apiUrl.TRACK_LIKE(id),
        body: null,
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
