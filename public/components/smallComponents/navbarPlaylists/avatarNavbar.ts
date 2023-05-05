import { BaseComponent } from '@components/BaseComponent';
import templateHTML from './navbarPlaylists.handlebars';
import './navbarPlaylists.less';

/** Setup class for avatar in navbar */
export interface AvatarSetup {
    mainDiv: string,
    imgDiv: string,
    imgSrc: string,
    imgClass: string,
    textDiv: string,
    textClass: string,
    text: string,
}

/**
 * Create element with track-oriented line with img, title, duration, optionally (listens).
 */
export class AvatarNavbar extends BaseComponent {
    /**
     * Create Line component.
     * @param {HTMLElement} parent - place where to render
     * @param {JSON} config - to template
     */
    constructor(parent, config:AvatarSetup) {
        super(parent, config, templateHTML);
    }
}
