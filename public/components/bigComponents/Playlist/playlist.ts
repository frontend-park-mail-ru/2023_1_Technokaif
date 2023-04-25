import templateHtml from './categoryTracks.handlebars';
import './library.less';
import { LineList } from '../../smallComponents/LineList/lineList';
import { componentsNames } from '../../../utils/config/componentsNames';
import { BaseComponent } from '../../BaseComponent';
import { EventTypes } from '../../../utils/config/EventTypes';
import ContentStore from '../../../stores/ContentStore';
import Actions from '../../../actions/Actions';
import {
    setupLineList,
} from '../../../utils/setup/artistSetup';
import SongStore from '../../../stores/SongStore';
import IStore from '../../../stores/IStore';
import { imgPath } from '../../../utils/config/pathConfig';
import { pageNames } from '../../../utils/config/pageNames';

/**
 * Create Artist content
 */
export abstract class Playlist extends BaseComponent {
    /** Flag if album was loaded */
    #isAlbumLoaded;

    /**
     * Parent where to render
     */
    // @ts-ignore
    #parent : Element;

    /**
     * Config to use in handlebars setup of track lines
     */
    #lineConfigs : Array<object>;

    /**
     * Flag to know if button clicked
     * @private
     */
    // @ts-ignore
    private activatedButton: boolean;

    /**
     * Play button
     */
    private playButton;

    /**
     * Create Playlist. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Playlist
     * @param {string} componentName
     * @param {json} config
     */
    protected constructor(parent, componentName, config) {
        super(parent, config, templateHtml, componentName);
        this.#parent = parent;
        this.#lineConfigs = [];
        this.activatedButton = false;
        this.#isAlbumLoaded = false;
    }

    /**
     * Function to render track lines by input configs.
     */
    private renderLines() {
        const linesPlacement = document.querySelector('.js__placement-tracks');
        if (!linesPlacement) {
            console.error('Error in rendering of lines');
            return;
        }
        this.#lineConfigs.forEach((configForInsertElement) => {
            const line = new LineList(
                linesPlacement,
                configForInsertElement,
                componentsNames.TRACK_LIBRARY_LINE_LIST,
            );
            line.appendElement();
        });
    }

    /**
     * Function to subscribe to all events from Stores
     */
    #addSubscribes() {
        SongStore.subscribe(
            this.changeStatePlayer.bind(this),
            EventTypes.CHANGE_PLAY_STATE,
            // @ts-ignore
            this.name,
        );
    }

    /**
     * Function to subscribe base logic
     * @param eventType
     * @param pageName
     * @protected
     */
    protected subscribeBaseLogic(eventType: string, pageName: string) {
        ContentStore.subscribe(
            (instance) => {
                const { tracks } = ContentStore.state[pageName];
                const buttons = document.querySelector('.js__button__play');
                const imgLike = document.querySelector('.albumLike');
                if (!buttons || !imgLike) {
                    console.warn('Button doesn\'t\'exist on Album');
                    return;
                }

                this.playButton = buttons;
                if (pageName !== pageNames.LIBRARY_TRACKS) {
                    imgLike.addEventListener('click', () => {
                        const state = ContentStore.state[pageName];
                        if (state.isLiked) {
                            // @ts-ignore
                            imgLike.src = imgPath.notLiked;
                            // todo like playlist
                            // ApiActions.unLikeAlbum(state.id);
                        } else {
                            // @ts-ignore
                            imgLike.src = imgPath.liked;
                            // todo like playlist
                            // ApiActions.likeAlbum(state.id);
                        }
                        state.isLiked = !state.isLiked;
                    });
                } else {
                    // @ts-ignore
                    imgLike.hidden = true;
                }

                buttons.addEventListener('click', () => {
                    this.activatedButton = true;
                    const trackIds = tracks.map((track) => track.id);
                    if (!this.#isAlbumLoaded || !(SongStore.exist && tracks.filter((track) => SongStore.trackInfo.name === track.name).length > 0)) {
                        this.#isAlbumLoaded = true;
                        trackIds.forEach((trackId) => {
                            Actions.queueTrack(trackId);
                        });
                    }

                    if (!SongStore.isPlaying) {
                        Actions.changePlayState(true);
                    } else {
                        Actions.changePlayState(false);
                    }
                });

                switch (instance) {
                case 'tracks':
                    this.#lineConfigs.push(setupLineList(tracks));
                    this.renderLines();
                    break;
                case 'playlist':

                    break;
                default:
                }
            },
            eventType,
            // @ts-ignore
            this.name,
        );
    }

    /** Change state of Play button */
    changeStatePlayer(newState) {
        if (this.activatedButton) {
            if (newState) {
                this.activatedButton = true;
                this.playButton.src = imgPath.pauseAlbum;
            } else {
                this.activatedButton = false;
                this.playButton.src = imgPath.playAlbum;
            }
        }
    }

    /**
     * Function to subscribe for playlist page
     * @param store
     * @param eventType
     * @param callback
     * @protected
     */
    protected addStoreSubscribeCallback(store: IStore, eventType: string, callback) {
        store.subscribe(
            callback,
            eventType,
            // @ts-ignore
            this.name,
        );
    }

    /**
     * @description render MainWindowContent in parent
     */
    renderPlaylist() {
        const renderProcess = new Promise((resolve) => {
            super.appendElement();
            resolve(true);
        });

        renderProcess.then(() => {
            this.#addSubscribes();
        });
    }
}
