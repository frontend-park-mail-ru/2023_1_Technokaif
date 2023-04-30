import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented user function.
 * @param id
 */
export async function userFavoritePlaylistsAjax(id: string) {
    let playlists;
    await Ajax.get({
        url: apiUrl.USER_FAVOURITE_PLAYLISTS(id),
        reject: (message) => {
            console.error('User favorite playlists request api error:', message);
        },
    }).then((data) => {
        playlists = data;
    });

    return playlists;
}
