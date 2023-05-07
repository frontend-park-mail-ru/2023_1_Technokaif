import Actions from '../../../actions/Actions';
import template from './player.handlebars';
import './player.less';
import SongStore from '../../../stores/SongStore';
import { EventTypes } from '@config/EventTypes';
import { componentsNames } from '@config/componentsNames';
import { BaseComponent } from '../../BaseComponent';
import ComponentsStore from '../../../stores/ComponentsStore';
import {
    METHOD, playerConfig, playerElementsJS, RESPONSES,
} from '@config/config';
import { imgPath } from '@config/pathConfig';

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

    /** Function to space */
    #functionSpace;

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

        // Subscribe for end of track
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

        SongStore.subscribe(
            (volume) => {
                let source;
                const element = document.querySelector('.js__music-icon');
                this.#elements.volume_slider.value = volume * 100;

                if (volume > 0.6) {
                    source = imgPath.highVolume;
                } else if (volume > 0.3) {
                    source = imgPath.midVolume;
                } else if (volume === 0) {
                    source = imgPath.noVolume;
                } else {
                    source = imgPath.lowSound;
                }
                element.src = source;
            },
            EventTypes.VOLUME_CHANGED,
            componentsNames.PLAYER,
        );

        SongStore.subscribe(
            (repeatState) => {
                if (this.#isRepeat === repeatState) {
                    return;
                }
                this.#toggleRepeat();
            },
            EventTypes.REPEAT_CHANGED,
            componentsNames.PLAYER,
        );

        SongStore.subscribe(
            (dataToSet) => {
                this.#firstRender(dataToSet);
            },
            EventTypes.GET_DATA_AFTER_RESTART,
            componentsNames.PLAYER,
        );
    }

    /** Change player state */
    changeStatePlayer(newState) {
        if (newState) {
            this.#isPlaying = true;
            this.#elements.playpause_btnImg.src = imgPath.pause;
        } else {
            this.#isPlaying = false;
            this.#elements.playpause_btnImg.src = imgPath.play;
        }
    }

    /** Start playing audio */
    #play() {
        if (SongStore.exist) {
            PlayerActions.changePlayState(true);
        }
    }

    /** Stop playing audio */
    #pause() {
        if (SongStore.exist) {
            PlayerActions.changePlayState(false);
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
        elements.prev_btn.addEventListener(METHOD.BUTTON, () => {
            this.#loadTrack(playerConfig.PREV_TRACK);
        });

        elements.next_btn.addEventListener(METHOD.BUTTON, () => {
            this.#loadTrack(playerConfig.NEXT_TRACK);
        });

        elements.playpause_btn.addEventListener(METHOD.BUTTON, () => {
            this.toggle();
        });

        elements.seek_slider.addEventListener(METHOD.CHANGE_FIELD_IMMEDIATELY, () => {
            this.seekTo();
        });

        elements.volume_slider.addEventListener(
            METHOD.CHANGE_FIELD_IMMEDIATELY,
            () => {
                Actions.volumeChange(this.#elements.volume_slider.value / 100);
            },
        );

        this.#elements.volume_icon.addEventListener(METHOD.BUTTON, () => {
            if (this.#elements.volume_slider.value > 0) {
                this.#elements.volume_slider.value = 0;
            } else {
                this.#elements.volume_slider.value = SongStore.prevVolume;
            }
            this.#elements.volume_slider.dispatchEvent(new Event('input'));
        });

        elements.repeat.addEventListener(METHOD.BUTTON, () => {
            this.#toggleRepeat();
        });

        this.#functionSpace = (event) => {
            if (event.keyCode === 32 && !(event.target instanceof HTMLInputElement)) {
                event.preventDefault();
                this.toggle();
            }
        };

        document.addEventListener(METHOD.KEY_PRESSED, this.#functionSpace);
    }

    /** Add all elements of player to elements to use it later */
    #addAllElementsToElements() {
        this.#elements.track_art = document.querySelector(`.${playerElementsJS.trackArt}`);
        this.#elements.track_name = document.querySelector(`.${playerElementsJS.trackName}`);
        this.#elements.track_artist = document.querySelector(`.${playerElementsJS.trackArtist}`);

        this.#elements.playpause_btn = document.querySelector(`.${playerElementsJS.playPauseButton}`);
        this.#elements.playpause_btnImg = document.querySelector(`.${playerElementsJS.playPauseImg}`);
        this.#elements.next_btn = document.querySelector(`.${playerElementsJS.nextTrack}`);
        this.#elements.prev_btn = document.querySelector(`.${playerElementsJS.prevTrack}`);

        this.#elements.seek_slider = document.querySelector(`.${playerElementsJS.trackSlider}`);
        this.#elements.volume_icon = document.querySelector(`.${playerElementsJS.volumeIcon}`);
        this.#elements.volume_slider = document.querySelector(`.${playerElementsJS.volumeSlider}`);
        this.#elements.curr_time = document.querySelector(`.${playerElementsJS.currentTime}`);
        this.#elements.total_duration = document.querySelector(`.${playerElementsJS.totalDuration}`);
        this.#elements.repeat = document.querySelector(`.${playerElementsJS.repeatButton}`);
        this.#elements.repeatImg = document.querySelector(`.${playerElementsJS.repeatImg}`);

        this.#elements.updateTimer = playerConfig.FIRST_TIMER;
        this.#elements.volume_slider.value = 50;
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
            this.#elements.track_art.src = `/static/img${this.#lastResponse.cover}`;
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
     * @param {boolean} startAfterRefresh -if set dont clear fields and dont play
     */
    #setNewTrack(response, startAfterRefresh = false) {
        clearInterval(this.#elements.updateTimer);
        if (!startAfterRefresh) {
            this.#resetAllToStart();
        }
        if (!response.cover || response.cover === '') {
            this.#elements.track_art.src = imgPath.defaultTrack;
        } else {
            this.#elements.track_art.src = `/static/img${response.cover}`;
        }

        if (response.artists.length > 0) {
            this.#elements.track_artist.textContent = response.artists.reduce((accumulator, element, index) => accumulator.concat(` ${element.name}${(index !== response.artists.length - 1) ? ',' : ''}`), '');
        }

        this.#elements.track_name.textContent = response.name;

        this.#elements.updateTimer = setInterval(
            this.#seekUpdate.bind(this),
            playerConfig.INTERVAL,
        );

        if (!startAfterRefresh) {
            this.#isExist = true;
            this.#play();
        }

        this.#lastResponse = response;
    }

    /** Set values of Time, Duration, Line to 0 */
    #resetAllToStart() {
        this.#elements.curr_time.textContent = '00:00';
        this.#elements.total_duration.textContent = '00:00';
        this.#elements.seek_slider.value = 0;
        this.#elements.track_art.src = imgPath.defaultTrack;
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
            this.#elements.repeatImg.src = imgPath.notActiveRepeat;
        } else {
            this.#elements.repeatImg.src = imgPath.activeRepeat;
        }

        this.#isRepeat = !this.#isRepeat;
        Actions.createRepeat(this.#isRepeat);
    }

    /** First render */
    #firstRender(responseFromStore) {
        this.#setNewTrack(responseFromStore, true);
    }

    /** Render player in parent */
    render() {
        super.render();

        this.#subscribe();
        this.#addAllElementsToElements();

        this.#addReactionOnUser();
        this.#toggleRepeat();
        this.#toggleRepeat();
        Actions.getDataAfterRestart();
    }

    /** Unrender element */
    unRender() {
        super.unRender();
        document.removeEventListener(METHOD.KEY_PRESSED, this.#functionSpace);
    }
}
