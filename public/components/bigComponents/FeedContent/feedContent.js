import { Tape } from '../Tape/tape';
import templateHtml from './feedContent.handlebars';

import './feedContent.less';
import ContentStore from '../../../stores/ContentStore';
import { pageNames } from '../../../utils/config/pageNames';
import { EventTypes } from '../../../utils/config/EventTypes';
import { BaseComponent } from '../../BaseComponent';
import { componentsNames } from '../../../utils/config/componentsNames';
import ApiActions from '../../../actions/ApiActions';
import { setupTape } from '../../../utils/setup/artistSetup';

/**
 * Create FeedContent content with tapes
 */
export class FeedContent extends BaseComponent {
    /**
     * Parent where to render
     */
    #parent;

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
        this.#parent = parent;
        this.#configs = [];
    }

    /**
     * Function to render tapes for artists albums tracks
     */
    #renderTapes() {
        this.#configs.forEach((configForInsertElement) => {
            const tape = new Tape(
                this.element,
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
                    this.#configs.push(setupTape(key, state[key]));
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
    render() {
        const renderProcess = new Promise((resolve) => {
            super.appendElement();
            resolve();
        });

        renderProcess.then(() => {
            this.#addSubscribes();
            ApiActions.feed();
        });
    }
}
