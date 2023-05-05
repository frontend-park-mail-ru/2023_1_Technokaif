import { apiUrl } from '@config/apiUrls';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented playlist track add function.
 * @param trackId
 * @param playlistId
 */
export async function addTrackAjaxRequest(playlistId: string, trackId: string) {
    let status;
    await Ajax.post({
        url: apiUrl.PLAYLIST_ADD_TRACK(playlistId, trackId),
        body: null,
        reject: (message) => {
            console.error('Playlist track add api error:', message);
        },
    }).then(() => {
        status = 'OK';
    }).catch((message) => {
        status = message;
    });

    return status;
}
