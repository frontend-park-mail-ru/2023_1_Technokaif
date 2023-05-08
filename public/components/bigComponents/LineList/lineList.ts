import templateHTML from './lineList.handlebars';
import { BaseComponent } from '@components/BaseComponent';
import './lineList.less';
import '@smallComponents/Line/line.less';
import { componentsNames } from '@config/componentsNames';
import { pageNames } from '@config/pageNames';
import { checkAuth } from '@functions/checkAuth';
import { EventTypes } from '@config/EventTypes';
import { routingUrl } from '@config/routingUrls';
import { DIRECTIONS_DROPDOWN, DropDown } from '@smallComponents/dropDown/dropDown';
import { dropDownTrackSetup } from '@setup/playlistSetup';
import { METHOD } from '@config/config';
import UserActions from '@API/UserActions';
import TrackActions from '@API/TrackActions';
import PlaylistActions from '@API/PlaylistActions';
import PlayerActions from '@Actions/PlayerActions';
import unsubscribeFromAllStoresOnComponent from '@functions/unsubscribeFromAllStores';
import API from '@store/API';
import SongStore from '@store/SongStore';
import Router from '@router/Router';
import ContentStore from '@store/ContentStore';

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
        const userId = localStorage.getItem('userId');
        if (userId) {
            UserActions.userPlaylists(Number(userId));
        }
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

    /** Unsubscribe dropdwon from window on input in search */
    private unsubscribeFromWindow(element:DropDown) {
        const search = document.querySelector('.js__search');
        if (!search || !(search instanceof HTMLInputElement)) {
            console.warn('Error wasn\'t find');
        } else {
            const funcOnSearch = () => {
                if (search.value === '') {
                    return;
                }
                search.removeEventListener(METHOD.CHANGE_FIELD_IMMEDIATELY, funcOnSearch);
                element.unRender();
            };
            search.addEventListener(METHOD.CHANGE_FIELD_IMMEDIATELY, funcOnSearch);
        }
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
        // @ts-ignore
        const trackId = line.dataset.id;
        const dropDown = new DropDown(
            another,
            dropDownTrackSetup(`${index}_sub`),
            DIRECTIONS_DROPDOWN.LEFT,
        );
        this.dropDowns.push(dropDown);
        dropDown.render();
        this.unsubscribeFromWindow(dropDown);

        // const bt1 = document.createElement('div');
        const textAdd = document.createElement('p');
        textAdd.textContent = 'Add';
        dropDown.addOptionsElement(textAdd);
        // @ts-ignore
        dropDown.options.style.padding = '5px';
        // @ts-ignore
        dropDown.options.style.gap = '5px';
        const addDropDown = new DropDown(
            textAdd,
            dropDownTrackSetup(`${index}__subDropAdd`),
            DIRECTIONS_DROPDOWN.LEFT,
        );
        this.playlistsDropDowns.push(addDropDown);
        addDropDown.render();
        this.unsubscribeFromWindow(addDropDown);

        if (this.name === componentsNames.PLAYLIST) {
            const bt3 = document.createElement('div');
            bt3.textContent = 'Remove';
            dropDown.addOptionsElement(bt3, 'click', () => {
                PlaylistActions.removeTrackFromPlaylist(
                    ContentStore.state[pageNames.PLAYLIST].id,
                    trackId,
                );
            });
        }

        // addDropDown.addTitleElement(textAdd);
        this.#addSubDropDown(addDropDown, trackId);
    }

    #addSubDropDown(where, index) {
        const div = document.createElement('div');
        div.classList.add('list-container');
        const ul = document.createElement('ul');
        div.appendChild(ul);
        where.addOptionsElement(div);
        ul.classList.add('item-list');

        this.playlists.forEach((playlist) => {
            const li = document.createElement('li');
            li.classList.add('li-element');
            li.textContent = playlist.name;
            where.addOptionsElement(li, 'click', () => {
                PlaylistActions.addTrackInPlaylist(playlist.id, index);
            });
            ul.appendChild(li);
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
                const div = document.createElement('div');
                div.classList.add('track-line__another');
                div.classList.add('placement-trigger');
                // @ts-ignore
                anothers[index].parentElement.appendChild(div);
                // @ts-ignore
                this.#renderDropDownForOneLine(line, index, div);
                // @ts-ignore
                div.appendChild(anothers[index]);
                // @ts-ignore
                anothers[index].classList.add('dropdown-sub-title');
                // @ts-ignore
                anothers[index].style.zIndex = '1';
            });
            this.isRendered = true;
        }, EventTypes.GOT_USER_PLAYLISTS, this.name);

        this.parent.addEventListener('click', (event) => {
            const line = event.target.closest(`.${this._config.lineDiv}`) as HTMLDivElement;
            const like = event.target.closest(`.${this._config.likeButtonImg}`) as HTMLImageElement;
            const another: HTMLImageElement|null = event.target.closest(`.${this._config.anotherClass}`);
            const album: HTMLDivElement = event.target.closest(`.${this._config.lineTitle}`);
            const buttons = event.target.closest(`.${this._config.playButtonImg}`) as HTMLImageElement;
            const playButtons = document.querySelectorAll(`.${this._config.playButton}`) as NodeListOf<HTMLButtonElement>;
            if (line) {
                // todo not clear solution dont forget about
                if (event.target !== buttons
                    && event.target !== like
                    && event.target !== album
                    && event.target !== another) {
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
                            PlayerActions.changePlayState(true);
                        } else {
                            switch (this.name) {
                            case componentsNames.ARTIST_LINE_LIST:
                                // eslint-disable-next-line max-len
                                PlayerActions.playArtistWithOffset(ContentStore.state[pageNames.ARTIST_PAGE].id, id - 1);
                                break;
                            case componentsNames.ALBUM_LINE_LIST:
                                // eslint-disable-next-line max-len
                                PlayerActions.playAlbumWithOffset(ContentStore.state[pageNames.ALBUM].id, id - 1);
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

                                PlayerActions.addQueueTracks(trackIds, offset);
                                break;
                            case componentsNames.SEARCH_LINE:
                                PlayerActions.playTrack(trackId);
                                break;
                            default:
                            }
                        }
                    } else {
                        PlayerActions.changePlayState(false);
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
                        TrackActions.likeTrack(trackId);
                        // @ts-ignore
                        likeBlock[id - 1].hidden = true;
                        // @ts-ignore
                        unlike[id - 1].hidden = false;
                    } else {
                        TrackActions.unlikeTrack(trackId);
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
