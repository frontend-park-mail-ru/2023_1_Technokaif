import templateHtml from './artistContent.handlebars';
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
import { checkAuth } from '../../../utils/functions/checkAuth';

/**
 * Create Artist content
 */
export class Library extends BaseComponent {
    /**
     * Parent where to render
     */
    #parent;

    /**
     * Config to use in handlebars setup of tapes
     */
    #tapeConfigs;

    /**
     * Config to use in handlebars setup of track lines
     */
    #lineConfigs;

    private navbarInfoPlacement;

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
        this.navbarInfoPlacement = document.querySelector('.navbar_library_element');
    }

    /**
     * Function to render track lines by input configs.
     */
    private renderLines() {
        const linesPlacement = document.querySelector('.artist-items');
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
                    if (!playButton.hidden) {
                        // eslint-disable-next-line max-len
                        if (SongStore.exist && SongStore.trackInfo.artists.filter((element) => element.name === ContentStore.state[pageNames.ARTIST_PAGE].artist.name).length > 0) {
                            Actions.changePlayState(true);
                        } else {
                            Actions.playArtist(id);
                        }

                        playButton.hidden = true;
                        stopButton.hidden = false;
                    } else {
                        Actions.changePlayState(false);
                        stopButton.hidden = true;
                        playButton.hidden = false;
                    }

                    this.#activatedButton = true;
                });
                if (id !== undefined) {
                    ApiActions.artist(id);
                    ApiActions.artistTracks(id);
                    ApiActions.artistAlbums(id);
                }
            },
            EventTypes.ID_CAN_BE_VIEWED,
            this.name,
        );
        SongStore.subscribe(
            (state) => {
                const playButton = document.querySelector('.play-button');
                const stopButton = document.querySelector('.stop-button');
                if (state) {
                    playButton.hidden = true;
                    stopButton.hidden = false;
                } else {
                    playButton.hidden = false;
                    stopButton.hidden = true;
                }
            },
            EventTypes.CHANGE_PLAY_STATE,
            this.name,
        );
        ContentStore.subscribe(
            (instance) => {
                switch (instance) {
                case 'artist':
                    // todo Remove const from Switch case
                    // eslint-disable-next-line no-case-declarations
                    const { artist } = ContentStore.state[pageNames.ARTIST_PAGE];
                    this.#renderCover(artist);
                    break;
                case 'tracks':
                    // eslint-disable-next-line no-case-declarations
                    const { tracks } = ContentStore.state[pageNames.ARTIST_PAGE];
                    this.#lineConfigs.push(setupLineList(tracks.slice(0, 5)));
                    this.renderLines();

                    if (checkAuth()) {
                        const artist1 = ContentStore.state[pageNames.ARTIST_PAGE].artist;
                        this.#renderLikedSongs(artist1);
                    }

                    break;
                case 'albums':
                    // eslint-disable-next-line no-case-declarations
                    const { albums } = ContentStore.state[pageNames.ARTIST_PAGE];
                    this.#tapeConfigs.push(setupTape('Albums', shuffleArray(albums).slice(0, 5)));
                    this.#renderTapes();
                    break;
                default:
                }
            },
            EventTypes.ARTIST_CONTENT_DONE,
            this.name,
        );
    }

    /**
     * @description render MainWindowContent in parent
     */
    render() {
        const renderProcess = new Promise((resolve) => {
            super.appendElement();
            resolve();
        });

        renderProcess.then(() => {
            this.#addSubscribes();
            Actions.checkID(pageNames.ARTIST_PAGE);
        });
    }
}
