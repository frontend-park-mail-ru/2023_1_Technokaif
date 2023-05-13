import ActionTypes from '@actions/ActionTypes';
import Dispatcher from '@dispatcher/Dispatcher';

/** Actions with Player */
class PlayerActions {
    /** Queue artist send in SongStore artist id to put in queue */
    queueArtist(id) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_ARTIST,
            id,
        });
    }

    /** Queue Tracks */
    addQueueTracks(trackId, offset = 0) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_TRACK,
            idOfTracks: trackId,
            offset,
        });
    }
}

export default new PlayerActions();
