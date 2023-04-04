import './tape.less';
import templateHTML from './tape.handlebars';
import { BaseComponent } from '../BaseComponent';

/**
 * Tape for elements
 */
export class Tape extends BaseComponent {
    /**
     * Create Track component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Track
     * @param {object} config -- what config use to compile template
     * @param name
     */
    constructor(parent, config, name) {
        super(parent, config, templateHTML, name);
    }
}
