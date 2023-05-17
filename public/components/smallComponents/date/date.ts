import { BaseComponent } from '@components/BaseComponent';
import templateHtml from './date.handlebars';

/**
 * Class for date fields manipulations.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class Date extends BaseComponent {
    /**
     * Create Date component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Date
     * @param {object} config -- what config use to compule template
     */
    constructor(parent, config) {
        super(parent, config, templateHtml);
    }
}
