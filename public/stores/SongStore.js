import IStore from './IStore';
import ActionTypes from '../actions/ActionTypes';
import { EventTypes } from '../utils/config/EventTypes';
import { RESPONSES } from '../utils/config/config';

export const METHODS_STORE = {
    REPLACE: 'REPLACE',
};

/** Store to work with songs player */
class SongStore extends IStore {
    /** All ids of songs in current tape */
    #songs;

    /** Position in store */
    #position;

    /** Song volume: 0 - 100 */
    #songVolume;

    /** Type of tape Store is using now */
    #storeType;

    /** Default value to delete all state */
    constructor() {
        super('SONG_STORE');
        this.#songVolume = 100;
        this.#position = -1;
        this.#songs = [];
        this.#storeType = null;
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
            this.#uploadTape(action.requestJSON);
            break;
        case ActionTypes.CHANGE_VOLUME:
            this.#setVolume(action.volume);
            break;
        case ActionTypes.PLAY_TRACK:
            this.#clearAll();
            this.#storeType = 'track';
            break;
        case ActionTypes.QUEUE_TRACK:
            this.#storeType = 'track';
            break;
        case ActionTypes.PLAY_ALBUM:
            this.#clearAll();
            console.log('Set album Type in SongStore');
            this.#storeType = 'album';
            break;
        case ActionTypes.QUEUE_ALBUM:
            this.#storeType = 'album';
            break;
        case ActionTypes.PLAY_ARTIST:
            this.#clearAll();
            this.#storeType = 'artist';
            break;
        case ActionTypes.QUEUE_ARTIST:
            this.#storeType = 'artist';
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

    /** Clear position of track and track list */
    #clearAll() {
        this.#songs = [];
        this.#position = 0;
    }

    /**
     * Search for next track <br>
     * If param:
     * - -1 -- prev track
     * - 1 -- next track
     * @param whatDirection
     */
    #searchForTrack(whatDirection) {
        if (!this.#storeType) {
            console.warn('SongStore doesn\'t have any songs');
            return;
        }
        if (this.#position === 0 && whatDirection === -1) {
            console.log('Wrong Position');
            return;
        }

        this.#position += whatDirection;
        if (!(this.#position < this.#songs.length && this.#position >= 0)) {
            console.log('Get song more than have');
            let id;
            switch (this.#storeType) {
            case 'album':
                console.log('Album get in SongStore');
                id = this.#songs[this.#position].albumID;
                break;
            case 'artist':
                id = this.#songs[this.#position].artists.id;
                break;
            case 'track':
                id = this.#songs[this.#position].id;
                break;
            default:
                console.warn('Not Artist/Album/Track direction in SonStore');
                break;
            }

            // need more songs
            this.jsEmit(EventTypes.DOWNLOAD_NEW_TAPE, {
                type: this.#storeType,
                how: METHODS_STORE.REPLACE,
                id,
            });
            return;
        }

        this.jsEmit(EventTypes.SONG_FOUND, {
            status: RESPONSES.OK,
            id: this.#songs[this.#position].id,
            artists: this.#songs[this.#position].artists,
            name: this.#songs[this.#position].name,
            cover: this.#songs[this.#position].cover,
            recordSrc: this.#songs[this.#position].recordSrc,
        });
    }

    /**
     * JSON with tracks for Store. Upload inside.
     * @param {JSON} response - get answer from API
     * @return {JSON}
     * {
     *     id: number,
     *     artists: [{
     *         name: string
     *     }],
     *     name: string,
     *     cover: source path
     * }
     */
    #uploadTape(response) {
        console.log('UploadTape in SongStore, response', response);
        // this.#position = this.#songs.length;
        this.#position = 0;
        // this.#songs.push(response);
        this.#songs = response;

        console.log('UploadTape in SongStore, songs', this.#songs);
        this.jsEmit(EventTypes.SONG_FOUND, {
            status: RESPONSES.OK,
            id: this.#songs[this.#position].id,
            artists: this.#songs[this.#position].artists,
            name: this.#songs[this.#position].name,
            cover: this.#songs[this.#position].cover,
            recordSrc: this.#songs[this.#position].recordSrc,
        });
    }
}

export default new SongStore();
