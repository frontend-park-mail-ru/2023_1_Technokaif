import templateHtml from './artistContent.handlebars';
import './artistContent.less';
import { Line } from '../Line/line';

/**
 * Create Artist content
 */
export class ArtistContent {
    /**
     * Parent where to render
     */
    #parent;

    /**
     * Configs to use in api
     */
    #configs;

    /**
     * Config to use in general components
     */
    #config;

    /**
     * Create ArtistCover. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place ArtistCover
     * @param config
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Function to render track lines by input configs.
     */
    #renderLines() {
        this.#configs.forEach((configForInsertElement) => {
            const line = new Line(this.#parent, configForInsertElement);

            this.#parent.innerHTML += line.HTML();
        });
    }

    /**
     * @description render MainWindowContent in parent
     */
    render() {
        this.#parent.innerHTML += this.HTML();
    }

    /**
     * If cfg is given then return compiled template with cfg else with inner config
     * @returns Html string of template to place
     */
    HTML() {
        return templateHtml(this.#config);
    }
}
