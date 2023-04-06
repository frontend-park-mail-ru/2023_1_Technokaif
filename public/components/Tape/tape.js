import './tape.less';
import Router from '../../router/Router';
import templateHTML from './tape.handlebars';
import { BaseComponent } from '../BaseComponent';
import { componentsNames } from '../../utils/config/componentsNames';
import { instancesNames } from '../../utils/config/instances';

/**
 * Tape for elements
 */
export class Tape extends BaseComponent {
    #name;

    #parent;

    #config;

    /**
     * Create Track component. Empty innerHtml before placement
     * @param {HTMLDocument} parent -- where to place Track
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
        const tapes = document.querySelectorAll('.component');
        this.#parent.addEventListener('click', (event) => {
            const tape = event.target.closest('.component');
            if (tapes) {
                const id = tape.getAttribute('data-id');
                switch (this.#name) {
                case componentsNames.ARTIST_TAPE:
                case 'Artists':
                    Router.go(`/${instancesNames.ARTIST_PAGE}/${id}`);
                    break;
                case 'Tracks':
                    break;
                case 'Albums':
                    break;
                default:
                }
            }
        });
    }
}
