import { apiUrl } from '@config/apiUrls';
import Ajax from '../../modules/Ajax';

export interface PlaylistContent {
    description: string,
    name: string,
    users: Array<number>
}

/**
 * Api-oriented user function.
 * @param playlistContent
 */
export async function createPlaylistAjaxRequest(playlistContent: PlaylistContent) {
    let playlistId;
    await Ajax.post({
        url: apiUrl.CREATE_PLAYLIST,
        body: playlistContent,
        reject: (message) => {
            console.error('Playlist creation api error:', message);
        },
    }).then((data) => {
        playlistId = data.id;
    });

    return playlistId;
}
