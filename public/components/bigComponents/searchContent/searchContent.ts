import templateHtml from './searchContent.handlebars';
import './searchContent.less';
import { BaseComponent } from '../../BaseComponent';
import { EventTypes } from '../../../utils/config/EventTypes';
import ContentStore from '../../../stores/ContentStore';
import {
    setupTape,
} from '../../../utils/setup/artistSetup';
import { Tape } from '../Tape/tape';
import { SearchLine } from '../../smallComponents/searchLine/search';
import { searchSetup } from '../../../utils/setup/searchSetup';
import { LineList } from '../LineList/lineList';
import { setupLineList } from '../../../utils/setup/libraryTracksSetup';
import { componentsNames } from '../../../utils/config/componentsNames';

/**
 * Create Artist content
 */
export class SearchContent extends BaseComponent {
    /**
     * Create Playlist. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Playlist
     * @param {string} componentName
     * @param {json} config
     */
    constructor(parent, componentName, config) {
        super(parent, config, templateHtml, componentName);
    }

    /** Function to render playlists by input configs. */
    private renderPlaylists(playlist) {
        const playlistsPlacement = document.querySelector('.js__placement-playlists');
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
        const linesPlacement = document.querySelector('.js__placement-tracks');
        if (!linesPlacement) {
            console.error('Error in rendering of lines');
            return;
        }

        const divForPlace = document.createElement('div');
        linesPlacement.appendChild(divForPlace);
        const lines = new LineList(divForPlace, setupLineList(tracks), componentsNames.SEARCH_LINE);
        lines.appendElement();
    }

    /** Render Albums in search */
    private renderAlbums(albums) {
        const albumPlacement = document.querySelector('.js__placement-albums');
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
        const albumPlacement = document.querySelector('.js__placement-artists');
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
        const searchLine = new SearchLine(searchPlacement, searchSetup().searchLine);
        searchLine.render();
    }

    /**
     * Function to subscribe to all events from Stores
     */
    #addSubscribes() {
        ContentStore.subscribe(
            () => {
                const state = ContentStore.state.search;
                const tracksPlacement = document.querySelector('.js__placement-tracks');
                if (tracksPlacement) {
                    tracksPlacement.innerHTML = '';
                }
                if (state.tracks?.tracks?.length > 0) {
                    this.renderLines(state.tracks.tracks);
                }
            },
            EventTypes.SEARCH_TRACKS_ADDED,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                const state = ContentStore.state.search;
                const albumsPlacement = document.querySelector('.js__placement-albums');
                if (albumsPlacement) {
                    albumsPlacement.innerHTML = '';
                }
                if (state.albums?.albums?.length > 0) {
                    this.renderAlbums(state.albums.albums);
                }
            },
            EventTypes.SEARCH_ALBUMS_ADDED,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                const state = ContentStore.state.search;
                const artistsPlacement = document.querySelector('.js__placement-artists');
                if (artistsPlacement) {
                    artistsPlacement.innerHTML = '';
                }

                if (state.artists?.artists?.length > 0) {
                    this.renderArtist(state.artists.artists);
                }
            },
            EventTypes.SEARCH_ARTISTS_ADDED,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                const state = ContentStore.state.search;
                const playlistsPlacement = document.querySelector('.js__placement-playlists');
                if (playlistsPlacement) {
                    playlistsPlacement.innerHTML = '';
                }

                if (state.playlists?.playlists?.length > 0) {
                    this.renderPlaylists(state.playlists.playlists);
                }
            },
            EventTypes.SEARCH_PLAYLIST_ADDED,
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
