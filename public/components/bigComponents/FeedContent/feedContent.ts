import { Tape } from '@bigComponents/Tape/tape';
import templateHtml from './feedContent.handlebars';

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

/**
 * Create FeedContent content with tapes
 */
export class FeedContent extends BaseComponent {
    /**
     * Config to use in tapes
     */
    #configs;

    /**
     * Create MainWindowContent component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place MainWindowContent
     * @param config
     */
    constructor(parent, config) {
        super(parent, config, templateHtml, componentsNames.FEED_CONTENT);
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
    }

    /**
     * Function to subscribe to all events from Stores
     */
    #addSubscribes() {
        ContentStore.subscribe(
            () => {
                const state = ContentStore.state[pageNames.FEED];
                for (const key in state) {
                    this.#configs.push(setupTape(key, key, shuffleArray(state[key]).slice(0, 5)));
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
        ApiActions.feed();
        document.title = 'Fluire';
    }
}