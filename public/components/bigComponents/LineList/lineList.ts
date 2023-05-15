import { BaseComponent } from '@components/BaseComponent';
import '@smallComponents/Line/line.less';
import { componentsNames } from '@config/componentsNames';
import { pageNames } from '@config/pageNames';
import { checkAuth } from '@functions/checkAuth';
import { EventTypes } from '@config/EventTypes';
import { routingUrl } from '@config/routingUrls';
import { DIRECTIONS_DROPDOWN, DropDown } from '@smallComponents/dropDown/dropDown';
import { dropDownTrackSetup } from '@setup/playlistSetup';
import UserActions from '@API/UserActions';
import TrackActions from '@API/TrackActions';
import PlaylistActions from '@API/PlaylistActions';
import PlayerActions from '@Actions/PlayerActions';
import unsubscribeFromAllStoresOnComponent from '@functions/unsubscribeFromAllStores';
import API from '@store/API';
import SongStore from '@store/SongStore';
import Router from '@router/Router';
import ContentStore from '@store/ContentStore';
import { METHOD } from '@config/config';
import { Notification } from '@smallComponents/notification/notification';
import templateHTML from './lineList.handlebars';
import './lineList.less';

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

    /**
     * Function to make indexes order correct
     * @private
     */
    private indexLines() {
        const trackLines: NodeListOf<HTMLDivElement> = document.querySelectorAll(`.${this._config.lineDiv}`);
        Array.from(trackLines).reduce((previousValue, currentValue, index, array) => {
            const currentIndex: HTMLDivElement = currentValue.querySelector(`.${this._config.lineIndex}`) as HTMLDivElement;
            const currentId = Number(currentIndex?.innerText);
            const prevIndex: HTMLDivElement = previousValue.querySelector(`.${this._config.lineIndex}`) as HTMLDivElement;
            const prevId = Number(prevIndex?.innerText);
            if (prevId > index) {
                prevIndex.innerText = String(prevId - 1);
            }
            // eslint-disable-next-line max-len
            if (prevId + 1 !== currentId || (prevId + 1 === currentId && index === array.length - 1)) {
                currentIndex.innerText = String(currentId - 1);
            }
            return currentValue;
        });

        const indexBlocks: NodeListOf<HTMLDivElement> = document.querySelectorAll(`.${this._config.lineIndex}`);
        // @ts-ignore
        if (Array.from(indexBlocks).length === 2) {
            // @ts-ignore
            indexBlocks[1]?.innerText = String(Number(indexBlocks[1])?.innerText - 1);
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

    /**
     * Render dropdown list for track line
     * @param line
     * @param index
     * @param another
     * @private
     */
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
        const opt = dropDown.options;
        if (opt) {
            opt.classList.add('dropdown-options__add-remove-options');
        }

        const textAdd = document.createElement('p');
        textAdd.textContent = 'Add';
        dropDown.addOptionsElement(textAdd);
        if (dropDown?.options && (dropDown.options instanceof HTMLElement)) {
            // @ts-ignore
            dropDown.options.style = {
                ...dropDown.options.style,
                padding: '5px',
                gap: '5px',
            };
        }

        const addDropDown = new DropDown(
            textAdd,
            dropDownTrackSetup(`${index}__subDropAdd`),
            DIRECTIONS_DROPDOWN.LEFT,
        );
        this.playlistsDropDowns.push(addDropDown);
        addDropDown.render();

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

        this.#addSubDropDown(addDropDown, trackId, dropDown);
    }

    #addSubDropDown(where, index, mainDropDown) {
        // const deleteNotification = (elementToDelete) => {
        //     const placement = mainDropDown.parent;
        //     if (!placement) return;
        //     placement.removeChild(elementToDelete);
        // };

        const div = document.createElement('div');
        div.classList.add('list-container');
        const ul = document.createElement('ul');
        div.appendChild(ul);
        where.addOptionsElement(div, METHOD.BUTTON, () => {
            mainDropDown.hideOptions();
            const notification = new Notification(document.querySelector('.js__navbar'), 'Song is added to playlist!');
            notification.appendElement();

            // setTimeout(()=>{
            //     deleteNotification(notification.element)
            // }, 1000);
        });
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

                if (!(line instanceof HTMLElement)) {
                    console.warn('Line doesnt HTMLElement');
                    return;
                }

                const element = anothers[index];
                const parentOfDots = anothers[index]?.parentElement;
                if (!element || !(parentOfDots) || !(element instanceof HTMLImageElement)) {
                    console.warn('Cant find 3 dots');
                    return;
                }

                parentOfDots.appendChild(div);
                this.#renderDropDownForOneLine(line, index, div);
                div.appendChild(element);
                element.classList.add('dropdown-sub-title');
                element.style.zIndex = '1';
            });
            this.isRendered = true;
        }, EventTypes.GOT_USER_PLAYLISTS, this.name);

        this.parent.addEventListener('click', (event) => {
            const line = event.target.closest(`.${this._config.lineDiv}`) as HTMLDivElement;
            const like = event.target.closest(`.${this._config.likeButtonImg}`) as HTMLImageElement;
            const another: HTMLImageElement|null = event.target.closest(`.${this._config.anotherClass}`);
            const album: HTMLDivElement = event.target.closest(`.${this._config.lineTitle}`);
            const buttons = event.target.closest(`.${this._config.playButtonImg}`) as HTMLImageElement;
            const playButtons = document
                .querySelectorAll(`.${this._config.playButton}`) as NodeListOf<HTMLButtonElement>;

            if (line) {
                // todo not clear solution dont forget about
                if (event.target !== buttons
                    && event.target !== like
                    && event.target !== album
                    && event.target !== another) {
                    return;
                }

                if (!checkAuth()) {
                    Router.go(routingUrl.LOGIN);
                    return;
                }

                const indexBlock: HTMLDivElement = line.querySelector(`.${this._config.lineIndex}`) as HTMLDivElement;
                if (!indexBlock) {
                    console.error('Cannot find index block');
                    return;
                }

                const id = Number(indexBlock?.innerText);
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
                    if (Number(lines[key]?.dataset.id) === trackId && state === true) {
                        // @ts-ignore
                        playButtons[Number(key)].hidden = true;
                        // @ts-ignore
                        stopButtons[Number(key)].hidden = false;
                    } else {
                        // @ts-ignore
                        playButtons[Number(key)].hidden = false;
                        // @ts-ignore
                        stopButtons[Number(key)].hidden = true;
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

    /**
     * Append line list
     */
    override appendElement() {
        super.appendElement();
        this.#addListeners();
    }
}
