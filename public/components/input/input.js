import { BaseView } from '../../views/BaseView';
import templateHtml from './input.handlebars';
import './input.less';

/**
 * Class of input field for forms.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class Input extends BaseView {
    /**
     * Create Input component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Input
     * @param {object} config -- what config use to compule template
    */
    constructor(parent, config) {
        super(parent, config, templateHtml);
    }
}
