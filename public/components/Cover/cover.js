import { BaseView } from '../../views/BaseView';
import templateHtml from './cover.handlebars';

/**
 * Create element with image and text below. Inside text: title, description, footer
 */
export class Cover extends BaseView {
    /**
     * Create Cover component.
     * @param {HTMLElement} parent - place where to render
     * @param {JSON} config - to template
     */
    constructor(parent, config) {
        super(parent, config, templateHtml);
    }
}
