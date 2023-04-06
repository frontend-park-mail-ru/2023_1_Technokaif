import templateHTML from './artistCover.handlebars';
import './artistCover.less';
import { BaseComponent } from '../../BaseComponent';

/**
 * Create Artist cover
 */
export class ArtistCover extends BaseComponent {
    /**
     * Create Artist Cover component.
     * @param {HTMLElement} parent - place where to render
     * @param {{json}} config - to template
     */
    constructor(parent, config) {
        super(parent, config, templateHTML);
    }
}
