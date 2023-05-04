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
import unsubscribeFromAllStoresOnComponent from '../../../utils/functions/unsubscribeFromAllStores';
import { DIRECTIONS_DROPDOWN, DropDown } from '../../smallComponents/dropDown/dropDown';
import { dropDownTrackSetup } from '../../../utils/setup/playlistSetup';

/**
 * Tape for elements
 */
export class LineList extends BaseComponent {
    private playlists;

    private parent;

    private _config;

    /**
     * Dropdown elements for track lines
     * @private
     */
    private dropDowns;

    /**
     * Dropdown elements for track lines
     * @private
     */
    private playlistsDropDowns;

    /** if was rendered */
    private isRendered;

    /**
     * Create LineList component. Empty innerHtml before placement
     * @param {Element} parent -- where to place Track
     * @param {object} config -- what config use to compile template
     * @param name
     */
    constructor(parent, config, name) {
        super(parent, config, templateHTML, name);
        this.parent = parent;
        this._config = config;
        this.dropDowns = [];
        this.playlistsDropDowns = [];
        this.playlists = [];
        this.isRendered = false;
        this.unsubscribeLines();
        ApiActions.userPlaylists(+localStorage.getItem('userId'));
    }

    /**
     * Method to unsubscibe from all previous lines
     */
    private unsubscribeLines() {
        unsubscribeFromAllStoresOnComponent(componentsNames.ALBUM_LINE_LIST);
        unsubscribeFromAllStoresOnComponent(componentsNames.ARTIST_LINE_LIST);
        unsubscribeFromAllStoresOnComponent(componentsNames.PLAYLIST_LINE_LIST);
        unsubscribeFromAllStoresOnComponent(componentsNames.TRACK_LIBRARY_LINE_LIST);
    }

    /**
     * Function to make indexes order correct
     * @private
     */
    private indexLines() {
        const trackLines: NodeListOf<HTMLDivElement> = document.querySelectorAll(`.${this._config.lineDiv}`);
        Array.from(trackLines).reduce((previousValue, currentValue, index, array) => {
            const currentIndex: HTMLDivElement = currentValue.querySelector(`.${this._config.lineIndex}`) as HTMLDivElement;
            const currentId = +currentIndex?.innerText;
            const prevIndex: HTMLDivElement = previousValue.querySelector(`.${this._config.lineIndex}`) as HTMLDivElement;
            const prevId = +prevIndex?.innerText;
            if (prevId > index) {
                prevIndex.innerText = String(prevId - 1);
            }
            if (prevId + 1 !== currentId || (prevId + 1 === currentId && index === array.length - 1)) {
                currentIndex.innerText = String(currentId - 1);
            }
            return currentValue;
        });

        const indexBlock: NodeListOf<HTMLDivElement> = document.querySelectorAll(`.${this._config.lineIndex}`);
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
        const trackLines = document.querySelectorAll(`.${this._config.lineDiv}`) as NodeListOf<HTMLDivElement>;
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

    #renderDropDownForOneLine(line:HTMLElement, index, another) {
        const trackId = line.dataset.id;
        const dropDown = new DropDown(
            line,
            dropDownTrackSetup(`${index}_sub`),
            DIRECTIONS_DROPDOWN.LEFT,
        );
        this.dropDowns.push(dropDown);
        dropDown.render();
        dropDown.addTitleElement(another);
        dropDown.menu.style.zIndex = '10';
        dropDown.menu.style.width = 'fit-content';
        dropDown.menu.style.height = 'fit-content';
        dropDown.menu.style.color = 'white';
        dropDown.menu.classList.add('track-line__another');

        const bt1 = document.createElement('div');
        const textAdd = document.createElement('p');
        textAdd.textContent = 'Add';
        const addDropDown = new DropDown(
            bt1,
            dropDownTrackSetup(`${index}__subDropAdd`),
            DIRECTIONS_DROPDOWN.LEFT,
        );
        this.playlistsDropDowns.push(addDropDown);
        addDropDown.render();

        dropDown.addOptionsElement(bt1);
        addDropDown.title.style.zIndex = '9999';
        addDropDown.title.style.width = 'fit-content';
        addDropDown.title.style.height = 'fit-content';
        addDropDown.title.style.boxSizing = 'border-box';
        addDropDown.title.style.color = 'fit-content';
        addDropDown.title.style.width = 'fit-content';
        addDropDown.title.style.color = 'white';
        addDropDown.options.style.color = 'white';

        if (this.name === componentsNames.PLAYLIST) {
            const bt3 = document.createElement('div');
            bt3.textContent = 'Remove';
            dropDown.addOptionsElement(bt3, 'click', () => {
                ApiActions.removeTrackFromPlaylist(ContentStore.state[pageNames.PLAYLIST].id, trackId);
            });
        }

        addDropDown.addTitleElement(textAdd);
        this.#addSubDropDown(addDropDown, trackId);
    }

    #addSubDropDown(where, index) {
        this.playlists.forEach((playlist) => {
            const div = document.createElement('p');
            div.textContent = playlist.name;
            where.addOptionsElement(div, 'click', () => {
                ApiActions.addTrackInPlaylist(playlist.id, index);
            });
        });
    }

    /**
     * Function to add click event on tape
     */
    #addListeners() {
        ContentStore.subscribe((instance) => {
            if (this.isRendered) return;
            // eslint-disable-next-line max-len
            this.playlists = ContentStore.state[pageNames.LIBRARY_PLAYLISTS][instance];
            const lines = document.querySelectorAll(`.${this._config.lineDiv}`);
            const anothers = document.querySelectorAll(`.${this._config.anotherClass}`);

            lines.forEach((line, index) => {
                console.log('Index', index);
                this.#renderDropDownForOneLine(line, index, anothers[index]);
            });
            this.isRendered = true;
        }, EventTypes.GOT_USER_PLAYLISTS, this.name);

        const lines = document.querySelectorAll(`.${this._config.lineDiv}`);
        const anothers = document.querySelectorAll(`.${this._config.anotherClass}`);

        // lines.forEach((line, index) => {
        //     console.log('Index', index);
        //     this.#renderDropDownForOneLine(line, index, anothers[index]);
        // });

        // todo dont touch
        this.parent.addEventListener('click', (event) => {
            const line = event.target.closest(`.${this._config.lineDiv}`) as HTMLDivElement;
            const like = event.target.closest(`.${this._config.likeButtonImg}`) as HTMLImageElement;
            const another: HTMLImageElement|null = event.target.closest(`.${this._config.anotherClass}`);
            const album: HTMLDivElement = event.target.closest(`.${this._config.lineTitle}`);
            const buttons = event.target.closest(`.${this._config.playButtonImg}`) as HTMLImageElement;
            const playButtons = document.querySelectorAll(`.${this._config.playButton}`) as NodeListOf<HTMLButtonElement>;
            if (line) {
                // todo not clear solution dont forget about
                if (event.target !== buttons && event.target !== like && event.target !== album && event.target !== another) {
                    return;
                }

                if (!checkAuth()) {
                    Router.go('/login');
                    return;
                }

                const indexBlock: HTMLDivElement = line.querySelector(`.${this._config.lineIndex}`) as HTMLDivElement;
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
                                let offset = id - 1;
                                if (offset < 0) {
                                    offset = 0;
                                }

                                Actions.addQueueTracks(trackIds, offset);
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
                    const likeBlock: NodeListOf<HTMLButtonElement> = document.querySelectorAll(`.${this._config.like}`) as NodeListOf<HTMLButtonElement>;
                    const unlike: NodeListOf<HTMLButtonElement> = document.querySelectorAll(`.${this._config.unlike}`) as NodeListOf<HTMLButtonElement>;
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
                } else if (event.target === another) {

                }
            }
        });

        SongStore.subscribe(
            (state) => {
                const playButtons = document.querySelectorAll(`.${this._config.playButton}`) as NodeListOf<HTMLButtonElement>;
                const stopButtons = document.querySelectorAll(`.${this._config.stopButton}`) as NodeListOf<HTMLButtonElement>;
                const lines = document.querySelectorAll(`.${this._config.lineDiv}`) as NodeListOf<HTMLDivElement>;
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

        API.subscribe(
            (message, id) => {
                if (message === 'OK' && this.name === componentsNames.PLAYLIST) {
                    this.unrenderTrack(id);
                }
            },
            EventTypes.REMOVED_TRACK_FROM_PLAYLIST,
            this.name,
        );
    }

    override appendElement() {
        const renderProcess = new Promise((resolve) => {
            super.appendElement();
            resolve('');
        });

        renderProcess.then(() => {
            this.#addListeners();
        });
    }
}
