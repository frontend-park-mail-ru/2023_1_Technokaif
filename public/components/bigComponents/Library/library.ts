import templateHtml from './library.handlebars';
import { LineList } from '../../smallComponents/LineList/lineList';
import { componentsNames } from '../../../utils/config/componentsNames';
import { BaseComponent } from '../../BaseComponent';
import { Tape } from '../Tape/tape';
import { EventTypes } from '../../../utils/config/EventTypes';
import ContentStore from '../../../stores/ContentStore';
import Actions from '../../../actions/Actions';
import ApiActions from '../../../actions/ApiActions';
import { pageNames } from '../../../utils/config/pageNames';
import {
    setupLineList,
    setupTape,
} from '../../../utils/setup/artistSetup';
import { shuffleArray } from '../../../utils/functions/shuffleArray';
import SongStore from '../../../stores/SongStore';

/**
 * Create Artist content
 */
export class Library extends BaseComponent {
    /**
     * Parent where to render
     */
    // @ts-ignore
    #parent : Element;

    /**
     * Config to use in handlebars setup of tapes
     */
    #tapeConfigs : Array<any>;

    /**
     * Config to use in handlebars setup of track lines
     */
    #lineConfigs : Array<any>;

    /**
     * Element where to insert navbar widgets
     * @private
     */
    // @ts-ignore
    private navbarInfoPlacement: Element;

    /**
     * Flag to know if button clicked
     * @private
     */
    // @ts-ignore
    private activatedButton: boolean;

    /**
     * Create ArtistCover. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place ArtistCover
     * @param config
     */
    constructor(parent, config) {
        super(parent, config, templateHtml, componentsNames.LIBRARY);
        this.#parent = parent;
        this.#tapeConfigs = [];
        this.#lineConfigs = [];
        this.activatedButton = false;
        // @ts-ignore
        this.navbarInfoPlacement = document.querySelector('.navbar_library_element');
    }

    /**
     * Function to render track lines by input configs.
     */
    private renderLines() {
        const linesPlacement = document.querySelector('.artist-items');
        if (!linesPlacement) {
            console.error('Error in rendering of lines');
            return;
        }
        this.#lineConfigs.forEach((configForInsertElement) => {
            const line = new LineList(
                linesPlacement,
                configForInsertElement,
                componentsNames.ARTIST_LINE_LIST,
            );
            line.appendElement();
        });
    }

    /**
     * Function to render tapes for albums
     */
    private renderTapes() {
        const tapesPlacement = document.querySelector('.album-list');
        if (!tapesPlacement) {
            console.error('Error in rendering of tapes');
            return;
        }
        this.#tapeConfigs.forEach((configForInsertElement) => {
            const tape = new Tape(
                tapesPlacement,
                configForInsertElement,
                configForInsertElement.titleText,
            );
            tape.appendElement();
        });
    }

    /**
     * Function to subscribe to all events from Stores
     */
    #addSubscribes() {
        ContentStore.subscribe(
            () => {
                const buttons = document.querySelector('.pre-buttons');
                const playButton = document.querySelector('.play-button');
                const stopButton = document.querySelector('.stop-button');
                const { id } = ContentStore.state[pageNames.ARTIST_PAGE];

                if (!playButton || !buttons || !stopButton) {
                    console.error('error in buttons search');
                    return;
                }

                buttons.addEventListener('click', () => {
                    // @ts-ignore
                    if (!playButton.hidden) {
                        // eslint-disable-next-line max-len
                        if (SongStore.exist && SongStore.trackInfo.artists.filter((element) => element.name === ContentStore.state[pageNames.ARTIST_PAGE].artist.name).length > 0) {
                            // @ts-ignore
                            Actions.changePlayState(true);
                        } else {
                            // @ts-ignore
                            Actions.playArtist(id);
                        }

                        // @ts-ignore
                        playButton.hidden = true;
                        // @ts-ignore
                        stopButton.hidden = false;
                    } else {
                        // @ts-ignore
                        Actions.changePlayState(false);
                        // @ts-ignore
                        stopButton.hidden = true;
                        // @ts-ignore
                        playButton.hidden = false;
                    }

                    this.activatedButton = true;
                });
                if (id !== undefined) {
                    // @ts-ignore
                    ApiActions.artist(id);
                    // @ts-ignore
                    ApiActions.artistTracks(id);
                    // @ts-ignore
                    ApiActions.artistAlbums(id);
                }
            },
            EventTypes.ID_CAN_BE_VIEWED,
            // @ts-ignore
            this.name,
        );

        SongStore.subscribe(
            (state) => {
                const playButton = document.querySelector('.play-button');
                const stopButton = document.querySelector('.stop-button');
                if (!playButton || !stopButton) {
                    console.error('error in buttons search');
                    return;
                }
                if (state) {
                    // @ts-ignore
                    playButton.hidden = true;
                    // @ts-ignore
                    stopButton.hidden = false;
                } else {
                    // @ts-ignore
                    playButton.hidden = false;
                    // @ts-ignore
                    stopButton.hidden = true;
                }
            },
            EventTypes.CHANGE_PLAY_STATE,
            // @ts-ignore
            this.name,
        );
        ContentStore.subscribe(
            (instance) => {
                switch (instance) {
                case 'artist':
                    break;
                case 'tracks':
                    // eslint-disable-next-line no-case-declarations
                    const { tracks } = ContentStore.state[pageNames.ARTIST_PAGE];
                    this.#lineConfigs.push(setupLineList(tracks.slice(0, 5)));
                    this.renderLines();

                    break;
                case 'albums':
                    // eslint-disable-next-line no-case-declarations
                    const { albums } = ContentStore.state[pageNames.ARTIST_PAGE];
                    this.#tapeConfigs.push(setupTape('Albums', shuffleArray(albums).slice(0, 5)));
                    this.renderTapes();
                    break;
                default:
                }
            },
            EventTypes.ARTIST_CONTENT_DONE,
            // @ts-ignore
            this.name,
        );
    }

    /**
     * @description render MainWindowContent in parent
     */
    renderLibrary() {
        const renderProcess = new Promise((resolve) => {
            super.appendElement();
            resolve(true);
        });

        renderProcess.then(() => {
            this.#addSubscribes();
            // @ts-ignore
            Actions.checkID(pageNames.ARTIST_PAGE);
        });
    }
}
