import templateHtml from './artistContent.handlebars';
import './artistContent.less';
import { componentsNames } from '@config/componentsNames';
import { EventTypes } from '@config/EventTypes';
import { pageNames } from '@config/pageNames';
import { ArtistCover } from '@smallComponents/ArtistCover/artistCover';
import { componentsJSNames } from '@config/componentsJSNames';
import {
    ContentArtist,
    setupArtistCover,
    setupLikedSongs,
    setupLineList,
    setupTape, TapeSetup,
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
     * Config to use in handlebars setup of tapes
     */
    private tapeConfigs: Array<TapeSetup>;

    /**
     * Config to use in handlebars setup of track lines
     */
    private lineConfigs: Array<ContentArtist>;

    /**
     * Flag to know if the button already started the music or not
     * Boolean
     */
    private activatedButton: boolean;

    /**
     * Create ArtistCover. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place ArtistCover
     * @param config
     */
    constructor(parent, config) {
        super(parent, config, templateHtml, componentsNames.ARTIST_CONTENT);
        this.tapeConfigs = [];
        this.lineConfigs = [];
        this.activatedButton = false;
    }

    /**
     * Function to render track lines by input configs.
     */
    #renderLines() {
        const linesPlacement: HTMLElement|null = document.querySelector('.artist-items');
        if (!linesPlacement) {
            console.error('Error in lines render on artist');
            return;
        }

        this.lineConfigs.forEach((configForInsertElement) => {
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
        const tapesPlacement: HTMLElement|null = document.querySelector('.album-list');
        if (!tapesPlacement) {
            console.error('Error in tapes render on artist');
            return;
        }

        this.tapeConfigs.forEach((configForInsertElement) => {
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
        const parent: HTMLElement|null = document.querySelector(`.${componentsJSNames.ARTIST_COVER}`);
        if (!parent) {
            console.error('Error in cover render on artist');
            return;
        }

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
        const placement: HTMLElement|null = document.querySelector('.artist-items');
        const likeBlock: HTMLElement|null = document.querySelector('.liked-songs');
        if (!placement) {
            console.error('Error in liked songs render on artist');
            return;
        }

        if (likeBlock) {
            placement.removeChild(likeBlock);
        }

        const counter = tracks.reduce((acc, track) => {
            const isTrackOfArtist = track.artists.find((trackArtist) => trackArtist.name
                === artist.name);

            if (isTrackOfArtist) {
                acc += 1;
            }
            return acc;
        }, 0);

        const likedSongs = new LikedSongs(placement, setupLikedSongs(artist, counter));
        likedSongs.appendElement();
    }

    /**
     * Function to subscribe to all events from Stores
     */
    #addSubscribes() {
        const imgLike: HTMLImageElement|null = document.querySelector('.like__img');
        if (!imgLike) {
            console.error('Error on artist img find');
            return;
        }

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
                const buttons: HTMLDivElement|null = document.querySelector('.pre-buttons');
                const playButton: HTMLButtonElement|null = document.querySelector('.play-button');
                const stopButton: HTMLButtonElement|null = document.querySelector('.stop-button');
                const { id } = ContentStore.state[pageNames.ARTIST_PAGE];

                if (!buttons || !playButton || !stopButton) {
                    console.error('Error on artist subscribes');
                    return;
                }

                buttons.addEventListener('click', () => {
                    if (!playButton.hidden) {
                        const isThisArtist = SongStore
                            .trackInfo
                            .artists
                            .find((element) => element.name === ContentStore
                                .state[pageNames.ARTIST_PAGE]
                                .artist
                                .name);

                        if (SongStore.exist && isThisArtist) {
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

                    this.activatedButton = true;
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
                const playButton: HTMLButtonElement|null = document.querySelector('.play-button');
                const stopButton: HTMLButtonElement|null = document.querySelector('.stop-button');
                if (!playButton || !stopButton) {
                    console.error('Error on artist subscribes on song store');
                    return;
                }

                if (state) {
                    if (!this.activatedButton) {
                        this.activatedButton = false;
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
                const { artist } = ContentStore.state[pageNames.ARTIST_PAGE];
                const { tracks } = ContentStore.state[pageNames.ARTIST_PAGE];
                const { albums } = ContentStore.state[pageNames.ARTIST_PAGE];

                switch (instance) {
                case 'artist':
                    this.#renderCover(artist);
                    imgLike.src = artist.isLiked ? imgPath.liked : imgPath.notLiked;
                    break;
                case 'tracks':
                    this.lineConfigs.push(setupLineList(tracks.slice(0, 5)));
                    this.#renderLines();

                    if (checkAuth()) {
                        UserActions.favoriteTracks(localStorage.getItem('userId'));
                    }

                    break;
                case 'albums':
                    this.tapeConfigs.push(setupTape('Albums', 'Albums', shuffleArray(albums).slice(0, 5)));
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
    override render() {
        super.appendElement();

        this.#addSubscribes();
        Actions.checkID(pageNames.ARTIST_PAGE);
    }
}
