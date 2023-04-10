import templateHTML from './lineList.handlebars';
import { BaseComponent } from '../../BaseComponent';
import './lineList.less';
import '../Line/line.less';
import { componentsNames } from '../../../utils/config/componentsNames';
import Actions from '../../../actions/Actions';
import ContentStore from '../../../stores/ContentStore';
import { pageNames } from '../../../utils/config/pageNames';

/**
 * Tape for elements
 */
export class LineList extends BaseComponent {
    #name;

    #parent;

    #config;

    /**
     * Create LineList component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Track
     * @param {object} config -- what config use to compile template
     * @param name
     */
    constructor(parent, config, name) {
        super(parent, config, templateHTML);
        this.#parent = parent;
        this.#config = config;
        this.#name = name;

        this.#addListeners();
    }

    /**
     * Function to add click event on tape
     */
    #addListeners() {
        this.#parent.addEventListener('click', (event) => {
            const line = event.target.closest('.track-line');
            if (line) {
                switch (this.#name) {
                case componentsNames.ARTIST_LINE_LIST:
                    Actions.playArtist(ContentStore.state[pageNames.ARTIST_PAGE].id);
                    break;
                default:
                }
            }
        });
    }
}