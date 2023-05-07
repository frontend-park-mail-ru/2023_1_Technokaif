import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';
import {
    AlbumApi, ArtistApi, PlaylistApi, TracksApi,
} from '@api/ApiAnswers';

export declare interface SearchDispatch {
    type: ActionTypes.GOT_PLAYLIST_SEARCH|ActionTypes.GOT_ALBUMS_SEARCH
    |ActionTypes.GOT_TRACKS_SEARCH|ActionTypes.GOT_ARTISTS_SEARCH,
    items: AlbumApi|ArtistApi|TracksApi|PlaylistApi,
}

/** Global Action creator object. */
class ActionsSearch {
    /** Albums found by search */
    gotAlbums(albums:AlbumApi) {
        Dispatcher.dispatch({
            type: ActionTypes.GOT_ALBUMS_SEARCH,
            items: albums,
        });
    }

    /** Tracks found by search */
    gotTracks(tracks:TracksApi) {
        Dispatcher.dispatch({
            type: ActionTypes.GOT_TRACKS_SEARCH,
            items: tracks,
        });
    }

    /** Artists found by search */
    gotArtists(artists:ArtistApi) {
        Dispatcher.dispatch({
            type: ActionTypes.GOT_ARTISTS_SEARCH,
            items: artists,
        });
    }

    /** Playlist found by search */
    gotPlaylists(playlists:PlaylistApi) {
        Dispatcher.dispatch({
            type: ActionTypes.GOT_PLAYLIST_SEARCH,
            items: playlists,
        });
    }
}

export default new ActionsSearch();
