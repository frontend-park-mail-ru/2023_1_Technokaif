import { apiUrl } from '@config/apiUrls';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented playlist track remove function.
 * @param trackId
 * @param playlistId
 */
export async function removeTrackAjaxRequest(playlistId: string, trackId: string) {
    let status;
    await Ajax.delete({
        url: apiUrl.PLAYLIST_DELETE_TRACK(playlistId, trackId),
        reject: (message) => {
            console.error('Playlist track remove api error:', message);
        },
    }).then(() => {
        status = 'OK';
    }).catch((message) => {
        status = message;
    });

    return status;
}
