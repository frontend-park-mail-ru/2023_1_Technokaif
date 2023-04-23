import templateHtml from './formFooter.handlebars';
import { BaseComponent } from '../../BaseComponent';

/**
 * Class for next to form content(buttons...).
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class FormFooter extends BaseComponent {
    /**
     * Create FormFooter component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place FormFooter
     * @param {object} config -- what config use to compule template
     */
    constructor(parent, config) {
        super(parent, config, templateHtml);
    }
}
