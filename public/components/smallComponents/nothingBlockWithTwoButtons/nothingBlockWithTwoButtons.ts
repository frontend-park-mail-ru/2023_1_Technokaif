import { BaseComponent } from '@components/BaseComponent';
import { runAfterFramePaint } from '@functions/renderAfterPaintDone';
import { METHOD } from '@config/config';
import template from './nothingBlockWithTwoButtons.handlebars';
import './nothingBlockWithTwoButtons.less';

/** Search block for empty page */
export class NothingBlockWithTwoButtons extends BaseComponent {
    /** What we need to search. Text */
    private readonly whatSearch;

    /** Handler of button */
    private readonly clickHandler;

    /**
     * Create element
     * @param {HTMLElement} parent where to render element
     * @param {string} nameToAdd what name to add to search
     * @param onClickHandlerLeft what to do on click of left button
     * @param onClickHandlerRight what to do on click of right button
     * @param {string} mainClass class for main div for all elements
     */
    constructor(
        parent,
        nameToAdd:string,
        onClickHandlerLeft?: {(event): void} | {(): void},
        onClickHandlerRight?: {(event): void} | {(): void},
        mainClass = '',
    ) {
        super(
            parent,
            {
                divClass: mainClass,
                whatSearch: nameToAdd,
            },
            template,
        );

        this.whatSearch = nameToAdd;
        this.clickHandler = [onClickHandlerLeft, onClickHandlerRight];
    }

    /** Append element to parent */
    override appendElement() {
        super.appendElement();

        runAfterFramePaint(() => {
            const searchButton = document
                .querySelector(`.search__two-block__button__${this.whatSearch}`);

            if (!searchButton) return;
            searchButton.addEventListener(METHOD.BUTTON, this.clickHandler[0]);

            const createButton = document
                .querySelector(`.create__two-block__button__${this.whatSearch}`);

            if (!createButton) return;
            createButton.addEventListener(METHOD.BUTTON, this.clickHandler[1]);
        });
    }
}
