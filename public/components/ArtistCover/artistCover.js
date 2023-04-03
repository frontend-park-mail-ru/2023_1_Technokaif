import templateHtml from './artistCover.handlebars';
import './artistCover.less';

/**
 * Create Artist cover
 */
export class ArtistCover {
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
     * @description render ArtistCover in parent
     */
    render(configsForElements) {
        this.#configs = configsForElements;
        this.#parent.innerHTML += this.HTML();
    }

    /**
     * Function to render in loading state
     */
    loadingRender() {
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
