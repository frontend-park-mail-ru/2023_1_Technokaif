import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';

class PlaylistActions {
    /** User playlists page api */
    playlist(playlistId) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_PLAYLIST,
            playlistId,
        });
    }

    /** User playlists page api */
    playlistTracks(playlistId, offset = 0) {
        Dispatcher.dispatch({
            type: ActionTypes.GET_PLAYLIST_TRACKS,
            playlistId,
            offset,
        });
    }

    /** Playlists like page api */
    likePlaylist(playlistId) {
        Dispatcher.dispatch({
            type: ActionTypes.LIKE_PLAYLIST,
            playlistId,
        });
    }

    /** Playlists like page api */
    unlikePlaylist(playlistId) {
        Dispatcher.dispatch({
            type: ActionTypes.UNLIKE_PLAYLIST,
            playlistId,
        });
    }

    /** User playlists page api */
    createPlaylist(playlistData) {
        Dispatcher.dispatch({
            type: ActionTypes.CREATE_PLAYLIST,
            playlistData,
        });
    }

    /** User playlists page api */
    updatePlaylist(id, playlistData) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_PLAYLIST,
            id,
            playlistData,
        });
    }

    /** User playlists page api */
    deletePlaylist(id) {
        Dispatcher.dispatch({
            type: ActionTypes.DELETE_PLAYLIST,
            id,
        });
    }

    /** User playlists page api */
    uploadPlaylistCover(id, cover) {
        Dispatcher.dispatch({
            type: ActionTypes.UPLOAD_PLAYLIST_COVER,
            id,
            cover,
        });
    }

    /** User playlists page api */
    addTrackInPlaylist(playlistId, trackId) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_TRACK_IN_PLAYLIST,
            playlistId,
            trackId,
        });
    }

    /** User playlists page api */
    removeTrackFromPlaylist(playlistId, trackId) {
        Dispatcher.dispatch({
            type: ActionTypes.REMOVE_TRACK_FROM_PLAYLIST,
            playlistId,
            trackId,
        });
    }
}

export default new PlaylistActions();
