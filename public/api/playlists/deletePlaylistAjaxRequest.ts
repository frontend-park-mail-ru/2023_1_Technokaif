import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';

/**
 * Api-oriented user function.
 * @param id
 */
export async function deletePlaylistAjaxRequest(id: string) {
    let msg;
    await Ajax.delete({
        url: apiUrl.DELETE_PLAYLIST(id),
        reject: (message) => {
            console.error('Playlist creation api error:', message);
        },
    }).then((message) => {
        msg = message;
    });

    return msg;
}
