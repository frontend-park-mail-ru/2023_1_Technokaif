import './tape.less';
import Router from '../../../router/Router';
import templateHTML from './tape.handlebars';
import { BaseComponent } from '../../BaseComponent';
import { instancesNames } from '../../../utils/config/instances';
import Actions from '../../../actions/Actions';
import { checkAuth } from '../../../utils/functions/checkAuth';

/**
 * Tape for elements
 */
export class Tape extends BaseComponent {
    #name;

    #parent;

    #config;

    /**
     * Create Track component. Empty innerHtml before placement
     * @param {Element} parent -- where to place Track
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
            const tape = event.target.closest(`.component__${this.#name}`);
            // todo think about checker for existence
            if (!document.querySelector(`.component__${this.#name}`)) {
                return;
            }
            if (tape) {
                const id = tape.getAttribute('data-id');
                switch (this.#name) {
                case 'Artists':
                    Router.go(`/${instancesNames.ARTIST_PAGE}/${id}`);
                    break;
                case 'Tracks':
                    if (checkAuth() !== true) {
                        Router.go('/login');
                        return;
                    }

                    Actions.playTrack(id);
                    break;
                case 'Albums':
                    if (checkAuth() !== true) {
                        Router.go('/login');
                        return;
                    }

                    Actions.playAlbum(id);
                    break;
                default:
                }
            }
        });
    }
}
