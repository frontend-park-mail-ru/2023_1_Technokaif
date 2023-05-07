import ActionTypes from '@actions/ActionTypes';
import Dispatcher from '@dispatcher/Dispatcher';

class PlayerActions {
    // todo replace playTrack and playTrackWithOffset to playTrack and default value
    /** Send action to SongStore and search for needed track */
    searchForTrack(status, whatTrack) {
        Dispatcher.dispatch({
            type: ActionTypes.DOWNLOAD_DIRECTIONAL_TRACK,
            status,
            whatTrack,
        });
    }

    /** Change volume in Store */
    volumeChange(volume) {
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_VOLUME,
            volume,
        });
    }

    /** Play track send in SongStore id to play now */
    playTrack(id) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_TRACK,
            id,
        });
    }

    /** Play album send in SongStore album id to play now */
    playAlbum(id) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_ALBUM,
            id,
        });
    }

    /** Play artist send in SongStore artist id to play now his tracks (compilation) */
    playArtist(id) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_ARTIST,
            id,
        });
    }

    /** Play artist send in SongStore artist id to play now from track (compilation) */
    playArtistWithOffset(id, offset) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_ARTIST,
            id,
            offset,
        });
    }

    /** Play album send in SongStore album id to play now from track (compilation) */
    playAlbumWithOffset(id, offset) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_ALBUM,
            id,
            offset,
        });
    }

    /** Play playlist send in SongStore id to play now from track */
    playPlaylistWithOffset(id, offset = 0) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_PLAYLIST,
            playlistId: id,
            offset,
        });
    }

    /** Queue track send in SongStore track id to play now from track (compilation) */
    queueTrackWithOffset(id, offset) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_TRACK,
            id,
            offset,
        });
    }

    /** Queue track send in SongStore id to put in queue */
    queueTrack(id) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_TRACK,
            id,
        });
    }

    /** Queue album send in SongStore album id to put in queue */
    queueAlbum(id) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_ALBUM,
            id,
        });
    }

    /** Queue artist send in SongStore artist id to put in queue */
    queueArtist(id) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_ARTIST,
            id,
        });
    }

    /** Set play state */
    changePlayState(state) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_STATE,
            state,
        });
    }

    /** Set time to track in Store */
    setTimeToTrack(time) {
        Dispatcher.dispatch({
            type: ActionTypes.TIME_OF_PLAY,
            time,
        });
    }

    /** Queue Tracks */
    addQueueTracks(trackId, offset) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_TRACK,
            idOfTracks: trackId,
            offset,
        });
    }

    /** set offset */
    setOffset(offset) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_OFFSET,
            offset,
        });
    }

    /** Set repeat state */
    createRepeat(state) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_REPEAT,
            state,
        });
    }
}

export default new PlayerActions();
