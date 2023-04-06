import templateHTML from './line.handlebars';
import { BaseComponent } from '../../BaseComponent';
import './line.less';

/**
 * Create element with track-oriented line with img, title, duration, optionally (listens).
 */
export class Line extends BaseComponent {
    /**
     * Create Line component.
     * @param {HTMLElement} parent - place where to render
     * @param {JSON} config - to template
     */
    constructor(parent, config) {
        super(parent, config, templateHTML);
    }
}
