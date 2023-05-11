import templateHtml from './search.handlebars';
import './search.less';
import { BaseComponent } from '@components/BaseComponent';
import { METHOD } from '@config/config';
import { componentsNames } from '@config/componentsNames';
import { Input } from '@smallComponents/input/input';
import SearchAtions from '@API/SearchAtions';

/**
 * Class of input field for forms.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json fields.
 */
export class SearchLine extends BaseComponent {
    /** config for element */
    #config;

    /**
     * Create Input component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Input
     * @param {object} config -- what config use to compule template
    */
    constructor(parent, config) {
        super(parent, config, templateHtml, componentsNames.SEARCH_LINE);
        this.#config = config;
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

        const func = (field: HTMLInputElement) => (event) => {
            event.preventDefault();
            const { value } = field;
            if (value === '') {
                SearchAtions.emptySearch();
                return;
            }

            SearchAtions.search(value);
        };
        input.addReaction(METHOD.CHANGE_FIELD_IMMEDIATELY, func);
    }

    /** Render component in parent */
    override render() {
        super.appendElement();
        this.#addInput();
    }
}
