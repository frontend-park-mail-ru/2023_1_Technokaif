import IStore from './IStore';
import ActionTypes from '../actions/ActionTypes';
import { EventTypes } from '../utils/config/EventTypes';
import { RESPONSES } from '../utils/config/config';

export const METHODS_STORE = {
    REPLACE: 'REPLACE',
};

/** Store to work with songs player */
class SongStore extends IStore {
    /** Flag - is playing music now */
    #isPlaying;

    /** Flag - is repeat music now */
    #isRepeat;

    /** Track with audio that will give music */
    #audioTrack;

    /** Flag -- if audio doesnt have any value in it */
    #clearTrack;

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

        this.#audioTrack = document.createElement('audio');
        this.#clearTrack = true;
        this.#isPlaying = false;
        this.#isRepeat = false;

        this.#songVolume = 100;
        this.#position = -1;
        this.#songs = [];
        this.#storeType = null;

        this.#audioTrack.addEventListener(
            'ended',
            () => this.jsEmit(EventTypes.TRACK_END, {}),
        );
    }

    /** Return audio element */
    get audio() {
        return this.#audioTrack;
    }

    /** If track exist */
    get exist() {
        return !this.#clearTrack;
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
        case ActionTypes.SET_STATE:
            this.#setPlaying(action.state);
            break;
        case ActionTypes.SET_REPEAT:
            this.#isRepeat = action.state;
            break;
        case ActionTypes.TIME_OF_PLAY:
            this.#audioTrack.currentTime = action.time;
            break;
        case ActionTypes.CLEAR_ALL:
            this.#clearAll();
            break;
        default:
            break;
        }
    }

    /** Set state between playing sound and not playing */
    #setPlaying(newState) {
        this.#isPlaying = newState;
        if (this.#clearTrack) {
            this.#isPlaying = false;
            return;
        }

        if (this.#isPlaying) {
            this.#audioTrack.play();
        } else {
            this.#audioTrack.pause();
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
            this.#audioTrack.volume = volume;
        }

        this.jsEmit(EventTypes.VOLUME_CHANGED, this.#songVolume);
    }

    /** Clear position of track and track list */
    #clearAll() {
        this.#songs = [];
        this.#position = 0;

        this.#clearTrackSrc();
    }

    /** Clear track */
    #clearTrackSrc() {
        this.#audioTrack.src = '';
        this.#clearTrack = true;
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
            console.warn('Not store type set');
            this.#clearTrackSrc();
            return;
        }

        if (this.#isRepeat) {
            this.jsEmit(EventTypes.SONG_FOUND, {
                status: RESPONSES.REPEAT,
            });
            return;
        }

        if (this.#position === 0 && whatDirection === -1) {
            return;
        }

        this.#position += whatDirection;
        if (!(this.#position < this.#songs.length && this.#position >= 0)) {
            if (this.#position >= this.#songs.length) {
                this.#position = this.#songs.length - 1;
            }
            let id;
            switch (this.#storeType) {
            case 'album':
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

        this.#audioTrack.src = `/media${this.#songs[this.#position].recordSrc}`;
        this.#clearTrack = false;
        this.jsEmit(EventTypes.SONG_FOUND, {
            status: RESPONSES.OK,
            id: this.#songs[this.#position].id,
            artists: this.#songs[this.#position].artists,
            name: this.#songs[this.#position].name,
            cover: this.#songs[this.#position].cover,
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
        if (this.#songs.length === 0) {
            this.#position = 0;
        }

        this.#songs = this.#songs.concat(response);

        if (this.#songs.length > 0) {
            this.#audioTrack.src = `/media${this.#songs[this.#position].recordSrc}`;
            this.#clearTrack = false;
            this.jsEmit(EventTypes.SONG_FOUND, {
                status: RESPONSES.OK,
                id: this.#songs[this.#position].id,
                artists: this.#songs[this.#position].artists,
                name: this.#songs[this.#position].name,
                cover: this.#songs[this.#position].cover,
            });
        }
    }
}

export default new SongStore();
