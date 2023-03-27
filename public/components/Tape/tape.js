import './tape.less';
import templateHTML from './tape.handlebars';
import { BaseView } from '../../views/BaseView';

/**
 * Tape for elements
 */
export class Tape extends BaseView {
    /**
     * Create Track component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Track
     * @param {object} config -- what config use to compule template
     */
    constructor(parent, config) {
        super(parent, config, templateHTML);
    }
}
