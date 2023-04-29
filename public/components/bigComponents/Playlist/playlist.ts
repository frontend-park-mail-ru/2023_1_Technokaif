import templateHtml from './categoryTracks.handlebars';
import './library.less';
import { LineList } from '../../smallComponents/LineList/lineList';
import { componentsNames } from '../../../utils/config/componentsNames';
import { BaseComponent } from '../../BaseComponent';
import { EventTypes } from '../../../utils/config/EventTypes';
import ContentStore from '../../../stores/ContentStore';
import Actions from '../../../actions/Actions';
// todo dont forget about it on playlist
import {
    setupLineList, TrackInTape,
} from '../../../utils/setup/artistSetup';
import SongStore from '../../../stores/SongStore';
import IStore from '../../../stores/IStore';
import { imgPath } from '../../../utils/config/pathConfig';
import { pageNames } from '../../../utils/config/pageNames';

/**
 * Create Artist content
 */
export abstract class Playlist extends BaseComponent {
    /**
     * Parent where to render
     */
    // @ts-ignore
    #parent : Element;

    /**
     * Create Playlist. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Playlist
     * @param {string} componentName
     * @param {json} config
     */
    protected constructor(parent, componentName, config) {
        super(parent, config, templateHtml, componentName);
        this.#parent = parent;
    }

    /** Render tracks in page */
    #renderTracks(tracks:Array<TrackInTape>) {
        const trackPlacement = document.querySelector('.js__track-placement');
        if (!trackPlacement) {
            console.error('Track placement doesn\'t exist');
            return;
        }

        const trackList = new
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
                            // todo like playlist
                            // ApiActions.unLikeAlbum(state.id);
                        } else {
                            imgLike.src = imgPath.liked;
                            // todo like playlist
                            // ApiActions.likeAlbum(state.id);
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
