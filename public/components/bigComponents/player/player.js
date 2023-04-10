import Actions from '../../../actions/Actions';
import template from './player.handlebars';
import './player.less';
import SongStore from '../../../stores/SongStore';
import { EventTypes } from '../../../utils/config/EventTypes';
import { componentsNames } from '../../../utils/config/componentsNames';
import { BaseComponent } from '../../BaseComponent';
import ComponentsStore from '../../../stores/ComponentsStore';
import { RESPONSES } from '../../../utils/config/config';

/** Class for Audio player view and its creation */
export class AudioPlayer extends BaseComponent {
    /** Flag to check if track exist in player */
    #isExist;

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
        super(parent, [], template, componentsNames.PLAYER);
        this.#parent = parent;
        this.#elements = {};

        this.#lastResponse = {};
        this.#isPlaying = false;
        this.#isRepeat = false;

        this.#isExist = false;
    }

    /** Subscribe Stores */
    #subscribe() {
        // Subscribe player on found songs
        SongStore.subscribe(
            this.trackLoading.bind(this),
            EventTypes.SONG_FOUND,
            componentsNames.PLAYER,
        );

        // Subscribe for change in volume
        SongStore.subscribe(
            () => this.#loadTrack(1),
            EventTypes.TRACK_END,
            componentsNames.PLAYER,
        );

        SongStore.subscribe(
            this.tapeLoad.bind(this),
            EventTypes.DOWNLOAD_NEW_TAPE,
            componentsNames.PLAYER,
        );

        SongStore.subscribe(
            this.changeStatePlayer.bind(this),
            EventTypes.CHANGE_PLAY_STATE,
            componentsNames.PLAYER,
        );

        ComponentsStore.subscribe(
            (list) => {
                if (list.find(
                    (element) => element.name === componentsNames.PLAYER,
                )) {
                    Actions.playerDelete();
                    delete this;
                }
            },
            EventTypes.ON_REMOVE_ANOTHER_ITEMS,
            componentsNames.PLAYER,
        );
    }

    /** Change player state */
    changeStatePlayer(newState) {
        if (newState) {
            this.#isPlaying = true;
            this.#elements.playpause_btnImg.src = '/static/svg/Player/pause-solid.svg';
        } else {
            this.#isPlaying = false;
            this.#elements.playpause_btnImg.src = '/static/svg/Player/play-solid.svg';
        }
    }

    /** Start playing audio */
    #play() {
        if (SongStore.exist) {
            Actions.createPlay(true);
        }
    }

    /** Stop playing audio */
    #pause() {
        if (SongStore.exist) {
            Actions.createPlay(false);
        }
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

        elements.seek_slider.addEventListener('change', () => {
            this.seekTo();
        });

        elements.volume_slider.addEventListener('input', () => {
            Actions.volumeChange(this.#elements.volume_slider.value / 100);
        });

        elements.repeat.addEventListener('click', () => {
            this.#toggleRepeat();
        });
    }

    /** Add all elements of player to elements to use it later */
    #addAllElementsToElements() {
        this.#elements.now_playing = document.querySelector('.js__now-playing');
        this.#elements.track_art = document.querySelector('.js__img');
        this.#elements.track_name = document.querySelector('.js__track-name');
        this.#elements.track_artist = document.querySelector('.js__track-artist');

        this.#elements.playpause_btn = document.querySelector('.js__play-pause-track');
        this.#elements.playpause_btnImg = document.querySelector('.js__play-pause__img');
        this.#elements.next_btn = document.querySelector('.js__next-track');
        this.#elements.prev_btn = document.querySelector('.js__prev-track');

        this.#elements.seek_slider = document.querySelector('.js__seek_slider');
        this.#elements.volume_slider = document.querySelector('.js__volume_slider');
        this.#elements.curr_time = document.querySelector('.js__current-time');
        this.#elements.total_duration = document.querySelector('.js__total-duration');
        this.#elements.repeat = document.querySelector('.js__repeat');
        this.#elements.repeatImg = document.querySelector('.js__repeat__img');

        this.#elements.updateTimer = 0;
    }

    /**
     * Triggered when we click on next or prev button<br>
     * If whatTrack is positive, render next track, else prev
     * */
    #loadTrack(whatTrack) {
        if (!this.#isRepeat) {
            Actions.searchForTrack(whatTrack, whatTrack);
        } else {
            this.#resetAllToStart();
            this.#play();
        }
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
        if (responseFromStore.status === RESPONSES.REPEAT) {
            this.#resetAllToStart();
            return;
        }
        this.#setNewTrack(responseFromStore);
    }

    /**
     * Load tape of Artist/Albums/Tracks
     * @param response
     */
    tapeLoad(response) {
        switch (response.type) {
        case 'album':
            if (response.how) {
                Actions.playAlbum(response.id);
            } else {
                Actions.queueAlbum(response.id);
            }

            break;
        case 'artist':
            if (response.how) {
                Actions.playArtist(response.id);
            } else {
                Actions.queueArtist(response.id);
            }

            break;
        case 'track':
            if (response.how) {
                Actions.playTrack(response.id);
            } else {
                Actions.queueTrack(response.id);
            }
            break;
        default:
            console.warn('On Player not Album/Artist/Track in tapeLoad');
        }
    }

    /**
     * Set track after API return response with all information
     * @param {JSON} response
     */
    #setNewTrack(response) {
        clearInterval(this.#elements.updateTimer);
        this.#resetAllToStart();

        this.#elements.track_art.src = `/static/img${response.cover}`;
        if (response.artists.length > 0) {
            this.#elements.track_artist.textContent = response.artists[0].name;
        }

        this.#elements.track_name.textContent = response.name;

        this.#elements.updateTimer = setInterval(this.#seekUpdate.bind(this), 1000);

        this.#lastResponse = response;

        this.#isExist = true;
        this.#play();
    }

    /** Set values of Time, Duration, Line to 0 */
    #resetAllToStart() {
        this.#elements.curr_time.textContent = '00:00';
        this.#elements.total_duration.textContent = '00:00';
        this.#elements.seek_slider.value = 0;
        Actions.setTimeToTrack(0);
    }

    /** Calculate line on song */
    seekTo() {
        const whereToPlace = SongStore.audio.duration
            * (this.#elements.seek_slider.value / 100);

        if (Number.isNaN(whereToPlace)) {
            return;
        }

        Actions.setTimeToTrack(whereToPlace);
    }

    /** calculate all times */
    #seekUpdate() {
        let seekPosition = 0;

        if (!Number.isNaN(SongStore.audio.duration)) {
            seekPosition = SongStore.audio.currentTime * (100 / SongStore.audio.duration);
            this.#elements.seek_slider.value = seekPosition;

            // Calculate the time left and the total duration
            let currentMinutes = Math.floor(SongStore.audio.currentTime / 60);
            let currentSeconds = Math.floor(SongStore.audio.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(SongStore.audio.duration / 60);
            let durationSeconds = Math.floor(SongStore.audio.duration - durationMinutes * 60);

            // Add a zero to the single digit time values
            if (currentSeconds < 10) { currentSeconds = `0${currentSeconds}`; }
            if (durationSeconds < 10) { durationSeconds = `0${durationSeconds}`; }
            if (currentMinutes < 10) { currentMinutes = `0${currentMinutes}`; }
            if (durationMinutes < 10) { durationMinutes = `0${durationMinutes}`; }

            // Display the updated duration
            this.#elements.curr_time.textContent = `${currentMinutes}:${currentSeconds}`;
            this.#elements.total_duration.textContent = `${durationMinutes}:${durationSeconds}`;
        }
    }

    /** Toggle repeat on/off */
    #toggleRepeat() {
        if (this.#isRepeat) {
            this.#elements.repeatImg.src = '/static/svg/Player/arrows-rotate-solid_not_active.svg';
        } else {
            this.#elements.repeatImg.src = '/static/svg/Player/arrows-rotate-solid_active.svg';
        }

        this.#isRepeat = !this.#isRepeat;
        Actions.createRepeat(this.#isRepeat);
    }

    /** Render player in parent */
    render() {
        super.render();

        this.#subscribe();
        this.#addAllElementsToElements();

        this.#addReactionOnUser();
        this.#toggleRepeat();
        this.#toggleRepeat();
    }
}
