import { Tape } from '@bigComponents/Tape/tape';
import './feedContent.less';

import { pageNames } from '@config/pageNames';
import { EventTypes } from '@config/EventTypes';
import { componentsNames } from '@config/componentsNames';
import { setupTape } from '@setup/artistSetup';
import { shuffleArray } from '@functions/shuffleArray';
import { componentsJSNames } from '@config/componentsJSNames';
import ApiActions from '@actions/Api/ApiActions';
import { BaseComponent } from '@components/BaseComponent';
import ContentStore from '@store/ContentStore';
import templateHtml from './feedContent.handlebars';

/**
 * Create FeedContent content with tapes
 */
export class FeedContent extends BaseComponent {
    /**
     * Config to use in tapes
     */
    #configs;

    /** Flag of charts page element */
    private isCharts: boolean;

    /**
     * Create MainWindowContent component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place MainWindowContent
     * @param config
     * @param isCharts
     */
    constructor(parent, config, isCharts = false) {
        super(parent, config, templateHtml, componentsNames.FEED_CONTENT);
        this.isCharts = isCharts;
        this.#configs = [];
    }

    /**
     * Function to render tapes for artists albums tracks
     */
    #renderTapes() {
        this.#configs.sort((a, b) => a.titleText.localeCompare(b.titleText));
        const parent: HTMLElement|null = document.querySelector(`.${componentsJSNames.FEED_CONTENT}`);
        if (!parent) {
            console.error('Error in tapes render finding parent element on feed');
            return;
        }

        this.#configs.forEach((configForInsertElement) => {
            const tape = new Tape(
                parent,
                configForInsertElement,
                configForInsertElement.titleText,
            );
            tape.appendElement();
        });

        ContentStore.clearStateOnPage(pageNames.FEED);
    }

    /**
     * Function to subscribe to all events from Stores
     */
    #addSubscribes() {
        ContentStore.subscribe(
            () => {
                const feedElement: HTMLDivElement|null = this.parent.querySelector(`.${componentsJSNames.FEED_CONTENT}`);

                if (!feedElement) {
                    return;
                }

                if (feedElement.children.length) {
                    return;
                }
                const state = ContentStore.state[pageNames.FEED];
                this.#configs = [];
                for (const key in state) {
                    if (this.isCharts) {
                        state[key].forEach((track, index, tracks) => {
                            tracks[index].name = `${index + 1} ${track.name}`;
                        });
                    }
                    if (key === 'Tracks') {
                        if (!this.isCharts) {
                            this.#configs.push(setupTape(key, key, shuffleArray(state[key])));
                        } else {
                            this.#configs.push(setupTape(key, key, state[key]));
                        }
                    } else {
                        this.#configs.push(setupTape(key, key, state[key]));
                    }
                }

                this.#renderTapes();
            },
            EventTypes.FEED_CONTENT_DONE,
            this.name,
        );
    }

    /**
     * @description render MainWindowContent in parent
     */
    override render() {
        super.appendElement();
        this.#addSubscribes();
        if (!this.isCharts) {
            ApiActions.feed();
        }
    }
}
