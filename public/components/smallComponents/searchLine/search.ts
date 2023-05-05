import templateHtml from './search.handlebars';
import './search.less';
import { BaseComponent } from '../../BaseComponent';
import { Input } from '../input/input';
import { METHOD } from '../../../utils/config/config';
import { componentsNames } from '../../../utils/config/componentsNames';
import ApiActions from '../../../actions/ApiActions';

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
                return;
            }

            ApiActions.search(value);
        };
        input.addReaction(METHOD.CHANGE_FIELD_IMMEDIATELY, func);
    }

    /** Render component in parent */
    override render() {
        super.appendElement();
        this.#addInput();
    }
}
