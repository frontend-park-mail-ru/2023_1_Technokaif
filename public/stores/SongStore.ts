import IStore from '@store/IStore';
import ActionTypes from '@actions/ActionTypes';
import { EventTypes } from '@config/EventTypes';
import { RESPONSES } from '@config/config';
import {
    changerStringToJSON,
    getValueFromLocalStorage,
    saveValueToLocalStorage,
} from '@functions/FunctionsToWorkWithLocalStore';
import { TracksApi } from '@api/ApiAnswers';

const COUNTER = 'Counter';

/** Values stored in storage */
declare interface SongValuesStorage{
    songs: TracksApi,
    position: number,
}

/** Number of plays. If number increase then stop play */
declare interface CounterValueStorage{
    counter:number,
}

const TypesOfStore = {
    album: 'albums',
    track: 'track',
    playlist: 'playlist',
    artist: 'artist',
};

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
            };
        });

        this.#audioTrack = document.createElement('audio');
        this.#clearTrack = true;
        this.#isPlaying = false;
        this.#isRepeat = false;

        this.#songVolume = 0.5;
        this.#prevVolume = 0.5;
        this.#audioTrack.volume = 0.5;

        this.#position = -1;
        this.#songs = [];
        this.#storeType = null;

        this.#audioTrack.addEventListener(
            'ended',
            () => this.jsEmit(EventTypes.TRACK_END, {}),
        );

        window.addEventListener('storage', (event:StorageEvent) => {
            if (event.key !== this.name && event.key !== COUNTER) return;

            if (event.key === COUNTER) {
                this.#setPlaying(false);
                return;
            }

            const newValue = changerStringToJSON(event.newValue);
            if (!newValue) {
                this.#clearAll();
                return;
            }

            this.#songs = newValue.songs;
            this.position = newValue.position;
            if (newValue.position >= newValue.songs.length) return;
            this.setTrack();
        });
        this.setTrackIfExistInStore();
    }

    /** Return audio element */
    get audio() {
        return this.#audioTrack;
    }

    /** Return audio info */
    get trackInfo() {
        return this.#songs[this.#position];
    }

    /** Set like status */
    setTrackIsLiked(value, id: string) {
        const trackInd = this.#songs.findIndex((song) => song.id === Number(id));
        if (trackInd !== -1) {
            this.#songs[trackInd].isLiked = value;
        }
    }

    /** Return what album is playing or null if doesn't exist */
    get albumInfo() {
        if (this.#storeType !== TypesOfStore.album
        || !this.#songs[this.#position]) return null;
        return this.#songs[this.#position].albumID;
    }

    /** Return what artists is playing or null if doesn't exist */
    get artistsInfo() {
        if (this.#storeType !== TypesOfStore.artist
            || !this.#songs[this.#position]) return null;
        return this.#songs[this.#position].artists;
    }

    /** get playlist */
    get playlist() {
        if (this.#storeType !== TypesOfStore.playlist
            || !this.#songs[this.#position]) return null;
        return this.#songs[this.#position].playlistID;
    }

    /** Return playing status */
    get isPlaying(): boolean {
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

    /** Set songs new value */
    private set songs(newValue: TracksApi) {
        this.#songs = newValue;
    }

    /** Set position to new value */
    private set position(newValue:number) {
        this.#position = newValue;
    }

    /** Save songs and position to localStorage */
    private saveSongsAndPosition(songs:TracksApi, position:number, clearBeforeWrite = true) {
        const valueFromStore = getValueFromLocalStorage(this.name);
        let valueToWrite:SongValuesStorage;
        if (valueFromStore) {
            let songsToWrite;
            if (clearBeforeWrite) {
                songsToWrite = songs;
            } else {
                songsToWrite = valueFromStore.songs.concat(songs);
            }

            valueToWrite = {
                songs: songsToWrite,
                position,
            };
        } else {
            valueToWrite = {
                songs,
                position,
            };
        }

        saveValueToLocalStorage(this.name, valueToWrite);
    }

    /** Indicate that player start playing for another tabs */
    private increasePlayingCounter() {
        const valueFromStore = getValueFromLocalStorage(COUNTER);
        let valueToWrite: CounterValueStorage;
        if (valueFromStore) {
            valueToWrite = {
                counter: valueFromStore.counter + 1,
            };
        } else {
            valueToWrite = {
                counter: 0,
            };
        }

        saveValueToLocalStorage(COUNTER, valueToWrite);
    }

    /**
     * Dispatch all actions to methods inside
     * @param {JSON} action
     */
    override dispatch(action) {
        switch (action.type) {
        case ActionTypes.CLEAR_ALL:
            this.#clearAll();
            break;
        case ActionTypes.FIRST_START_AFTER_RESTART:
            this.firstLaunch();
            break;
        // next play tracks
        case ActionTypes.DOWNLOAD_DIRECTIONAL_TRACK:
            this.#searchForTrack(action.status);
            break;
        case ActionTypes.PLAY_TRACK:
            this.#clearAll();
            this.#setPosition(action.offset);
            this.#uploadTape(action.tracks);
            this.#storeType = TypesOfStore.track;
            this.#setPlaying(true);
            break;
        case ActionTypes.PLAY_ALBUM:
            this.#clearAll();
            this.#setPosition(action.offset);
            this.#uploadTape(action.tracks);
            this.#storeType = TypesOfStore.album;
            this.#setPlaying(true);
            break;
        case ActionTypes.PLAY_ARTIST:
            this.#clearAll();
            this.#setPosition(action.offset);
            this.#uploadTape(action.tracks);
            this.#storeType = TypesOfStore.artist;
            this.#setPlaying(true);
            break;
        case ActionTypes.PLAY_PLAYLIST:
            this.#clearAll();
            this.#setPosition(action.offset);
            this.#uploadTape(action.tracks);
            this.#storeType = TypesOfStore.playlist;
            this.#setPlaying(true);
            break;
        // queue tracks
        case ActionTypes.QUEUE_TRACK:
            this.#storeType = undefined;
            this.#uploadTape(action.tracks);
            break;
        case ActionTypes.QUEUE_ALBUM:
            this.#storeType = undefined;
            this.#uploadTape(action.tracks);
            break;
        case ActionTypes.QUEUE_ARTIST:
            this.#storeType = undefined;
            this.#uploadTape(action.tracks);
            break;
        case ActionTypes.QUEUE_PLAYLIST:
            this.#storeType = undefined;
            this.#uploadTape(action.tracks);
            break;
        // Next actions of changes of state not tracks
        case ActionTypes.CHANGE_VOLUME:
            this.#setVolume(action.volume);
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
        case ActionTypes.SET_OFFSET:
            this.#setPosition(action.offset);
            break;
        case ActionTypes.REMOVE_FROM_QUEUE:
            this.removeTracks(action.tracks);
            break;
        case ActionTypes.SWAP_IN_QUEUE:
            this.swapTrack(action.idOfFirstTrack, action.idOfSecondTrack);
            break;
        default:
            super.dispatch(action);
            break;
        }
    }

    /** Remove tracks from queue */
    private removeTracks(tracksIDs: number[]) {
        tracksIDs.forEach((trackID) => {
            if (this.#songs.length === 1) {
                this.#setPlaying(false);
                return;
            }

            const positionOfTrack = this.#songs.find((track) => track.id === trackID);
            if (positionOfTrack === this.#position
                && positionOfTrack !== (this.#songs.length - 1)) {
                this.songs = this.#songs.filter((track) => track.id !== trackID);
                this.saveSongsAndPosition(this.#songs, this.#position);
                this.setTrack();
                return;
            }

            if (positionOfTrack === this.#position) {
                this.songs = this.#songs.filter((track) => track.id !== trackID);
                this.position -= 1;
                this.saveSongsAndPosition(this.#songs, this.#position);
                this.setTrack();
                return;
            }

            if (positionOfTrack < this.#position) {
                this.position -= 1;
            }
            this.songs = this.#songs.filter((track) => track.id !== trackID);
            this.saveSongsAndPosition(this.#songs, this.#position);
        });
    }

    /** Swap track in queue */
    private swapTrack(idOfFirstSwap: number, idOfSecondSwap:number) {
        const positionOfFirstTrack = this.#songs.find((track) => track.id === idOfFirstSwap);
        const positionOfSecondTrack = this.#songs.find((track) => track.id === idOfSecondSwap);

        if (!positionOfFirstTrack || !positionOfSecondTrack) {
            console.error('Can\'t swap. ID is greater than length of queue');
            return;
        }

        if (this.#position === positionOfFirstTrack) {
            this.position = positionOfSecondTrack;
        }

        if (this.#position === positionOfSecondTrack) {
            this.position = positionOfFirstTrack;
        }

        [
            this.#songs[positionOfFirstTrack],
            this.#songs[positionOfSecondTrack],
        ] = [
            this.#songs[positionOfSecondTrack],
            this.#songs[positionOfFirstTrack],
        ];

        this.saveSongsAndPosition(this.#songs, this.#position);
    }

    /** Set Repeat state */
    #setRepeat(newState) {
        this.#isRepeat = newState;
        this.jsEmit(EventTypes.REPEAT_CHANGED, newState);
    }

    /** Set data for track for first launch */
    private firstLaunch() {
        const state = super.state;
        const valueFromLocalStorage = getValueFromLocalStorage(this.name);

        let valueToReadFrom = valueFromLocalStorage;
        if (!valueFromLocalStorage) {
            valueToReadFrom = {
                songs: [],
                position: 0,
            };
        }
        this.#position = valueToReadFrom.position;
        this.#songs = valueToReadFrom.songs;

        if (valueToReadFrom?.songs?.length > 0) {
            this.#clearTrack = false;

            this.#audioTrack.src = `/media${this.#songs[this.#position].recordSrc}`;

            this.jsEmit(EventTypes.GET_DATA_AFTER_RESTART, {
                status: RESPONSES.OK,
                id: this.#songs[this.#position].id,
                artists: this.#songs[this.#position].artists,
                name: this.#songs[this.#position].name,
                cover: this.#songs[this.#position].cover,
            });
        }

        if (state && state.songs?.length > 0) {
            this.#setVolume(state.volume);
            this.#storeType = state.storeType;
            this.#setRepeat(state.repeat);
            this.#setTime(state.secondsPlayed);
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
        this.position = offset;
    }

    /** Set track to play */
    private setTrack() {
        if (!this.#songs[this.#position]?.recordSrc) return;
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

        if (this.isPlaying) {
            this.increasePlayingCounter();
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
        // @ts-ignore
        this.songs = [];
        this.position = 0;
        this.saveSongsAndPosition(this.#songs, this.#position);

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
        if (this.#isRepeat) {
            this.jsEmit(EventTypes.SONG_FOUND, {
                status: RESPONSES.REPEAT,
            });
            return;
        }

        if (this.#position === 0 && whatDirection === -1) {
            return;
        }

        this.position = this.#position + whatDirection;
        if (!(this.#position < this.#songs.length && this.#position >= 0)) {
            if (!this.#songs[this.#position]) {
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

        this.saveSongsAndPosition(this.#songs, this.#position);
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
        this.songs = this.#songs.concat(response);
        if (this.#songs.length > 0 && this.#songs.length <= this.#position) {
            console.warn('Length exceeded, existed:', this.#songs.length, ' position:', this.#position);
            this.position = this.#songs.length - 1;
        }

        this.saveSongsAndPosition(this.#songs, this.#position);
        if (this.#songs.length > 0) {
            this.setTrack();
        }
    }

    /** Get First track if in localStorage */
    private setTrackIfExistInStore() {
        this.firstLaunch();
    }
}

export default new SongStore();
