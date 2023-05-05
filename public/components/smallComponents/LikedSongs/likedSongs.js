import './likedSongs.less';
import { BaseComponent } from '@components/BaseComponent';
import templateHTML from './likedSongs.handlebars';

/**
 * Tape for elements
 */
export class LikedSongs extends BaseComponent {
    /**
     * Create LikedSongs component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Track
     * @param {object} config -- what config use to compile template
     */
    constructor(parent, config) {
        super(parent, config, templateHTML);
    }
}
