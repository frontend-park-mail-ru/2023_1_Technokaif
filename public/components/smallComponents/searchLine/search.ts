import { BaseComponent } from '@components/BaseComponent';
import { METHOD } from '@config/config';
import { componentsNames } from '@config/componentsNames';
import { Input } from '@smallComponents/input/input';
import SearchActions from '@API/SearchActions';

import templateHtml from './search.handlebars';
import './search.less';

/**
 * Class of input field for forms.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class SearchLine extends BaseComponent {
    /** config for element */
    #config;

    /** Reaction to change of input */
    private readonly reaction;

    /**
     * Create Input component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Input
     * @param {object} config -- what config use to compule template
     * @param {(field:string):void} reaction -
     * function to trigger. If not set will call to search with all values
    */
    constructor(parent, config, reaction?: {(value: string): void}) {
        super(parent, config, templateHtml, componentsNames.SEARCH_LINE);
        this.#config = config;
        this.reaction = reaction ?? this.sendReaction;
    }

    /** Add input to search line */
    #addInput() {
        const whereToPlaceInput = document.querySelector('.js__input-placement');
        if (!whereToPlaceInput) {
            console.warn('Error at search line. Input placement doesn\'t exist');
            return;
        }
        const input = new Input(whereToPlaceInput as HTMLElement, this.#config.input);
        input.render();
        let timer;
        const func = (field: HTMLInputElement) => (event) => {
            clearTimeout(timer);
            timer = setTimeout(() => this.reaction(field.value), 100);
            event.preventDefault();
        };
        input.addReaction(METHOD.CHANGE_FIELD_IMMEDIATELY, func);
    }

    /** Send reaction */
    private sendReaction(value) {
        if (value === '') {
            SearchActions.emptySearch();
            return;
        }

        SearchActions.search(value);
    }

    /** Render component in parent */
    override render() {
        super.appendElement();
        this.#addInput();
    }
}
