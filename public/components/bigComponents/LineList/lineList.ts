import templateHTML from './lineList.handlebars';
import { BaseComponent } from '../../BaseComponent';
import './lineList.less';
import '../../smallComponents/Line/line.less';
import { componentsNames } from '../../../utils/config/componentsNames';
import Actions from '../../../actions/Actions';
import ContentStore from '../../../stores/ContentStore';
import { pageNames } from '../../../utils/config/pageNames';
import { checkAuth } from '../../../utils/functions/checkAuth';
import Router from '../../../router/Router';
import SongStore from '../../../stores/SongStore';
import ApiActions from '../../../actions/ApiActions';
import { EventTypes } from '../../../utils/config/EventTypes';
import API from '../../../stores/API';
import { routingUrl } from '../../../utils/config/routingUrls';

/**
 * Tape for elements
 */
export class LineList extends BaseComponent {
    private parent;

    private config;

    /**
     * Create LineList component. Empty innerHtml before placement
     * @param {Element} parent -- where to place Track
     * @param {object} config -- what config use to compile template
     * @param name
     */
    constructor(parent, config, name) {
        super(parent, config, templateHTML, name);
        this.parent = parent;
        this.config = config;
        this.#addListeners();
    }

    /**
     * Function to make indexes order correct
     * @private
     */
    private indexLines() {
        const trackLines: NodeListOf<HTMLDivElement> = document.querySelectorAll(`.${this.config.lineDiv}`);
        Array.from(trackLines).reduce((previousValue, currentValue, index, array) => {
            const currentIndex: HTMLDivElement = currentValue.querySelector(`.${this.config.lineIndex}`) as HTMLDivElement;
            const currentId = +currentIndex?.innerText;
            const prevIndex: HTMLDivElement = previousValue.querySelector(`.${this.config.lineIndex}`) as HTMLDivElement;
            const prevId = +prevIndex?.innerText;
            if (prevId > index) {
                prevIndex.innerText = String(prevId - 1);
            }
            if (prevId + 1 !== currentId || (prevId + 1 === currentId && index === array.length - 1)) {
                currentIndex.innerText = String(currentId - 1);
            }
            return currentValue;
        });

        const indexBlock: NodeListOf<HTMLDivElement> = document.querySelectorAll(`.${this.config.lineIndex}`);
        // @ts-ignore
        if (Array.from(indexBlock).length === 2) {
            // @ts-ignore
            indexBlock[1]?.innerText = String(+indexBlock[1]?.innerText - 1);
        }
    }

    /**
     * Function to unrender Track
     * @param {string} id
     * @private
     */
    private unrenderTrack(id: string) {
        const trackLines = document.querySelectorAll(`.${this.config.lineDiv}`) as NodeListOf<HTMLDivElement>;
        // @ts-ignore
        const line = Array.from(trackLines).find((trackLine) => trackLine.dataset.id === id);
        if (!line) {
            return;
        }

        line.remove();
        if (Array.from(trackLines).indexOf(line) < Array.from(trackLines).length - 1) {
            this.indexLines();
        }
    }

    /**
     * Function to add click event on tape
     */
    #addListeners() {
        this.parent.addEventListener('click', (event) => {
            const line = event.target.closest(`.${this.config.lineDiv}`) as HTMLDivElement;
            const like = event.target.closest(`.${this.config.likeButtonImg}`) as HTMLImageElement;
            const album: HTMLDivElement = event.target.closest(`.${this.config.lineTitle}`);
            const buttons = event.target.closest(`.${this.config.playButtonImg}`) as HTMLImageElement;
            const playButtons = document.querySelectorAll(`.${this.config.playButton}`) as NodeListOf<HTMLButtonElement>;
            if (line) {
                // todo not clear solution dont forget about
                if (event.target !== buttons && event.target !== like && event.target !== album) {
                    return;
                }

                if (!checkAuth()) {
                    Router.go('/login');
                    return;
                }

                const indexBlock: HTMLDivElement = line.querySelector(`.${this.config.lineIndex}`) as HTMLDivElement;
                if (!indexBlock) {
                    console.error('Cannot find index block');
                    return;
                }

                const id = +indexBlock?.innerText;
                if (!id) {
                    console.error('Cannot get inner text or convert');
                    return;
                }
                // @ts-ignore
                const trackId = line.dataset.id;
                if (!trackId) {
                    console.error('Cannot get dataset variable');
                    return;
                }

                if (event.target === buttons) {
                    if (!playButtons[id - 1]?.hidden) {
                        // eslint-disable-next-line max-len
                        if (SongStore.exist && SongStore.trackInfo.id === +trackId) {
                            Actions.changePlayState(true);
                        } else {
                            switch (this.name) {
                            case componentsNames.ARTIST_LINE_LIST:
                                // eslint-disable-next-line max-len
                                Actions.playArtistWithOffset(ContentStore.state[pageNames.ARTIST_PAGE].id, id - 1);
                                break;
                            case componentsNames.ALBUM_LINE_LIST:
                                // eslint-disable-next-line max-len
                                Actions.playAlbumWithOffset(ContentStore.state[pageNames.ALBUM].id, id - 1);
                                break;
                            case componentsNames.TRACK_LIBRARY_LINE_LIST:
                                // eslint-disable-next-line no-case-declarations
                                const { tracks } = ContentStore.state[pageNames.LIBRARY_TRACKS];
                                // eslint-disable-next-line no-case-declarations
                                const trackIds = tracks.map((track) => track.id);
                                trackIds.forEach((trackid, index) => {
                                    if (index < trackIds.length - 1) {
                                        Actions.queueTrack(trackid);
                                    } else {
                                        Actions.queueTrackWithOffset(trackid, id - 1);
                                    }
                                });

                                break;
                            case componentsNames.SEARCH_LINE:
                                Actions.playTrack(trackId);
                                break;
                            default:
                            }
                        }
                    } else {
                        Actions.changePlayState(false);
                    }
                } else if (event.target === like) {
                    const likeBlock: NodeListOf<HTMLButtonElement> = document.querySelectorAll(`.${this.config.like}`) as NodeListOf<HTMLButtonElement>;
                    const unlike: NodeListOf<HTMLButtonElement> = document.querySelectorAll(`.${this.config.unlike}`) as NodeListOf<HTMLButtonElement>;
                    // eslint-disable-next-line max-len
                    if (!likeBlock || !unlike || likeBlock[id - 1] === undefined || unlike[id - 1] === undefined) {
                        console.error('Cannot find like block', id);
                        return;
                    }

                    if (!likeBlock[id - 1]?.hidden) {
                        ApiActions.likeTrack(trackId);
                        // @ts-ignore
                        likeBlock[id - 1].hidden = true;
                        // @ts-ignore
                        unlike[id - 1].hidden = false;
                    } else {
                        ApiActions.unlikeTrack(trackId);
                        // @ts-ignore
                        likeBlock[id - 1].hidden = false;
                        // @ts-ignore
                        unlike[id - 1].hidden = true;
                    }
                } else if (event.target === album) {
                    const { albumid } = line.dataset;
                    Router.go(routingUrl.ALBUM_PAGE(albumid));
                }
            }
        });

        SongStore.subscribe(
            (state) => {
                const playButtons = document.querySelectorAll(`.${this.config.playButton}`) as NodeListOf<HTMLButtonElement>;
                const stopButtons = document.querySelectorAll(`.${this.config.stopButton}`) as NodeListOf<HTMLButtonElement>;
                const lines = document.querySelectorAll(`.${this.config.lineDiv}`) as NodeListOf<HTMLDivElement>;
                const trackId = SongStore.trackInfo.id;
                for (const key in lines) {
                    if (key === 'entries') break;
                    if (!lines[key]) {
                        console.error('Cannot find line by key');
                        return;
                    }
                    // @ts-ignore
                    if (+lines[key]?.dataset.id === trackId && state === true) {
                        // @ts-ignore
                        playButtons[+key].hidden = true;
                        // @ts-ignore
                        stopButtons[+key].hidden = false;
                    } else {
                        // @ts-ignore
                        playButtons[+key].hidden = false;
                        // @ts-ignore
                        stopButtons[+key].hidden = true;
                    }
                }
            },
            EventTypes.CHANGE_PLAY_STATE,
            this.name,
        );

        API.subscribe(
            (message, id) => {
                if (message === 'OK' && this.name === componentsNames.TRACK_LIBRARY_LINE_LIST) {
                    this.unrenderTrack(id);
                }
            },
            EventTypes.UNLIKED_TRACK,
            this.name,
        );
    }
}