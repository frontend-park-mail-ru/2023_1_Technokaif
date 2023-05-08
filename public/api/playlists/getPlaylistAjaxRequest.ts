import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';

/**
 * Function for main page content render.
 */
export async function getPlaylist(id) {
    let playlist;

    await Ajax.get({
        url: apiUrl.PLAYLIST(id),
        reject: (message) => {
            console.error('Playlist request api error:', message);
        },
    }).then((data) => {
        playlist = data;
    });

    return playlist;
}
