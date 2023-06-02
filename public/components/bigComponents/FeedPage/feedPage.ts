import { componentsNames } from '@config/componentsNames';
import ApiActions from '@actions/Api/ApiActions';
import { BaseComponent } from '@components/BaseComponent';
import { FeedContent } from '@bigComponents/FeedContent/feedContent';
import templateHtml from './feedPage.handlebars';
import './feedPage.less';

/**
 * Create FeedContent content with tapes
 */
export class FeedPage extends BaseComponent {
    /**
     * Create MainWindowContent component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place MainWindowContent
     * @param config
     */
    constructor(parent, config) {
        super(parent, config, templateHtml, componentsNames.FEED);
    }

    /**
     * Function to subscribe to all events from Stores
     */
    #addSubscribes() {
        const selectElement: HTMLSelectElement|null = this.parent.querySelector('#chart-duration');

        const contentBlock: HTMLElement| null = document.querySelector('.feed-content__placement');
        if (!contentBlock || !selectElement) {
            console.error('No nothing element on search');
            return;
        }

        new FeedContent(contentBlock, {}, true).render();
        ApiActions.feedCharts(7);

        selectElement.addEventListener('change', (event) => {
            // @ts-ignore
            const selectedOption = event.target?.value;
            let content: HTMLElement| null = document.querySelector('.feed-content__placement');
            if (!content) {
                return;
            }
            switch (selectedOption) {
            case 'week':
                this.unrenderContent();
                content = document.querySelector('.feed-content__placement');
                new FeedContent(content, {}, true).render();
                ApiActions.feedCharts(7);
                break;
            case 'month':
                this.unrenderContent();
                content = document.querySelector('.feed-content__placement');
                new FeedContent(content, {}, true).render();
                ApiActions.feedCharts(31);
                break;
            case 'year':
                this.unrenderContent();
                content = document.querySelector('.feed-content__placement');
                new FeedContent(content, {}, true).render();
                ApiActions.feedCharts(365);
                break;
            default:
            }
        });
    }

    /**
     * Method to unrender content block
     * @private
     */
    private unrenderContent() {
        const contentBlock: HTMLElement| null = document.querySelector('.feed-content__placement');
        if (!contentBlock) {
            console.error('No nothing element on search');
            return;
        }

        contentBlock.innerHTML = '';
    }

    /**
     * @description render MainWindowContent in parent
     */
    override render() {
        super.appendElement();
        this.#addSubscribes();
        document.title = 'Fluire';
    }
}
