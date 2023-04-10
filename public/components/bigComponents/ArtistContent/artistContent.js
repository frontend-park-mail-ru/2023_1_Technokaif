import templateHtml from './artistContent.handlebars';
import './artistContent.less';
import { LineList } from '../../smallComponents/LineList/lineList';
import { componentsNames } from '../../../utils/config/componentsNames';
import { BaseComponent } from '../../BaseComponent';
import { Tape } from '../Tape/tape';
import { EventTypes } from '../../../utils/config/EventTypes';
import ContentStore from '../../../stores/ContentStore';
import Actions from '../../../actions/Actions';
import ApiActions from '../../../actions/ApiActions';
import { pageNames } from '../../../utils/config/pageNames';
import { ArtistCover } from '../../smallComponents/ArtistCover/artistCover';
import { componentsJSNames } from '../../../utils/config/componentsJSNames';
import { setupArtistCover, setupLineList, setupTape } from '../../../utils/setup/artistSetup';
import { shuffleArray } from '../../../utils/functions/shuffleArray';
import SongStore from '../../../stores/SongStore';

/**
 * Create Artist content
 */
export class ArtistContent extends BaseComponent {
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

    /**
     * Create ArtistCover. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place ArtistCover
     * @param config
     */
    constructor(parent, config) {
        super(parent, config, templateHtml, componentsNames.ARTIST_CONTENT);
        this.#parent = parent;
        this.#tapeConfigs = [];
        this.#lineConfigs = [];
    }

    /**
     * Function to render track lines by input configs.
     */
    #renderLines() {
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
    #renderTapes() {
        const tapesPlacement = document.querySelector('.album-list');
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
     * Method to render artist cover on page
     * @param artist
     */
    #renderCover(artist) {
        const parent = document.querySelector(`.${componentsJSNames.ARTIST_COVER}`);
        const artistCover = new ArtistCover(parent, setupArtistCover(artist));
        artistCover.appendElement();
    }

    /**
     * Function to subscribe to all events from Stores
     */
    #addSubscribes() {
        ContentStore.subscribe(
            () => {
                const { id } = ContentStore.state[pageNames.ARTIST_PAGE];
                const buttons = document.querySelector('.artist-pre-content');
                const playButton = document.querySelector('.play-button');
                const stopButton = document.querySelector('.stop-button');
                buttons.addEventListener('click', () => {
                    if (playButton.hidden === false) {
                        if (SongStore.exist === true) {
                            Actions.createPlay(true);
                        } else {
                            Actions.playArtist(id);
                        }

                        playButton.hidden = true;
                        stopButton.hidden = false;
                    } else {
                        Actions.createPlay(false);
                        stopButton.hidden = true;
                        playButton.hidden = false;
                    }
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
                    this.#renderLines();
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
