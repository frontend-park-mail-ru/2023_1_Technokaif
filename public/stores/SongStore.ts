import IStore from '@store/IStore';
import ActionTypes from '@actions/ActionTypes';
import { EventTypes } from '@config/EventTypes';
import { RESPONSES } from '@config/config';

/** Store to work with songs player */
class SongStore extends IStore {
    /** Prev volume to back */
    #prevVolume;

    /** Flag - is playing list again */
    #listFromBeginning;

    /** Flag - is playing music now */
    #isPlaying;

    /** Flag - is repeat music now */
    #isRepeat;

    /** Track with audio that will give music */
    #audioTrack;

    /** Flag -- if audio doesn't have any value in it */
    #clearTrack;

    /** All ids of songs in current tape */
    #songs;

    /** Position in store */
    #position;

    /** Song volume: 0 - 100 */
    #songVolume;

    /** Type of tape Store is using now */
    #storeType;

    /** Playlist id of playing. ID === -1 if not playlist */
    #playlist;

    /** Default value to delete all state */
    constructor() {
        super('SONG_STORE', () => {
            super.state = {
                volume: this.#songVolume,
                position: this.#position,
                songs: this.#songs,
                storeType: this.#storeType,
                repeat: this.#isRepeat,

                secondsPlayed: this.#audioTrack.currentTime,
                playlist: this.#playlist,
            };
        });

        this.#audioTrack = document.createElement('audio');
        this.#clearTrack = true;
        this.#isPlaying = false;
        this.#isRepeat = false;

        this.#songVolume = 0.5;
        this.#prevVolume = 0.5;
        this.#audioTrack.volume = 0.5;
        this.#playlist = -1;

        this.#position = -1;
        this.#songs = [];
        this.#storeType = null;

        this.#audioTrack.addEventListener(
            'ended',
            () => this.jsEmit(EventTypes.TRACK_END, {}),
        );
        super.loadFromSessionStore();
    }

    /** Return audio element */
    get audio() {
        return this.#audioTrack;
    }

    /** Return audio info */
    get trackInfo() {
        return this.#songs[this.#position];
    }

    /** Return what album is playing or null if doesn't exist */
    get albumInfo() {
        if (!this.#songs[this.#position]) {
            return null;
        }
        return this.#songs[this.#position].albumID;
    }

    /** Return what artists is playing or null if doesn't exist */
    get artistsInfo() {
        return this.#songs[this.#position].artists;
    }

    /** Return playing status */
    get isPlaying() {
        return this.#isPlaying;
    }

    /** Get prev volume */
    get prevVolume() {
        return this.#prevVolume;
    }

    /** If track exist */
    get exist() {
        return !this.#clearTrack;
    }

    /** get playlist */
    get playlist() {
        return this.#playlist;
    }

    /**
     * Dispatch all actions to methods inside
     * @param {JSON} action
     */
    override dispatch(action) {
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
        case ActionTypes.PLAY_ALBUM:
            this.#clearAll();
            this.#setPosition(action.offset);
            this.#storeType = 'album';
            break;
        case ActionTypes.PLAY_PLAYLIST:
            this.#clearAll();
            this.#setPosition(action.offset);
            this.#storeType = 'playlist';
            this.#playlist = action.playlistId;
            break;
        case ActionTypes.PLAY_ARTIST:
            this.#clearAll();
            this.#setPosition(action.offset);
            this.#storeType = 'artist';
            break;
        case ActionTypes.QUEUE_TRACK:
            this.#setPosition(action.offset);
            this.#storeType = 'track';
            break;
        case ActionTypes.QUEUE_ALBUM:
            this.#storeType = 'album';
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
            this.#setTime(action.time);
            break;
        case ActionTypes.CLEAR_ALL:
            this.#clearAll();
            break;
        case ActionTypes.FIRST_START_AFTER_RESTART:
            this.firstLaunch();
            break;
        case ActionTypes.SET_OFFSET:
            this.#setPosition(action.offset);
            break;
        default:
            super.dispatch(action);
            break;
        }
    }

    /** Set Repeat state */
    #setRepeat(newState) {
        this.#isRepeat = newState;
        this.jsEmit(EventTypes.REPEAT_CHANGED, newState);
    }

    /** Set data for track for first launch */
    private firstLaunch() {
        const state = super.state;
        if (state) {
            if (state.songs?.length > 0) {
                this.#setVolume(state.volume);
                this.#storeType = state.storeType;
                this.#position = state.position;
                this.#songs = state.songs;
                this.#clearTrack = false;
                this.#playlist = state.playlist;

                this.#audioTrack.src = `/media${this.#songs[this.#position].recordSrc}`;
                this.#setRepeat(state.repeat);

                this.jsEmit(EventTypes.GET_DATA_AFTER_RESTART, {
                    status: RESPONSES.OK,
                    id: this.#songs[this.#position].id,
                    artists: this.#songs[this.#position].artists,
                    name: this.#songs[this.#position].name,
                    cover: this.#songs[this.#position].cover,
                });
                this.#setTime(state.secondsPlayed);
            }
        }
    }

    /** Set playing time */
    #setTime(newTime) {
        this.#audioTrack.currentTime = newTime;
    }

    /**
     * Function to set position
     * @param offset
     */
    #setPosition(offset = 0) {
        if (offset === undefined) {
            offset = 0;
        }
        this.#position = offset;
    }

    /** Set track to play */
    private setTrack() {
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
     *  Set state between playing sound and not playing
     *  newState:
     *  1 -- play
     *  0 -- stop
     */
    #setPlaying(newState) {
        if (this.#clearTrack) {
            this.#isPlaying = false;
            return;
        }

        if (newState && !this.#listFromBeginning) {
            this.#audioTrack.play();
            this.#isPlaying = true;
        } else {
            this.#audioTrack.pause();
            this.#listFromBeginning = false;
            this.#isPlaying = false;
        }

        this.jsEmit(EventTypes.CHANGE_PLAY_STATE, this.#isPlaying);
    }

    /**
     * Change volume of song to parameter that was given
     * if it between 0 and 100
     * @param volume
     * @return volume parameter that was set in Store
     */
    #setVolume(volume) {
        if (volume >= 0 || volume <= 100) {
            if (this.#songVolume !== 0) {
                this.#prevVolume = this.#songVolume * 100;
            }

            this.#songVolume = volume;
            this.#audioTrack.volume = volume;
        }

        this.jsEmit(EventTypes.VOLUME_CHANGED, this.#songVolume);
    }

    /** Clear position of track and track list */
    #clearAll() {
        this.#playlist = -1;
        this.#songs = [];
        this.#position = 0;

        this.#clearTrackSrc();
    }

    /** Clear track */
    #clearTrackSrc() {
        this.#audioTrack.src = '';
        this.#clearTrack = true;
        this.#setPlaying(false);
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
            if (!this.#songs[this.#position]) {
                // this.#position = 0;
                const tracks = this.#songs;
                this.#clearAll();
                this.#uploadTape(tracks);
                this.#listFromBeginning = true;
                return;
            }
        }

        if (!this.#songs[this.#position].recordSrc
            || this.#songs[this.#position].recordSrc === '') {
            this.#clearAll();
            return;
        }

        if (!this.#songs[this.#position].recordSrc
            || this.#songs[this.#position].recordSrc === ''
            || this.#songs[this.#position].recordSrc === undefined
            || this.#songs[this.#position].recordSrc === undefined
            || this.#songs[this.#position].recordSrc === null) {
            this.#clearAll();
            return;
        }

        this.setTrack();
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
        this.#songs = this.#songs.concat(response);

        if (this.#songs.length > 0 && this.#songs.length <= this.#position) {
            console.warn('Length exceeded, existed:', this.#songs.length, ' position:', this.#position);
            this.#position = this.#songs.length - 1;
        }

        if (this.#songs.length > 0) {
            this.setTrack();
        }
    }
}

export default new SongStore();
