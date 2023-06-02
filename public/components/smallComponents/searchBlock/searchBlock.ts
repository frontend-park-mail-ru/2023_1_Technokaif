import { BaseComponent } from '@components/BaseComponent';
import { runAfterFramePaint } from '@functions/renderAfterPaintDone';
import { METHOD } from '@config/config';
import template from './searchBlock.handlebars';
import './searchBlock.less';

/** Search block for empty page */
export class SearchBlock extends BaseComponent {
    /** What we need to search. Text */
    private readonly whatSearch;

    /** Handler of button */
    private readonly clickHandler;

    /**
     * Create element
     * @param {HTMLElement} parent where to render element
     * @param {string} nameToAdd what name to add to search
     * @param onClickHandler what to do on click of button
     * @param {string} mainClass class for main div for all elements
     */
    constructor(parent, nameToAdd:string, onClickHandler?: {(event): void} | {(): void}, mainClass = '') {
        super(
            parent,
            {
                divClass: mainClass,
                whatSearch: nameToAdd,
            },
            template,
        );

        this.whatSearch = nameToAdd;
        this.clickHandler = onClickHandler;
    }

    /** Append element to parent */
    override appendElement() {
        super.appendElement();

        runAfterFramePaint(() => {
            const button = document
                .querySelector(`.search__block__button__${this.whatSearch}`);

            if (!button) return;
            button.addEventListener(METHOD.BUTTON, this.clickHandler);
        });
    }
}
