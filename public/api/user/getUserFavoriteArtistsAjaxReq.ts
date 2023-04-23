import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented user function.
 * @param id
 */
export async function userFavoriteArtistsAjax(id: string) {
    let artists;
    await Ajax.get({
        url: apiUrl.USER_FAVOURITE_ARTISTS(id),
        reject: (message) => {
            console.error('User request api error:', message);
        },
    }).then((data) => {
        artists = data;
    });

    return artists;
}
