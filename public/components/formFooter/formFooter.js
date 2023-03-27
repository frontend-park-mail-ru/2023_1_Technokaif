import { BaseView } from '../../views/BaseView';
import templateHtml from './formFooter.handlebars';

/**
 * Class for next to form content(buttons...).
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class FormFooter extends BaseView {
    /**
     * Create FormFooter component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place FormFooter
     * @param {object} config -- what config use to compule template
     */
    constructor(parent, config) {
        super(parent, config, templateHtml);
    }
}
