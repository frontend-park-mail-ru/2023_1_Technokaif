import templateHTML from './lineList.handlebars';
import { BaseComponent } from '../BaseComponent';
import './lineList.less';

/**
 * Tape for elements
 */
export class LineList extends BaseComponent {
    /**
     * Create LineList component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Track
     * @param {object} config -- what config use to compile template
     */
    constructor(parent, config) {
        super(parent, config, templateHTML);
    }
}
