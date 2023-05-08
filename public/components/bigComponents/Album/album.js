import './album.less';
import { componentsNames } from '@config/componentsNames';
import { EventTypes } from '@config/EventTypes';
import { pageNames } from '@config/pageNames';
import { setupLineList } from '@setup/albumSetup';
import { imgPath } from '@config/pathConfig';
// eslint-disable-next-line import/namespace
import AlbumActions from '@API/AlbumActions';
import PlayerActions from '@Actions/PlayerActions';
import SongStore from '@store/SongStore';
import Actions from '@actions/Actions';
import ContentStore from '@store/ContentStore';
import { BaseComponent } from '@components/BaseComponent';
import Router from '@router/Router';
import { LineList } from '@bigComponents/LineList/lineList';
import tmp from './album.handlebars';

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
    playButton;

    /** If first play */
    #firstPlay;

    /** id of Album */
    #id;

    /**
     * Create Album. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Album
     * @param {{json}} config
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
    #renderLines() {
        const linesPlacement = document.querySelector('.js__placement-tracks');
        this.#lineConfigs.forEach((configForInsertElement) => {
            const line = new LineList(
                linesPlacement,
                configForInsertElement,
                componentsNames.ALBUM_LINE_LIST,
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
                        AlbumActions.unLikeAlbum(this.#id);
                    } else {
                        imgLike.src = imgPath.liked;
                        AlbumActions.likeAlbum(this.#id);
                    }
                    state.isLiked = !state.isLiked;
                });

                buttons.addEventListener('click', () => {
                    this.firstPlay = true;
                    if (!this.#isAlbumLoaded) {
                        this.#isAlbumLoaded = true;
                        PlayerActions.playAlbum(id);
                    }

                    if (!SongStore.isPlaying) {
                        PlayerActions.changePlayState(true);
                    } else {
                        PlayerActions.changePlayState(false);
                    }
                });

                if (id !== undefined) {
                    AlbumActions.getAlbum(id);
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
                const artistItem = document.querySelector('.js__author');
                artistItem.addEventListener('click', () => {
                    Router.go(`/artist/${ContentStore.state.ALBUM.id}`);
                });

                const state = ContentStore.state.ALBUM;
                const img = document.querySelector('.album__img');
                const name = document.querySelector('.headerNameOfElementClass');
                const author = document.querySelector('.ArtistClass');
                const imgLike = document.querySelector('.albumLike');
                const description = document.querySelector('.js__description-album');

                if (!img || !name || !author || !imgLike) {
                    console.warn('Error at album. Doesnt have header');
                    return;
                }
                img.src = `/static/img${state.cover}`;

                if (state.isLiked) {
                    imgLike.src = imgPath.liked;
                } else {
                    imgLike.src = imgPath.notLiked;
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
                description.textContent = state.description;

                document.title = state.name;
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
