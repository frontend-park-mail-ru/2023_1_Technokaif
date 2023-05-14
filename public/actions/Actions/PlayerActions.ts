import ActionTypes from '@actions/ActionTypes';
import Dispatcher from '@dispatcher/Dispatcher';

/** Actions with Player */
class PlayerActions {
    /** Set repeat state */
    createRepeat(state) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_REPEAT,
            state,
        });
    }

    /** set offset */
    setOffset(offset) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_OFFSET,
            offset,
        });
    }

    /** Set time to track in Store */
    setTimeToTrack(time) {
        Dispatcher.dispatch({
            type: ActionTypes.TIME_OF_PLAY,
            time,
        });
    }

    /** Set play state */
    changePlayState(state) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_STATE,
            state,
        });
    }

    /** Change volume in Store */
    volumeChange(volume) {
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_VOLUME,
            volume,
        });
    }

    /**
     * Play next track if whatDirection === 1
     * Play prev track if whatDirection === -1
     */
    playNextOrPrevTrack(whatDirection: 1 | -1) {
        Dispatcher.dispatch({
            type: ActionTypes.DOWNLOAD_DIRECTIONAL_TRACK,
            status: whatDirection,
        });
    }

    /**
     * Play track immediately with ID
     */
    playTrack(id, offset = 0) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_TRACK_API,
            id,
            offset,
        });
    }

    /**
     * Play album immediately with ID. Offset of track. If 0 then play from start
     */
    playAlbum(id, offset = 0) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_ALBUM_API,
            id,
            offset,
        });
    }

    /**
     * Play artist immediately with ID. Offset of track. If 0 then play from start
     */
    playArtist(id, offset = 0) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_ARTIST_API,
            id,
            offset,
        });
    }

    /** Play playlist send in SongStore id to play now from track */
    playPlaylist(id, offset = 0) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_PLAYLIST_API,
            playlistId: id,
            offset,
        });
    }

    /**
     * Queue track with id.
     * @param {number[]} idsOfTracks ids of all tracks to play. If given one id will play it
     * @param {number} offset offset to play from in idsOfTracks
     */
    queueTrack(idOfTracks, offset = 0) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_TRACK_API,
            idOfTracks,
            offset,
        });
    }

    /**
     * Queue album with id
     */
    queueAlbum(id) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_ALBUM_API,
            id,
        });
    }

    /**
     * Queue artist with id
     */
    queueArtist(id) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_ARTIST_API,
            id,
        });
    }

    /**
     * Queue playlist with id
     */
    queuePlaylist(id) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_PLAYLIST_API,
            id,
        });
    }

    /**
     * Play track from API
     */
    apiPlayTrack(tracks, offset = 0) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_TRACK,
            tracks,
            offset,
        });
    }

    /**
     * Play album from API
     */
    apiPlayAlbum(tracks, offset = 0) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_ALBUM,
            tracks,
            offset,
        });
    }

    /**
     * Play artist from API
     */
    apiPlayArtist(tracks, offset = 0) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_ARTIST,
            tracks,
            offset,
        });
    }

    /**
     * Play playlist from API
     */
    apiPlayPlaylist(tracks, offset = 0) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_PLAYLIST,
            tracks,
            offset,
        });
    }

    /**
     * Queue tracks from api
     */
    apiQueueTracks(tracks) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_TRACK,
            tracks,
        });
    }

    /**
     * Queue artist from api
     */
    apiQueueArtist(tracks) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_ARTIST,
            tracks,
        });
    }

    /**
     * Queue album from api
     */
    apiQueueAlbum(tracks) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_ALBUM,
            tracks,
        });
    }

    /**
     * Queue Playlist from api
     */
    apiQueuePlaylist(tracks) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_PLAYLIST,
            tracks,
        });
    }

    /** Remove tracks from Player queue */
    removeTrackFromQueue(ids:number[]) {
        Dispatcher.dispatch({
            type: ActionTypes.REMOVE_FROM_QUEUE,
            tracks: ids,
        });
    }

    /** Swap two tracks with id */
    swapTracks(idOfFirstTrack:number, idOfSecondTrack:number) {
        Dispatcher.dispatch({
            type: ActionTypes.SWAP_IN_QUEUE,
            idOfFirstTrack,
            idOfSecondTrack,
        });
    }
}

export default new PlayerActions();
