import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';

/**
 * Api-oriented login function.
 * @param {string} id Id of track that was listened
 */
export async function listenTrackAjaxRequest(id:string) {
    await Ajax.post({
        url: apiUrl.LISTEN_TRACK(id),
        body: { },
    }).catch((message) => {
        console.warn(message);
    });
}
