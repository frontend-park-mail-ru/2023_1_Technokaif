import tmp from './album.handlebars';
import './album.less';
import { Line } from '../../smallComponents/Line/line';
import { componentsNames } from '../../../utils/config/componentsNames';
import { BaseComponent } from '../../BaseComponent';
import { EventTypes } from '../../../utils/config/EventTypes';
import ContentStore from '../../../stores/ContentStore';
import Actions from '../../../actions/Actions';
import ApiActions from '../../../actions/ApiActions';
import { pageNames } from '../../../utils/config/pageNames';
import { setupLineList } from '../../../utils/setup/artistSetup';
import SongStore from '../../../stores/SongStore';
import { setupLine } from '../../../utils/setup/setupLine.js';
import { imgPath } from '../../../utils/config/pathConfig';

/** Class for Album */
export class Album extends BaseComponent {
    /** Flag if album was loaded */
    #isAlbumLoaded;

    /**
     * Parent where to render
     */
    #parent;

    /**
     * Config to use in handlebars setup of track lines
     */
    #lineConfigs;

    /**
     * If button in play mode
     */
    #isPlaying;

    /**
     * Play button
     */
    #playButton;

    /** If first play */
    #firstPlay;

    /** id of Album */
    #id;

    /**
     * Create Album. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Album
     * @param {JSON} config
     */
    constructor(parent, config) {
        super(parent, config, tmp, componentsNames.ALBUM);
        this.parent = parent;
        this.#lineConfigs = [];
        this.#isPlaying = SongStore.isPlaying;
        this.#isAlbumLoaded = false;
        this.#firstPlay = false;
    }

    /**
     * Function to render track lines by input configs.
     */
    #renderLines(tracks) {
        const linesPlacement = document.querySelector('.js__placement-tracks');
        let pos = 0;
        tracks.forEach((track) => {
            pos += 1;
            const line = new Line(
                linesPlacement,
                setupLine(track, pos),
            );
            line.appendElement();
        });
    }

    /**
     * Function to subscribe to all events from Stores
     */
    #addSubscribes() {
        ContentStore.subscribe(
            () => {
                const { id } = ContentStore.state[pageNames.ALBUM];
                this.#id = id;
                const buttons = document.querySelector('.js__button__play');
                const imgLike = document.querySelector('.albumLike');

                if (!buttons || !imgLike) {
                    console.warn('Button doesn\'t\'exist on Album');
                    return;
                }
                this.playButton = buttons;

                imgLike.addEventListener('click', () => {
                    const state = ContentStore.state.ALBUM;
                    if (state.isLiked) {
                        imgLike.src = imgPath.notLiked;
                        ApiActions.unLikeAlbum(this.#id);
                    } else {
                        imgLike.src = imgPath.liked;
                        ApiActions.likeAlbum(this.#id);
                    }
                    state.isLiked = !state.isLiked;
                });

                buttons.addEventListener('click', () => {
                    this.firstPlay = true;
                    if (!this.#isAlbumLoaded) {
                        this.#isAlbumLoaded = true;
                        Actions.playArtist(id);
                    }

                    if (!SongStore.isPlaying) {
                        Actions.changePlayState(true);
                    } else {
                        Actions.changePlayState(false);
                    }
                });

                if (id !== undefined) {
                    ApiActions.getAlbum(id);
                }
            },
            EventTypes.ID_CAN_BE_VIEWED,
            super.name,
        );

        ContentStore.subscribe(
            (instance) => {
                if (instance === 'tracks') {
                    const { tracks } = ContentStore.state[pageNames.ALBUM];
                    this.#lineConfigs.push(setupLineList(tracks));
                    this.#renderLines(tracks);
                }
            },
            EventTypes.ALBUM_CONTENT_DONE,
            super.name,
        );

        ContentStore.subscribe(
            () => {
                const state = ContentStore.state.ALBUM;
                const img = document.querySelector('.album__img');
                const name = document.querySelector('.headerNameOfElementClass');
                const author = document.querySelector('.ArtistClass');
                const imgLike = document.querySelector('.albumLike');

                if (!img || !name || !author || !imgLike) {
                    console.warn('Error at album. Doesnt have header');
                    return;
                }
                img.src = `/static/img${state.cover}`;

                if (state.isLiked) {
                    imgLike.src = imgPath.liked;
                }
                name.textContent = state.name;
                let artistsText = state.artists[0].name;
                if (state.artists.length > 2) {
                    artistsText = state.artists.reduce((acc, value, index) => {
                        if (index !== state.artists.length) {
                            return `${acc} ${value.name},`;
                        }

                        return `${acc} ${value.name}`;
                    });
                }
                author.textContent = artistsText;
            },
            EventTypes.GOT_ONE_ALBUM,
            super.name,
        );

        SongStore.subscribe(
            this.changeStatePlayer.bind(this),
            EventTypes.CHANGE_PLAY_STATE,
            componentsNames.ALBUM,
        );
    }

    /** Change state of Play button */
    changeStatePlayer(newState) {
        if (this.firstPlay) {
            if (newState) {
                this.firstPlay = true;
                this.playButton.src = imgPath.pauseAlbum;
            } else {
                this.isPlaying = false;
                this.playButton.src = imgPath.playAlbum;
            }
        }
    }

    /**
     * @description render MainWindowContent in parent
     */
    render() {
        const renderProcess = new Promise((resolve) => {
            super.appendElement();
            resolve();
        });

        renderProcess.then(() => {
            this.#addSubscribes();
            Actions.checkID(pageNames.ALBUM);
        });
    }
}
