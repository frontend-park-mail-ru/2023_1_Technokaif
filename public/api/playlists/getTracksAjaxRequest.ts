import { apiUrl } from '@config/apiUrls';
import Ajax from '../../modules/Ajax';

/**
 * Function for main page content render.
 */
export async function getPlaylistTracks(id) {
    let tracks;

    await Ajax.get({
        url: apiUrl.PLAYLIST_TRACKS(id),
        reject: (message) => {
            console.error('Playlist tracks request api error:', message);
        },
    }).then((data) => {
        tracks = data;
    });

    return tracks;
}
