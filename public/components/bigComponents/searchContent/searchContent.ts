import './searchContent.less';
import { EventTypes } from '@config/EventTypes';
import {
    setupTape,
} from '@setup/artistSetup';
import { SearchLine } from '@smallComponents/searchLine/search';
import { searchSetup } from '@setup/searchSetup';
import { setupLineList } from '@setup/libraryTracksSetup';
import { componentsNames } from '@config/componentsNames';
import ContentStore from '@store/ContentStore';
import { Tape } from '@bigComponents/Tape/tape';
import { BaseComponent } from '@components/BaseComponent';
import { LineList } from '@bigComponents/LineList/lineList';
import templateHtml from './searchContent.handlebars';

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

    /**
     * Create Playlist. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Playlist
     * @param {string} componentName
     * @param {json} config
     * @param {(value):void} reactionOnSearchLine reaction on search line to
     * where to send value from it
     */
    constructor(parent, componentName, config, reactionOnSearchLine?: {(value):void}) {
        super(parent, config, templateHtml, componentName);
        this.lengths = [];
        this.reaction = reactionOnSearchLine;
    }

    /** Function to render playlists by input configs. */
    private renderPlaylists(playlist) {
        console.log(playlist);
        const playlistsPlacement = document.querySelector('.js__placement-playlists-search');
        if (!playlistsPlacement) {
            console.error('Error in rendering of playlists');
            return;
        }
        const configForTape = setupTape('Playlists', 'Playlists', playlist);

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
        linesPlacement.appendChild(divForPlace);
        const lines = new LineList(divForPlace, setupLineList(tracks, '-search'), componentsNames.SEARCH_LINE);
        lines.appendElement();
    }

    /** Render Albums in search */
    private renderAlbums(albums) {
        const albumPlacement = document.querySelector('.js__placement-albums-search');
        if (!albumPlacement) {
            console.error('Error in rendering of albums');
            return;
        }
        const configForTape = setupTape('Albums', 'Albums', albums);

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
        const configForTape = setupTape('Artists', 'Artists', artists);

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
            label.classList.add('nothing-found');
            nothingPlacement.appendChild(label);
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
                }

                this.lengths.push({
                    name: 'tracks',
                    length: len,
                });

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
            },
            EventTypes.EMPTY_SEARCH,
            this.name,
        );
    }

    /**
     * @description render MainWindowContent in parent
     */
    override render() {
        const renderProcess = new Promise((resolve) => {
            super.appendElement();
            resolve(true);
        });

        renderProcess.then(() => {
            this.#renderSearchLine();
            this.#addSubscribes();
        });
    }

    /** Unrender component */
    override unRender() {
        super.unRender();
    }
}
