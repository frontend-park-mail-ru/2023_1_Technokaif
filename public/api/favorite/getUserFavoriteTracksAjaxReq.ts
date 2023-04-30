import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented user function.
 * @param id
 */
export async function userFavoriteTracksAjax(id: string) {
    let tracks;
    await Ajax.get({
        url: apiUrl.USER_FAVOURITE_TRACKS(id),
        reject: (message) => {
            console.error('User request api error:', message);
        },
    }).then((data) => {
        tracks = data;
    });

    return tracks;
}
