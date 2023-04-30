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
    private renderLines(tracks) {
        const linesPlacement = document.querySelector('.js__placement-tracks');
        if (!linesPlacement) {
            console.error('Error in rendering of lines');
            return;
        }

        // eslint-disable-next-line max-len
        const lines = new LineList(linesPlacement, setupLineList(tracks), componentsNames.SEARCH_LINE);
        lines.render();
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
        const configForTape = setupTape('Artists', artists);

        const tape = new Tape(albumPlacement as HTMLElement, configForTape, 'Artists');
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
                if (!state?.tracks) {
                    return;
                }
                this.renderLines(state.tracks);
            },
            EventTypes.SEARCH_TRACKS_ADDED,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                if (!state?.albums) {
                    return;
                }
                this.renderAlbums(state.albums);
            },
            EventTypes.SEARCH_ALBUMS_ADDED,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                if (!state?.artists) {
                    return;
                }
                this.renderArtist(state.artists);
            },
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
