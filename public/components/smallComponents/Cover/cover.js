import templateHtml from './cover.handlebars';
import { BaseComponent } from '../../BaseComponent';

/**
 * Create element with image and text below. Inside text: title, description, footer
 */
export class Cover extends BaseComponent {
    /**
     * Create Cover component.
     * @param {HTMLElement} parent - place where to render
     * @param {JSON} config - to template
     */
    constructor(parent, config) {
        super(parent, config, templateHtml);
    }
}
