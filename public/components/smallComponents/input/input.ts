import { BaseComponent } from '@components/BaseComponent';
import templateHtml from './input.handlebars';
import './input.less';

/**
 * Class of input field for forms.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class Input extends BaseComponent {
    /** config for element */
    #config;

    /**
     * Create Input component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Input
     * @param {object} config -- what config use to compule template
     */
    constructor(parent, config) {
        super(parent, config, templateHtml);
        this.#config = config;
    }

    /**
     * Add eventListener with event string and action
     * @param event
     * @param action must be function that can take HTLMInputField
     * @example
     * const action = (field: HTMLInputElement) => (event) => {
     *     event.preventDefault();
     *     // do something with field
     * };
     * input.addReaction(event, action)
     */
    addReaction(event, action) {
        const input: HTMLInputElement|null = document.querySelector(`.js__${this.#config.nameOfField}`);
        if (!input) {
            console.error('Input error. Can\'t find input:', this.#config.nameOfField);
            return;
        }

        input.addEventListener(event, action(input));
    }
}
