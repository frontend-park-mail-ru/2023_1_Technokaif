import { BaseView } from '../../views/BaseView';
import templateHtml from './sex.handlebars';

/**
 * Class for gender choose fields in forms.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class Sex extends BaseView {
    #parent;

    #config;

    /**
     * Create Sex component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Sex component
     * @param {object} config -- what config use to compule template
    */
    constructor(parent, config) {
        super(parent, config, templateHtml);
    }
}
