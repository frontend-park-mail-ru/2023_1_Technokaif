import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented user function.
 * @param id
 */
export async function userPlaylistsAjax(id: string) {
    let playlists;
    await Ajax.get({
        url: apiUrl.USER_PLAYLISTS(id),
        reject: (message) => {
            console.error('User request api error:', message);
        },
    }).then((data) => {
        playlists = data;
    });

    return playlists;
}
