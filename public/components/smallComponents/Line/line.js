import templateHTML from './lineIn.handlebars';
import { BaseComponent } from '../../BaseComponent';
import './line.less';
import { METHOD } from '../../../utils/config/config';
import { imgPath } from '../../../utils/config/pathConfig';
import ApiActions from '../../../actions/ApiActions';

/**
 * Create element with track-oriented line with img, title, duration, optionally (listens).
 */
export class Line extends BaseComponent {
    /** config */
    #config;

    /** Id of track */
    #id;

    /**
     * Create Line component.
     * @param {HTMLElement} parent - place where to render
     * @param {JSON} config - to template
     */
    constructor(parent, config) {
        super(parent, config, templateHTML);
        this.#config = config;
        this.#id = config.id;
    }

    /** Add reactions on User Actions */
    #addEventListeners() {
        const a = document.querySelector(`[data-id="${this.#config.id}"]`);
        const likeImg = a.querySelector(`.${this.#config.likedDiv}`);

        const img = likeImg.querySelector(`.js__liked-img__${this.#config.id}`);
        if (this.#config.isLiked) {
            img.src = imgPath.liked;
        } else {
            img.src = imgPath.notLiked;
        }

        likeImg.addEventListener(METHOD.BUTTON, () => {
            if (!this.#config.isLiked) {
                img.src = imgPath.liked;
                ApiActions.likeTrack(this.#id);
            } else {
                img.src = imgPath.notLiked;
                ApiActions.unLikeTrack(this.#id);
            }
            this.#config.isLiked = !this.#config.isLiked;
        });

        a.addEventListener(METHOD.BUTTON, (event) => {
            if (event.target !== img) {
                // todo play this track
            }
        });
    }

    /** Append element */
    appendElement() {
        const renderProcess = new Promise((resolve) => {
            super.appendElement();
            resolve();
        });

        renderProcess.then(() => {
            this.#addEventListeners();
        });
    }
}
