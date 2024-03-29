import { BaseComponent } from '@components/BaseComponent';
import templateHTML from './artistCover.handlebars';
import './artistCover.less';

/**
 * Create Artist cover
 */
export class ArtistCover extends BaseComponent {
    /**
     * Create Artist Cover component.
     * @param {HTMLElement} parent - place where to render
     * @param config - to template
     */
    constructor(parent, config) {
        super(parent, config, templateHTML);
    }
}
