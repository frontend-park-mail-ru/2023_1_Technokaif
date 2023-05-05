import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';

/** Global Action creator object. */
const ActionsSearch = {
    /** Albums found by search */
    gotAlbums(albums) {
        Dispatcher.dispatch({
            // @ts-ignore
            type: ActionTypes.GOT_ALBUMS_SEARCH,
            items: albums,
        });
    },

    /** Tracks found by search */
    gotTracks(tracks) {
        Dispatcher.dispatch({
            // @ts-ignore
            type: ActionTypes.GOT_TRACKS_SEARCH,
            items: tracks,
        });
    },

    /** Artists found by search */
    gotArtists(artists) {
        Dispatcher.dispatch({
            // @ts-ignore
            type: ActionTypes.GOT_ARTISTS_SEARCH,
            items: artists,
        });
    },

    /** Playlist found by search */
    gotPlaylists(playlists) {
        Dispatcher.dispatch({
            // @ts-ignore
            type: ActionTypes.GOT_PLAYLIST_SEARCH,
            items: playlists,
        });
    },
};

export default ActionsSearch;
