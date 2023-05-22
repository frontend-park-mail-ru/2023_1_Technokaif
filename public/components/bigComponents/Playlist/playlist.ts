import templateHtml from './categoryTracks.handlebars';
import './library.less';
import { componentsNames } from '@config/componentsNames';
import { EventTypes } from '@config/EventTypes';
import {
    setupLineList,
} from '@setup/libraryTracksSetup';
import { imgPath } from '@config/pathConfig';
import { setupPlaylistLineList } from '@setup/playlistSetup';
import PlaylistActions from '@API/PlaylistActions';
import PlayerActions from '@Actions/PlayerActions';
import SongStore from '@store/SongStore';
import ContentStore from '@store/ContentStore';
import { BaseComponent } from '@components/BaseComponent';
import { LineList } from '@bigComponents/LineList/lineList';
import { Notification, TypeOfNotification } from '@smallComponents/notification/notification';

/**
 * Create Artist content
 */
export abstract class Playlist extends BaseComponent {
    /** Flag if album was loaded */
    #isAlbumLoaded;

    /**
     * Config to use in handlebars setup of track lines
     */
    #lineConfigs : Array<object>;

    /**
     * Config to use in handlebars setup of track lines
     */
    private isPlaylist;

    /** Field to collect all callbacks after render */
    // eslint-disable-next-line @typescript-eslint/ban-types
    private callbacksOnRender: Array<Function>;

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
    protected type: string;

    /**
     * Create Playlist. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Playlist
     * @param {string} componentName
     * @param {json} config
     */
    protected constructor(parent, componentName, config) {
        super(parent, config, templateHtml, componentName);
        this.#lineConfigs = [];
        this.activatedButton = false;
        this.#isAlbumLoaded = false;
        this.type = '';
        this.callbacksOnRender = [];
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
                if (imgLike) {
                    imgLike.addEventListener('click', () => {
                        const state = ContentStore.state[pageName];
                        if (state.isLiked) {
                            imgLike.src = imgPath.notLiked;
                            PlaylistActions.unlikePlaylist(state.id);
                        } else {
                            imgLike.src = imgPath.liked;
                            PlaylistActions.likePlaylist(state.id);
                        }
                        state.isLiked = !state.isLiked;
                    });
                }

                buttons.addEventListener('click', () => {
                    const trackIds = tracks.map((track) => track.id);
                    if (trackIds.length > 0 && (!this.#isAlbumLoaded
                        || !(SongStore.exist
                        && tracks.filter((track) => SongStore.trackInfo.name === track.name)
                            .length > 0))) {
                        this.activatedButton = true;

                        this.#isAlbumLoaded = true;
                        PlayerActions.playTrack(trackIds);
                    } else {
                        new Notification(
                            document.querySelector('#root'),
                            'Nothing to play!',
                            undefined,
                            TypeOfNotification.warning,
                        ).appendElement();

                        return;
                    }

                    PlayerActions.changePlayState(!SongStore.isPlaying);
                });

                const share: HTMLImageElement|null = document.querySelector('.shareButton');
                if (!share) {
                    console.error('Button doesn\'t\'exist on Album', buttons, imgLike);
                } else {
                    share.addEventListener('click', () => {
                        navigator.clipboard.writeText(window.location.href)
                            .then(() => {
                                const notification = new Notification(
                                    document.querySelector('.js__navbar'),
                                    'Playlist link saved to clipboard!',
                                );
                                notification.appendElement();
                            })
                            .catch((error) => {
                                const notification = new Notification(
                                    document.querySelector('.js__navbar'),
                                    'Playlist link haven\'t been saved to clipboard!',
                                    'notify',
                                    TypeOfNotification.failure,
                                );
                                notification.appendElement();
                                console.error(`Error in copy to clipboard: ${error}`);
                            });
                    });
                }

                if (!Array.isArray(tracks) || tracks.length === 0) {
                    const placement = document.querySelector('.js__placement-tracks');
                    if (!placement) return;

                    const textElement = document.createElement('p');
                    textElement.innerText = 'Nothing was added!';
                    textElement.classList.add('titleText');

                    placement.appendChild(textElement);
                    return;
                }

                switch (instance) {
                case 'tracks':
                    this.isPlaylist = this.type !== '';
                    if (this.isPlaylist) {
                        this.#lineConfigs.push(setupPlaylistLineList(tracks));
                    } else {
                        this.#lineConfigs.push(setupLineList(tracks));
                    }
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
     * Function to subscribe for playlist page after page
     * @param callback
     * @protected
     */
    protected addEventAfterRender(callback) {
        this.callbacksOnRender.push(callback);
    }

    /**
     * Function of calling functions
     * @private
     */
    protected callAllAfterRender() {
        this.callbacksOnRender.forEach((callback) => callback());
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
