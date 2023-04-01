import './avatar.less';
import templateHtml from './avatar.handlebars';
import { BaseComponent } from '../BaseComponent';

/**
 * Class for Avatar in navbar
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class Avatar extends BaseComponent {
    /**
     * Create Avatar component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Avatar
     * @param {object} config -- what config use to compile template
     */
    constructor(parent, config) {
        super(parent, config, templateHtml);
    }
}
