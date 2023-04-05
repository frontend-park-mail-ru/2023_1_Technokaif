import IStore from './IStore';
import ActionTypes from '../actions/ActionTypes';
import { EventTypes } from '../utils/config/EventTypes';
import { RESPONSES } from '../utils/config/config';

/** Store to work with songs player */
class SongStore extends IStore {
    /** All ids of songs in current tape */
    #songs;

    /** Position in store */
    #position;

    /** Song volume: 0 - 100 */
    #songVolume;

    /** Default value to delete all state */
    constructor() {
        super('SONG_STORE');
        this.#songVolume = 100;
        this.#position = -1;
        this.#songs = [];
    }

    /**
     * Dispatch all actions to methods inside
     * @param {JSON} action
     */
    dispatch(action) {
        switch (action.type) {
        case ActionTypes.DOWNLOAD_DIRECTIONAL_TRACK:
            this.#searchForTrack(action.status);
            break;
        case ActionTypes.UPLOAD_TAPE:
            this.#uploadTape(action.response);
            break;
        case ActionTypes.CHANGE_VOLUME:
            this.#setVolume(action.volume);
            break;
        default:
            break;
        }
    }

    /**
     * Change volume of song to parameter that was given
     * if it between 0 and 100
     * @param volume
     * @return volume parameter that was set in Store
     */
    #setVolume(volume) {
        if (volume >= 0 || volume <= 100) {
            this.#songVolume = volume;
        }

        this.jsEmit(EventTypes.VOLUME_CHANGED, this.#songVolume);
    }

    /**
     * Search for next track <br>
     * If param:
     * - -1 -- prev track
     * - 1 -- next track
     * @param whatDirection
     */
    #searchForTrack(whatDirection) {
        // todo write this method
        const idOfFoundTrack = 1;
        const status = RESPONSES.OK;

        this.jsEmit(EventTypes.SONG_FOUND, {
            status,
            id: idOfFoundTrack,
        });
    }

    /**
     * JSON with tracks for Store. Upload inside.
     * @param {JSON} response
     * @example
     * [
     *  {
     *      "albumID" : 0,
     *      "albumPositon": 0,
     *      "artists": [
     *          {
     *              "cover": "string,
     *              "id": 0,
     *              "name": "string",
     *          }
     *      ],
     *      "cover":"string",
     *      "id": 0,
     *      "listens": 0,
     *      "name": "string",
     *      "record": "string",
     *  }
     * ]
     * @return {JSON}
     * @example
     * {
     *     "status": string,
     *     "cover":"string",
     *      "id": 0,
     *      "listens": 0,
     *      "name": "string",
     *      "record": "string",
     *      "artists": [
     *          {
     *              "cover": "string,
     *              "id": 0,
     *              "name": "string",
     *          }
     *      ],
     * }
     */
    #uploadTape(response) {
        this.#position = 0;
        this.#songs = response;

        this.jsEmit(EventTypes.SONG_FOUND, {
            status: RESPONSES.OK,
            artists: this.#songs[0].artists,
            name: this.#songs[0].name,
            record: this.#songs[0].record,
            cover: this.#songs[0].cover,
        });
    }
}

export default new SongStore();
