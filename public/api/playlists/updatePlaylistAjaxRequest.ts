import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';
import { PlaylistContent } from './createPlaylistAjaxRequest';

/**
 * Api-oriented user function.
 * @param id
 * @param playlistContent
 */
export async function updatePlaylistAjaxRequest(id: string, playlistContent: PlaylistContent) {
    let status;
    await Ajax.post({
        url: apiUrl.UPDATE_PLAYLIST(id),
        body: playlistContent,
        reject: (message) => {
            console.error('Playlist creation api error:', message);
        },
    }).then(() => {
        status = 'OK';
    }).catch((message) => {
        status = message;
    });

    return status;
}
