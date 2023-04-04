import Actions from '../../actions/Actions';
import template from './player.handlebars';
import './player.less';
import { RESPONSES } from '../../utils/config/config';

/** Class for Audio player view and its creation */
export class AudioPlayer {
    /** Flag to set repeat of current track */
    #isRepeat;

    /** Last response with last track from API */
    #lastResponse;

    /** Where to render player */
    #parent;

    /** Flag to set playing/stop playing mode of player */
    #isPlaying;

    /** All elements that will be used on DOM */
    #elements;

    /** Default all fields to empty except parent */
    constructor(parent) {
        this.#parent = parent;
        this.#elements = {};

        this.#lastResponse = {};
        this.#isPlaying = false;
        this.#isRepeat = false;
    }

    /** Start playing audio */
    #play() {
        this.#elements.audio.play();
        this.#isPlaying = true;
        this.#elements.playpause_btn.src = '/static/svg/Player/pause-solid.svg';
    }

    /** Stop playing audio */
    #pause() {
        this.#elements.audio.pause();
        this.#isPlaying = false;
        this.#elements.playpause_btn.src = '/static/svg/Player/play-solid.svg';
    }

    /** Toggle between states of playing */
    toggle() {
        if (this.#isPlaying) {
            this.#pause();
        } else {
            this.#play();
        }
    }

    /** Add reactions on User actions like 'play' */
    #addReactionOnUser() {
        const elements = this.#elements;
        elements.prev_btn.addEventListener('click', () => {
            this.#loadTrack(-1);
        });

        elements.next_btn.addEventListener('click', () => {
            this.#loadTrack(1);
        });

        elements.playpause_btn.addEventListener('click', () => {
            this.toggle();
        });

        elements.seek_slider.addEventListener('onChange', () => {
            this.seekTo();
        });

        elements.volume_slider.addEventListener('onChange', () => {
            Actions.volumeChange(this.#elements.volume_slider.value / 100);
        });

        elements.repeat.addEventListener('click', () => {
            this.#toggleRepeat();
        });
    }

    /** Add all elements of player to elements to use it later */
    #addAllElementsToElements() {
        this.#elements.now_playing = document.querySelector('.js__now-playing');
        this.#elements.track_art = document.querySelector('.js__track-art');
        this.#elements.track_name = document.querySelector('.js__track-name');
        this.#elements.track_artist = document.querySelector('.js__track-artist');

        this.#elements.playpause_btn = document.querySelector('.js__play-pause-track');
        this.#elements.next_btn = document.querySelector('.js__next-track');
        this.#elements.prev_btn = document.querySelector('.js__prev-track');

        this.#elements.seek_slider = document.querySelector('.js__seek_slider');
        this.#elements.volume_slider = document.querySelector('.js__volume_slider');
        this.#elements.curr_time = document.querySelector('.js__current-time');
        this.#elements.total_duration = document.querySelector('.js__total-duration');
        this.#elements.repeat = document.querySelector('.js__repeat');

        this.#elements.updateTimer = 0;
        this.#elements.audio = document.createElement('audio');
    }

    /**
     * Triggered when we click on next or prev button<br>
     * If whatTrack is positive, render next track, else prev
     * */
    #loadTrack(whatTrack) {
        if (!this.#isRepeat) {
            Actions.searchForTrack(whatTrack, '');
        }
        this.#setNewTrack(this.#lastResponse);
    }

    /**
     * Go to Api and Download track if needed
     * @param {JSON} responseFromStore
     * @example responseFromStore
     *  {
     *      nameOfTrack - string with path to go
     *      statusOfRespons - string what we need to do render new track or play this
     *  }
     */
    trackLoading(responseFromStore) {
        const idForNexrTrack = responseFromStore.id;
        // todo write APi request
        if (responseFromStore.status !== RESPONSES.OK) {
            // todo сходить за апи и загрузить новую ленту
            // ACtions.
        }

        const response = {
            trackPath: '',
            artist: '',
            track_name: '',
        };
        // after API response
        this.#setNewTrack(response);
    }

    /**
     * Set track after API return response with all information
     * @param {JSON} response
     */
    #setNewTrack(response) {
        clearInterval(this.#elements.updateTimer);
        this.#resetAllToStart();

        this.#elements.audio.src = response.trackPath;
        this.#elements.audio.load();

        this.#elements.track_art.src = response.track_art;
        this.#elements.track_artist.textContent = response.artist;
        this.#elements.track_name.textContent = response.track_name;

        this.#elements.updateTimer = setInterval(this.#seekUpdate, 1000);
        this.#elements.audio.addEventListener('ended', () => this.#loadTrack(1));

        this.#lastResponse = response;
    }

    /** Set values of Time, Duration, Line to 0 */
    #resetAllToStart() {
        this.#elements.curr_time.textContent = '00:00';
        this.#elements.total_duration.textContent = '00:00';
        this.#elements.seek_slider.value = 0;
    }

    /** Set volume to slider option */
    setVolume(volume) {
        // todo subscribe to SongStore
        this.#elements.audio.volume = volume;
    }

    /** Calculate line on song */
    seekTo() {
        this.#elements.audio.currentTime = this.#elements.duration
            * (this.#elements.seek_slider.value / 100);
    }

    /** calculate all times */
    #seekUpdate() {
        let seekPosition = 0;

        if (!Number.isNaN(this.#elements.audio.duration)) {
            const { audio } = this.#elements;
            seekPosition = audio.currentTime * (100 / audio.duration);
            this.#elements.seek_slider.value = seekPosition;

            // Calculate the time left and the total duration
            let currentMinutes = Math.floor(audio.currentTime / 60);
            let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(audio.duration / 60);
            let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

            // Add a zero to the single digit time values
            if (currentSeconds < 10) { currentSeconds = `0${currentSeconds}`; }
            if (durationSeconds < 10) { durationSeconds = `0${durationSeconds}`; }
            if (currentMinutes < 10) { currentMinutes = `0${currentMinutes}`; }
            if (durationMinutes < 10) { durationMinutes = `0${durationMinutes}`; }

            // Display the updated duration
            this.#elements.audio.textContent = `${currentMinutes}:${currentSeconds}`;
            this.#elements.total_duration.textContent = `${durationMinutes}:${durationSeconds}`;
        }
    }

    /** Toggle repeat on/off */
    #toggleRepeat() {
        // todo replace img
        if (this.#isRepeat) {
            // repeat off
        } else {
            // repeat on
        }

        this.#isRepeat = !this.#isRepeat;
    }

    /** Render player in parent */
    render() {
        this.#parent.innerHTML += template();

        this.#addAllElementsToElements();
        this.#addReactionOnUser();

        this.#addReactionOnUser();
    }
}
