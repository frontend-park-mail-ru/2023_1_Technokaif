import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';

/**
 * Api-oriented track unlike function.
 * @param id
 */
export async function removeTrackLikeAjax(id: string) {
    let status;
    await Ajax.post({
        url: apiUrl.TRACK_UNLIKE(id),
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
