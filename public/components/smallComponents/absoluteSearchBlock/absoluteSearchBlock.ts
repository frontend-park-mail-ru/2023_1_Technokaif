import { BaseComponent } from '@components/BaseComponent';
import { runAfterFramePaint } from '@functions/renderAfterPaintDone';
import { SearchBlock } from '@smallComponents/searchBlock/searchBlock';
import template from './absoluteSearchBlock.handlebars';
import './absoluteSearchBlock.less';

/** Search block for empty page */
export class AbsoluteSearchBlock extends BaseComponent {
    /** Params for default searchBlock */
    private readonly searchBlockParams;

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
                whatSearch: nameToAdd,
            },
            template,
        );

        this.searchBlockParams = {
            nameToAdd,
            onClickHandler,
            mainClass,
        };
    }

    /** Append element to parent */
    override appendElement() {
        super.appendElement();

        runAfterFramePaint(() => {
            const placement = document
                .querySelector(`.${this.searchBlockParams.nameToAdd}__absolute-block`);

            if (!placement) return;
            new SearchBlock(
                placement,
                this.searchBlockParams.nameToAdd,
                this.searchBlockParams.onClickHandler,
                this.searchBlockParams.mainClass,
            ).appendElement();
        });
    }
}
