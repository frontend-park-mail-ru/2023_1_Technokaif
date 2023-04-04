import templateHtml from './artistContent.handlebars';
import './artistContent.less';
import { LineList } from '../LineList/lineList';
import { componentsNames } from '../../utils/config/componentsNames';
import { BaseComponent } from '../BaseComponent';
import { Tape } from '../Tape/tape';
import { EventTypes } from '../../utils/config/EventTypes';
import ContentStore from '../../stores/ContentStore';
import API from '../../stores/API';
import Actions from '../../actions/Actions';
import ApiActions from '../../actions/ApiActions';
import { pageNames } from '../../utils/config/pageNames';
import { ArtistCover } from '../ArtistCover/artistCover';
import { componentsJSNames } from '../../utils/config/componentsJSNames';
import { setupArtistCover } from '../../utils/setup/artistSetup';

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
    }

    /**
     * Function to render track lines by input configs.
     */
    #renderLines(configs) {
        configs.forEach((configForInsertElement) => {
            const line = new LineList(this.#parent, configForInsertElement);

            this.#parent.innerHTML += line.HTML();
        });
    }

    /**
     * Function to render tapes for albums
     */
    #renderTapes() {
        this.#tapeConfigs.forEach((configForInsertElement) => {
            const tape = new Tape(this.#parent, configForInsertElement);
            this.#parent.innerHTML += tape.HTML();
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
                const { id } = ContentStore.state[this.name];
                ApiActions.artist(id);
            },
            EventTypes.ID_GOT,
            this.name,
        );
        API.subscribe(
            () => {
                const { artist } = ContentStore.state[pageNames.ARTIST_PAGE];
                this.#renderCover(artist);
            },
            EventTypes.ARTIST_CONTENT_DONE,
            this.name,
        );
    }

    /**
     * @description render MainWindowContent in parent
     */
    render() {
        super.appendElement();

        this.#addSubscribes();
        Actions.addElementOnPage(this.name);
    }
}
