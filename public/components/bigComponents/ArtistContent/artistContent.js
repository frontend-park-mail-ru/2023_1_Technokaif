import templateHtml from './artistContent.handlebars';
import './artistContent.less';
import { componentsNames } from '@config/componentsNames';
import { EventTypes } from '@config/EventTypes';
import { pageNames } from '@config/pageNames';
import { ArtistCover } from '@smallComponents/ArtistCover/artistCover';
import { componentsJSNames } from '@config/componentsJSNames';
import {
    setupArtistCover,
    setupLikedSongs,
    setupLineList,
    setupTape,
} from '@setup/artistSetup';
import { shuffleArray } from '@functions/shuffleArray';
import { LikedSongs } from '@smallComponents/LikedSongs/likedSongs';
import { checkAuth } from '@functions/checkAuth';
import { imgPath } from '@config/pathConfig';
import { instancesNames } from '@config/instances';
import ArtistActions from '@API/ArtistActions';
import PlayerActions from '@Actions/PlayerActions';
import UserActions from '@API/UserActions';
import API from '@store/API';
import { LineList } from '@bigComponents/LineList/lineList';
import { BaseComponent } from '@components/BaseComponent';
import { Tape } from '@bigComponents/Tape/tape';
import ContentStore from '@store/ContentStore';
import Actions from '@actions/Actions';
import SongStore from '@store/SongStore';

/**
 * Create Artist content
 */
export class ArtistContent extends BaseComponent {
    /**
     * Parent where to render
     */
    #parent;

    /**
     * Config to use in handlebars setup of tapes
     */
    #tapeConfigs;

    /**
     * Config to use in handlebars setup of track lines
     */
    #lineConfigs;

    /**
     * Flag to know if the button already started the music or not
     * Boolean
     */
    #activatedButton;

    /**
     * Create ArtistCover. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place ArtistCover
     * @param config
     */
    constructor(parent, config) {
        super(parent, config, templateHtml, componentsNames.ARTIST_CONTENT);
        this.#parent = parent;
        this.#tapeConfigs = [];
        this.#lineConfigs = [];
    }

    /**
     * Function to render track lines by input configs.
     */
    #renderLines() {
        const linesPlacement = document.querySelector('.artist-items');
        this.#lineConfigs.forEach((configForInsertElement) => {
            const line = new LineList(
                linesPlacement,
                configForInsertElement,
                componentsNames.ARTIST_LINE_LIST,
            );
            line.appendElement();
        });
    }

    /**
     * Function to render tapes for albums
     */
    #renderTapes() {
        const tapesPlacement = document.querySelector('.album-list');
        this.#tapeConfigs.forEach((configForInsertElement) => {
            const tape = new Tape(
                tapesPlacement,
                configForInsertElement,
                configForInsertElement.titleText,
            );
            tape.appendElement();
        });
    }

    /**
     * Method to render artist cover on page
     * @param artist
     */
    #renderCover(artist) {
        const parent = document.querySelector(`.${componentsJSNames.ARTIST_COVER}`);
        const artistCover = new ArtistCover(parent, setupArtistCover(artist));
        artistCover.appendElement();

        document.title = artist.name;
    }

    /**
     * Method to render liked songs
     * @param artist
     * @param tracks
     */
    #renderLikedSongs(artist, tracks) {
        const placement = document.querySelector('.artist-items');
        const likeBlock = document.querySelector('.liked-songs');
        if (likeBlock) {
            placement.removeChild(likeBlock);
        }
        const counter = tracks.filter(
            (track) => (track.artists.filter(
                (trackArtist) => trackArtist.name === artist.name,
            ).length > 0),
        ).length;
        const likedSongs = new LikedSongs(placement, setupLikedSongs(artist, counter));
        likedSongs.appendElement();
    }

    /**
     * Function to subscribe to all events from Stores
     */
    #addSubscribes() {
        const imgLike = document.querySelector('.like__img');
        imgLike.addEventListener('click', () => {
            const { artist } = ContentStore.state[pageNames.ARTIST_PAGE];
            if (artist.isLiked) {
                imgLike.src = imgPath.notLiked;
                ArtistActions.unLikeArtist(artist.id);
            } else {
                imgLike.src = imgPath.liked;
                ArtistActions.likeArtist(artist.id);
            }
            artist.isLiked = !artist.isLiked;
        });

        ContentStore.subscribe(
            () => {
                const buttons = document.querySelector('.pre-buttons');
                const playButton = document.querySelector('.play-button');
                const stopButton = document.querySelector('.stop-button');
                const { id } = ContentStore.state[pageNames.ARTIST_PAGE];

                buttons.addEventListener('click', () => {
                    if (!playButton.hidden) {
                        // eslint-disable-next-line max-len
                        if (SongStore.exist && SongStore.trackInfo.artists.filter((element) => element.name === ContentStore.state[pageNames.ARTIST_PAGE].artist.name).length > 0) {
                            PlayerActions.changePlayState(true);
                        } else {
                            PlayerActions.playArtist(id);
                        }

                        playButton.hidden = true;
                        stopButton.hidden = false;
                    } else {
                        PlayerActions.changePlayState(false);
                        stopButton.hidden = true;
                        playButton.hidden = false;
                    }

                    this.#activatedButton = true;
                });
                if (id !== undefined) {
                    ArtistActions.artist(id);
                    ArtistActions.artistTracks(id);
                    ArtistActions.artistAlbums(id);
                }
            },
            EventTypes.ID_CAN_BE_VIEWED,
            this.name,
        );
        SongStore.subscribe(
            (state) => {
                const playButton = document.querySelector('.play-button');
                const stopButton = document.querySelector('.stop-button');
                if (state) {
                    if (!this.#activatedButton) {
                        this.#activatedButton = false;
                        return;
                    }

                    playButton.hidden = true;
                    stopButton.hidden = false;
                } else {
                    playButton.hidden = false;
                    stopButton.hidden = true;
                }
            },
            EventTypes.CHANGE_PLAY_STATE,
            this.name,
        );
        ContentStore.subscribe(
            (instance) => {
                switch (instance) {
                case 'artist':
                    // todo Remove const from Switch case
                    // eslint-disable-next-line no-case-declarations
                    const { artist } = ContentStore.state[pageNames.ARTIST_PAGE];
                    this.#renderCover(artist);
                    if (artist.isLiked) {
                        imgLike.src = imgPath.liked;
                    } else {
                        imgLike.src = imgPath.notLiked;
                    }
                    break;
                case 'tracks':
                    // eslint-disable-next-line no-case-declarations
                    const { tracks } = ContentStore.state[pageNames.ARTIST_PAGE];
                    this.#lineConfigs.push(setupLineList(tracks.slice(0, 5)));
                    this.#renderLines();

                    if (checkAuth()) {
                        UserActions.favoriteTracks(localStorage.getItem('userId'));
                    }

                    break;
                case 'albums':
                    // eslint-disable-next-line no-case-declarations
                    const { albums } = ContentStore.state[pageNames.ARTIST_PAGE];
                    this.#tapeConfigs.push(setupTape('Albums', 'Albums', shuffleArray(albums).slice(0, 5)));
                    this.#renderTapes();
                    break;
                default:
                }
            },
            EventTypes.ARTIST_CONTENT_DONE,
            this.name,
        );

        API.subscribe(
            () => {
                UserActions.favoriteTracks(localStorage.getItem('userId'));
            },
            EventTypes.LIKED_TRACK,
            this.name,
        );

        API.subscribe(
            () => {
                UserActions.favoriteTracks(localStorage.getItem('userId'));
            },
            EventTypes.UNLIKED_TRACK,
            this.name,
        );

        ContentStore.subscribe(
            (instance) => {
                const { artist } = ContentStore.state[pageNames.ARTIST_PAGE];
                const tracks = ContentStore
                    .state[pageNames.ARTIST_PAGE][instancesNames.LIKED_SONGS];
                switch (instance) {
                case instancesNames.LIKED_SONGS:
                    this.#renderLikedSongs(artist, tracks);
                    break;
                default:
                }
            },
            EventTypes.GOT_FAVORITE_TRACKS,
            this.name,
        );
    }

    /**
     * @description render MainWindowContent in parent
     * @description render MainWindowContent in parent
     */
    render() {
        const renderProcess = new Promise((resolve) => {
            super.appendElement();
            resolve();
        });

        renderProcess.then(() => {
            this.#addSubscribes();
            Actions.checkID(pageNames.ARTIST_PAGE);
        });
    }
}
