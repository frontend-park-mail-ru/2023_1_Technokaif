import { Playlist } from '@setup/playlistSetup';
import { imgPath } from '@config/pathConfig';

interface listOfItems {
    jsMain: string,
    mainElement: string,
    blockOfItem: string,
    coverClass: string,
    titleClass: string,
    defaultSrc: string,

    items: Playlist
}

/**
 * Function to set up menu placed list of playlists
 * @param playlists
 */
export function setupMenuPlaylists(playlists: Playlist) : listOfItems {
    return {
        jsMain: 'js__menu-playlists',
        mainElement: 'menu-playlists',
        blockOfItem: 'playlist-item',
        coverClass: 'playlist-cover',
        titleClass: 'menu-playlist-name',
        defaultSrc: imgPath.defaultAlbum,

        items: playlists,
    };
}
