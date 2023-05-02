import templateHtml from './categoryTracks.handlebars';
import './library.less';
import { LineList } from '../LineList/lineList';
import { componentsNames } from '../../../utils/config/componentsNames';
import { BaseComponent } from '../../BaseComponent';
import { EventTypes } from '../../../utils/config/EventTypes';
import ContentStore from '../../../stores/ContentStore';
import Actions from '../../../actions/Actions';
// todo dont forget about it on playlist
import {
    setupLineList,
} from '../../../utils/setup/libraryTracksSetup';
import SongStore from '../../../stores/SongStore';
import IStore from '../../../stores/IStore';
import { imgPath } from '../../../utils/config/pathConfig';
import { pageNames } from '../../../utils/config/pageNames';
import ApiActions from '../../../actions/ApiActions';
import { setupPlaylistLineList } from '../../../utils/setup/playlistSetup';

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
     * Config to use in handlebars setup of track lines
     */
    // @ts-ignore
    private isPlaylist: boolean;

    /**
     * Flag to know if button clicked
     * @private
     */
    private activatedButton: boolean;

    /**
     * Play button
     */
    private playButton;

    /**
     * Type of playlist
     */
    // @ts-ignore
    private type: string;

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
     * Setter of type
     * @param type
     * @protected
     */
    protected setType(type: string) {
        this.type = type;
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

        // eslint-disable-next-line max-len
        const lineName: string = (this.isPlaylist) ? componentsNames.PLAYLIST : componentsNames.TRACK_LIBRARY_LINE_LIST;
        this.#lineConfigs.forEach((configForInsertElement) => {
            const line = new LineList(
                linesPlacement,
                configForInsertElement,
                lineName,
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
            this.name,
        );
    }

    /**
     * Method to set config in BaseComponent
     * @param config
     * @protected
     */
    protected setConfig(config) {
        super.config = config;
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
                const buttons = document.querySelector('.js__button__play') as HTMLDivElement;
                const imgLike = document.querySelector('.albumLike') as HTMLImageElement;
                if (!buttons || !imgLike) {
                    console.warn('Button doesn\'t\'exist on Album', buttons, imgLike);
                }

                this.playButton = buttons;
                if (pageName !== pageNames.LIBRARY_TRACKS) {
                    imgLike.addEventListener('click', () => {
                        const state = ContentStore.state[pageName];
                        if (state.isLiked) {
                            imgLike.src = imgPath.notLiked;
                            ApiActions.unlikePlaylist(state.id);
                        } else {
                            imgLike.src = imgPath.liked;
                            ApiActions.likePlaylist(state.id);
                        }
                        state.isLiked = !state.isLiked;
                    });
                }

                buttons.addEventListener('click', () => {
                    this.activatedButton = true;
                    const trackIds = tracks.map((track) => track.id);
                    // eslint-disable-next-line max-len
                    if (!this.#isAlbumLoaded || !(SongStore.exist && tracks.filter((track) => SongStore.trackInfo.name === track.name).length > 0)) {
                        this.#isAlbumLoaded = true;
                        Actions.addQueueTracks(trackIds);
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
                    this.isPlaylist = false;
                    this.renderLines();
                    break;
                case 'playlist':
                    this.#lineConfigs.push(setupPlaylistLineList(tracks));
                    this.isPlaylist = true;
                    this.renderLines();
                    break;
                default:
                }
            },
            eventType,
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
            this.name,
        );
    }

    /**
     * @description render MainWindowContent in parent
     */
    protected renderPlaylist() {
        const renderProcess = new Promise((resolve) => {
            super.appendElement();
            resolve(true);
        });

        renderProcess.then(() => {
            this.#addSubscribes();
        });
    }
}
