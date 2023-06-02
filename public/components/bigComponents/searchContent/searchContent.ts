import './searchContent.less';
import { EventTypes } from '@config/EventTypes';
import {
    setupTape,
} from '@setup/artistSetup';
import { SearchLine } from '@smallComponents/searchLine/search';
import { searchSetup } from '@setup/searchSetup';
import { setupSearchLineList, setupSearchLineListForPlaylist } from '@setup/libraryTracksSetup';
import ContentStore from '@store/ContentStore';
import { Tape } from '@bigComponents/Tape/tape';
import { BaseComponent } from '@components/BaseComponent';
import { LineList } from '@bigComponents/LineList/lineList';
import { pageNames } from '@config/pageNames';
import { METHOD } from '@config/config';
import { runAfterFramePaint } from '@functions/renderAfterPaintDone';
import { removeNothingPlacementInSearch } from '@functions/removeNothingPlacement';
import { FeedContent } from '@bigComponents/FeedContent/feedContent';
import { componentsJSNames } from '@config/componentsJSNames';
import templateHtml from './searchContent.handlebars';

/** What element to search and hide */
const searchNothingElement = 'search-nothing-block';

declare interface ILenParam {
    length: number,
    name: string,
}

/**
 * Create Artist content
 */
export class SearchContent extends BaseComponent {
    /** length of all answers */
    private lengths: ILenParam[];

    /** timer for render elements */
    private timer;

    /** Reaction on search line */
    private readonly reaction;

    /** Type of playlist search or default */
    private type;

    /**
     * Create Playlist. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Playlist
     * @param {string} componentName
     * @param type
     * @param {json} config
     * @param {(value):void} reactionOnSearchLine reaction on search line to
     * where to send value from it
     */
    constructor(parent, componentName, type, config, reactionOnSearchLine?: {(value):void}) {
        super(parent, config, templateHtml, componentName);
        this.type = type;
        this.lengths = [];
        this.reaction = reactionOnSearchLine;
    }

    /** Function to render playlists by input configs. */
    private renderPlaylists(playlist) {
        const playlistsPlacement = document.querySelector('.js__placement-playlists-search');
        if (!playlistsPlacement) {
            console.error('Error in rendering of playlists');
            return;
        }
        const configForTape = setupTape('Playlists', 'Found playlists', playlist);

        const tape = new Tape(playlistsPlacement as HTMLElement, configForTape, 'Playlists');
        tape.appendElement();
    }

    /** Function to render track lines by input configs. */
    private renderLines(tracks) {
        const linesPlacement = document.querySelector('.js__placement-tracks-search');
        if (!linesPlacement) {
            console.error('Error in rendering of lines');
            return;
        }

        const divForPlace = document.createElement('div');
        const tracksTitleBlock = document.createElement('div');
        tracksTitleBlock.classList.add('tape__title');
        const tracksTitle = document.createElement('h2');
        tracksTitleBlock.appendChild(tracksTitle);
        tracksTitle.innerText = 'Found tracks';
        divForPlace.appendChild(tracksTitleBlock);
        linesPlacement.appendChild(divForPlace);
        let lines;
        if (this.type === 'playlist') {
            lines = new LineList(
                divForPlace,
                setupSearchLineListForPlaylist(tracks, ContentStore.state[pageNames.PLAYLIST].id),
                this.name,
            );
        } else {
            lines = new LineList(
                divForPlace,
                setupSearchLineList(tracks),
                this.name,
            );
        }
        lines.appendElement();
    }

    /** Render Albums in search */
    private renderAlbums(albums) {
        const albumPlacement = document.querySelector('.js__placement-albums-search');
        if (!albumPlacement) {
            console.error('Error in rendering of albums');
            return;
        }
        const configForTape = setupTape('Albums', 'Found albums', albums);

        const tape = new Tape(albumPlacement as HTMLElement, configForTape, 'Albums');
        tape.appendElement();
    }

    /** Render Artist in search */
    private renderArtist(artists) {
        const albumPlacement = document.querySelector('.js__placement-artists-search');
        if (!albumPlacement) {
            console.error('Error in rendering of artists');
            return;
        }
        const configForTape = setupTape('Artists', 'Found artists', artists);

        const tape = new Tape(albumPlacement as HTMLElement, configForTape, 'Artists');
        tape.appendElement();
    }

    /** Add search line */
    #renderSearchLine() {
        const searchPlacement = document.querySelector('.js__placement-search');
        if (!searchPlacement) {
            console.error('Error in rendering of search line');
            return;
        }
        const searchLine = new SearchLine(searchPlacement, searchSetup().searchLine, this.reaction);
        searchLine.render();
    }

    /** Timer if not found element */
    private checkForNothingAndOutput() {
        clearTimeout(this.timer);

        let isExist = false;
        this.lengths.forEach((lengthAndName) => {
            if (lengthAndName.length > 0) {
                isExist = true;
            }
        });

        const nothingPlacement = document.querySelector('.js__nothing-found-search');
        const label = document.createElement('p');
        if (!nothingPlacement) return;
        nothingPlacement.innerHTML = '';

        if (!isExist) {
            label.innerHTML = 'Nothing was found';
            if (this.type === 'default') {
                this.renderRecommendations();
            }
            label.classList.add('nothing-found');
            nothingPlacement.appendChild(label);
        } else if (this.type === 'default') {
            this.unrenderRecommendations();
        }

        this.lengths = [];
    }

    /** Set timer on check for nothing */
    private setTimer() {
        clearTimeout(this.timer);

        if (this.lengths.length === 4) {
            this.checkForNothingAndOutput();
            return;
        }

        this.timer = setTimeout(this.checkForNothingAndOutput.bind(this), 1000);
    }

    /**
     * Function to subscribe to all events from Stores
     */
    #addSubscribes() {
        ContentStore.subscribe(
            () => {
                const state = ContentStore.state.search;
                const tracksPlacement = document.querySelector('.js__placement-tracks-search');
                if (tracksPlacement) {
                    tracksPlacement.innerHTML = '';
                }
                let len = 0;
                if (state.tracks?.tracks?.length > 0) {
                    len = state.tracks.tracks.length;
                    this.renderLines(state.tracks.tracks);
                    removeNothingPlacementInSearch();
                }

                const indexExist = this.lengths.findIndex((el) => el.name === 'tracks');
                if (indexExist >= 0) {
                    // todo ask grisha about this problem
                    // @ts-ignore
                    this.lengths.at(indexExist).length = len;
                } else {
                    this.lengths.push({
                        name: 'tracks',
                        length: len,
                    });
                }

                this.setTimer();
            },
            EventTypes.SEARCH_TRACKS_ADDED,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                const state = ContentStore.state.search;
                const albumsPlacement = document.querySelector('.js__placement-albums-search');
                if (albumsPlacement) {
                    albumsPlacement.innerHTML = '';
                }

                let len = 0;
                if (state.albums?.albums?.length > 0) {
                    len = state.albums.albums.length;
                    this.renderAlbums(state.albums.albums);
                    removeNothingPlacementInSearch();
                }

                this.lengths.push({
                    name: 'albums',
                    length: len,
                });

                this.setTimer();
            },
            EventTypes.SEARCH_ALBUMS_ADDED,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                const state = ContentStore.state.search;
                const artistsPlacement = document.querySelector('.js__placement-artists-search');
                if (artistsPlacement) {
                    artistsPlacement.innerHTML = '';
                }

                let len = 0;
                if (state.artists?.artists?.length > 0) {
                    len = state.artists.artists.length;
                    this.renderArtist(state.artists.artists);
                    removeNothingPlacementInSearch();
                }
                this.lengths.push({
                    name: 'artists',
                    length: len,
                });

                this.setTimer();
            },
            EventTypes.SEARCH_ARTISTS_ADDED,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                const state = ContentStore.state.search;
                const playlistsPlacement = document.querySelector('.js__placement-playlists-search');
                if (playlistsPlacement) {
                    playlistsPlacement.innerHTML = '';
                }

                let len = 0;
                if (state.playlists?.playlists?.length > 0) {
                    len = state.playlists.playlists.length;
                    this.renderPlaylists(state.playlists.playlists);
                    removeNothingPlacementInSearch();
                }
                this.lengths.push({
                    name: 'playlists',
                    length: len,
                });

                this.setTimer();
            },
            EventTypes.SEARCH_PLAYLIST_ADDED,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                clearTimeout(this.timer);

                const tracksPlacement = document.querySelector('.js__placement-tracks-search');
                const albumsPlacement = document.querySelector('.js__placement-albums-search');
                const artistsPlacement = document.querySelector('.js__placement-artists-search');
                const playlistsPlacement = document.querySelector('.js__placement-playlists-search');
                const nothingPlacement = document.querySelector('.js__nothing-found-search');
                if (!playlistsPlacement || !artistsPlacement
                || !albumsPlacement || !tracksPlacement || !nothingPlacement) {
                    console.warn('Can\'t find placements');
                    return;
                }

                nothingPlacement.innerHTML = '';
                tracksPlacement.innerHTML = '';
                albumsPlacement.innerHTML = '';
                artistsPlacement.innerHTML = '';
                playlistsPlacement.innerHTML = '';

                if (this.type === 'default') {
                    this.renderRecommendations();
                }
            },
            EventTypes.EMPTY_SEARCH,
            this.name,
        );

        if (this.type === 'default') {
            const input: HTMLInputElement|null = document.querySelector('.search-line__input');
            input?.addEventListener(METHOD.FIELD, () => {
                const albums = document.querySelector('.js__placement-albums-search');
                const tracks = document.querySelector('.js__placement-tracks-search');
                const artists = document.querySelector('.js__placement-artists-search');
                const playlists = document.querySelector('.js__placement-playlists-search');
                if (albums?.children.length
                    || tracks?.children.length
                    || artists?.children.length
                    || playlists?.children.length) {
                    this.unrenderRecommendations();
                } else {
                    this.renderRecommendations();
                }
            });
        }

        if (this.type !== 'default') {
            this.unrenderRecommendations();
        }
    }

    /**
     * Method to render recommendation block
     * @private
     */
    private renderRecommendations() {
        const nothingFoundBlock: HTMLElement| null = document.querySelector(`.${searchNothingElement}`);
        if (!nothingFoundBlock) {
            console.error('No nothing element on search');
            return;
        }

        new FeedContent(nothingFoundBlock, {}).render();
    }

    /**
     * Method to unrender recommendation block
     * @private
     */
    private unrenderRecommendations() {
        const nothingFoundBlock: HTMLElement| null = document.querySelector(`.${componentsJSNames.FEED_CONTENT}`);
        if (!nothingFoundBlock) {
            console.error('No nothing element on search');
            return;
        }

        nothingFoundBlock.remove();
    }

    /**
     * @description render MainWindowContent in parent
     */
    override render() {
        super.appendElement();

        runAfterFramePaint(() => {
            if (this.type === 'default') {
                this.renderRecommendations();
            }

            this.#renderSearchLine();
            this.#addSubscribes();
        });
    }

    /** Unrender component */
    override unRender() {
        super.unRender();
    }
}
