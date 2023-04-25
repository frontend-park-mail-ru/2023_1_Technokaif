import templateHtml from './header.handlebars';
import { BaseComponent } from '../../BaseComponent';

/**
 * Class for header in login and registration.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class Header extends BaseComponent {
    /**
     * Create Header component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Album
     * @param {object} config -- what config use to compule template
    */
    constructor(parent, config) {
        super(parent, config, templateHtml);
    }
}
