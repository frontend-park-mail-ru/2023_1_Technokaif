import { apiUrl } from '@config/apiUrls';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented user function.
 * @param id
 */
export async function userFavoriteAlbumsAjax(id: string) {
    let albums;
    await Ajax.get({
        url: apiUrl.USER_FAVOURITE_ALBUMS(id),
        reject: (message) => {
            console.error('User request api error:', message);
        },
    }).then((data) => {
        albums = data;
    });

    return albums;
}
