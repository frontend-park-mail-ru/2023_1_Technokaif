import templateHTML from './libraryList.handlebars';
import './libraryList.less';
import { BaseComponent } from '../../BaseComponent';

/**
 * Create Artist cover
 */
export class LibraryList extends BaseComponent {
    /**
     * Create Artist Cover component.
     * @param {HTMLElement} parent - place where to render
     * @param {{json}} config - to template
     */
    constructor(parent, config) {
        super(parent, config, templateHTML);
    }
}
