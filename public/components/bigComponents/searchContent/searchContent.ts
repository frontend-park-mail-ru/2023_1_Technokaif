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

/**
 * Create Artist content
 */
export class SearchContent extends BaseComponent {
    /**
     * Parent where to render
     */
    // @ts-ignore
    #parent : HTMLElement;

    /**
     * Create Playlist. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Playlist
     * @param {string} componentName
     * @param {json} config
     */
    constructor(parent, componentName, config) {
        super(parent, config, templateHtml, componentName);
        this.#parent = parent;
    }

    /** Function to render track lines by input configs. */
    // @ts-ignore
    private renderLines(tracks) {
        const linesPlacement = document.querySelector('.js__placement-tracks');
        if (!linesPlacement) {
            console.error('Error in rendering of lines');
            return;
        }
        console.log('Return not delete by ide');
        // todo lineList place here
    }

    /** Render Albums in search */
    private renderAlbums(albums) {
        const albumPlacement = document.querySelector('.js__placement-albums');
        if (!albumPlacement) {
            console.error('Error in rendering of albums');
            return;
        }
        const configForTape = setupTape('Albums', albums);

        const tape = new Tape(albumPlacement as HTMLElement, configForTape, 'Albums');
        tape.render();
    }

    /** Render Artist in search */
    private renderArtist(artists) {
        const albumPlacement = document.querySelector('.js__placement-artists');
        if (!albumPlacement) {
            console.error('Error in rendering of artists');
            return;
        }
        const configForTape = setupTape('Albums', artists);

        const tape = new Tape(albumPlacement as HTMLElement, configForTape, 'Albums');
        tape.render();
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
        const state = ContentStore.state.searchPage;
        ContentStore.subscribe(
            () => {
                this.renderLines(state.tracks);
            },
            // todo add to types
            EventTypes.SEARCH_TRACKS_ADDED,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                this.renderAlbums(state.albums);
            },
            // todo add to types
            EventTypes.SEARCH_ALBUMS_ADDED,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                this.renderArtist(state.artists);
            },
            // todo add to types
            EventTypes.SEARCH_ARTISTS_ADDED,
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
