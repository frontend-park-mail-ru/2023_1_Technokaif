import { Tape } from '../Tape/tape';
import templateHtml from './feedContent.handlebars';

import './feedContent.less';
import ContentStore from '../../stores/ContentStore';
import { pageNames } from '../../utils/config/pageNames';
import { homeSetup } from '../../utils/setup/homeSetup';
import { EventTypes } from '../../utils/config/EventTypes';
import { BaseComponent } from '../BaseComponent';
import { componentsNames } from '../../utils/config/componentsNames';
import Actions from '../../actions/Actions';
import ApiActions from '../../actions/ApiActions';
import API from '../../stores/API';
import ComponentsStore from '../../stores/ComponentsStore';
import unsubscribeFromAllStoresOnComponent from '../../utils/functions/unsubscribeFromAllStores';
import { componentsJSNames } from '../../utils/config/componentsJSNames';

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
            const tape = new Tape(this.element, configForInsertElement);
            tape.appendElement();
        });
    }

    /**
     * Function to subscribe to all events from Stores
     */
    #addSubscribes() {
        ComponentsStore.subscribe(
            (list) => {
                const component = list.filter((comp) => comp.name === this.name);
                if (component.length !== 0) {
                    Actions.removeElementFromPage(component.name);
                    unsubscribeFromAllStoresOnComponent(this.name);
                    this.unRender();
                }
            },
            EventTypes.ON_REMOVE_ANOTHER_ITEMS,
        );
        API.subscribe(
            () => {
                Actions.feedAllDataReceived();
            },
            EventTypes.FEED_CONTENT_DONE,
            this.name,
        );
        ContentStore.subscribe(() => {
            const state = ContentStore.state[pageNames.FEED];
            for (const key in state) {
                this.#configs.push(homeSetup(key, state[key]));
            }

            this.#renderTapes();
        }, EventTypes.CHANGE_CONTENT);
    }

    /**
     * @description render MainWindowContent in parent
     */
    render() {
        super.appendElement();
        this.#addSubscribes();

        ApiActions.feed();
        Actions.addElementOnPage(this.name);
    }
}