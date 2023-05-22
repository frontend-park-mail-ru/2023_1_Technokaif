import { EventTypes } from '@config/EventTypes';
import { pageNames } from '@config/pageNames';
import { componentsNames } from '@config/componentsNames';
import { componentsJSNames } from '@config/componentsJSNames';
import ComponentsStore from '@store/ComponentsStore';
import ComponentsActions from '@Actions/ComponentsActions';
import unsubscribeFromAllStoresOnComponent from '@functions/unsubscribeFromAllStores';
import ContentStore from '@store/ContentStore';
import API from '@store/API';
import Router from '@router/Router';

const componentsListWhereMainWas = [componentsNames.FEED_CONTENT,
    componentsNames.SEARCH_CONTENT,
    componentsNames.USER,
    componentsNames.ALBUM,
    componentsNames.ARTIST_CONTENT,
    componentsNames.TRACK,
    componentsNames.PLAYLIST,
    componentsNames.LIBRARY,
    componentsNames.LIBRARY_ALBUMS,
    componentsNames.LIBRARY_ARTISTS,
    componentsNames.LIBRARY_PLAYLISTS,
    componentsNames.LIBRARY_TRACKS,
];

const componentsListProhibitedAfterLogout = [
    componentsNames.USER,
    componentsNames.PLAYLIST,
    componentsNames.LIBRARY,
    componentsNames.LIBRARY_ALBUMS,
    componentsNames.LIBRARY_ARTISTS,
    componentsNames.LIBRARY_PLAYLISTS,
    componentsNames.LIBRARY_TRACKS,
];

/**
 * Base Component class to handle render functions.
 */
export abstract class BaseComponent {
    /**
     * Parent where to render
     */
    #parent;

    /**
     * Name of component
     */
    #name;

    /**
     * Config to put in template
     */
    #config;

    /**
     * Template to create
     */
    #template;

    /**
     * Create BaseModel. Empty innerHtml before placement
     * @param {HTMLElement} parent - where to place MainWindowContent
     * @param name - name of current component
     * @param {Object} config - what config use to compile template
     * @param {function} template - template to create elements
     */
    constructor(parent, config, template, name = 'elementary component') {
        this.#parent = parent;
        if (!this.#parent) {
            console.warn('Parent doesn\'t exist in ', name);
        }
        this.#name = name;
        this.#config = config;
        this.#template = template;
    }

    /**
     * Component Name getter
     * @returns {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * Setter of config
     * @param config
     */
    set config(config) {
        this.#config = config;
    }

    /**
     * Setter of config
     */
    get config() {
        return this.#config;
    }

    /**
     * Subscribe there on all general events
     */
    #subscribeAll() {
        ComponentsStore.subscribe(
            (list) => {
                const component = list.find((comp) => comp.name === this.#name);
                if (component) {
                    ComponentsActions.removeElementFromPage(this.#name);
                    unsubscribeFromAllStoresOnComponent(this.#name);
                    ContentStore.state[this.#name] = {};
                    // todo костыль
                    ContentStore.state[pageNames.FEED] = {};
                    this.unRender();

                    // todo change to config
                    const nameComp = this.#name;
                    if (componentsListWhereMainWas.includes(nameComp)) {
                        // eslint-disable-next-line max-len
                        const mainComponent = list.find((comp) => comp.name === componentsNames.MAIN);
                        if (mainComponent) {
                            ComponentsActions.removeElementFromPage(componentsNames.MAIN);
                            unsubscribeFromAllStoresOnComponent(componentsNames.MAIN);
                            const parent = ComponentsStore.checkWhereToPlace(componentsNames.MAIN);
                            const child = document.querySelector(`.${componentsJSNames.MAIN}`);
                            if (!child || !parent) {
                                return;
                            }

                            parent.removeChild(child);
                        }
                    }
                }
            },
            EventTypes.ON_REMOVE_ANOTHER_ITEMS,
            this.#name,
        );

        API.subscribe(
            (message) => {
                if (message === 'OK' && componentsListProhibitedAfterLogout.includes(this.name)) {
                    Router.goToFeed();
                }
            },
            EventTypes.LOGOUT_STATUS,
            componentsNames.PLAYER,
        );
    }

    /**
     * Render element in parent. Clear parent before.
     */
    render() {
        this.#subscribeAll();
        this.#parent.innerHTML = this.#template(this.#config);
    }

    /** Append element to parent without clearing it */
    appendElement() {
        this.#subscribeAll();
        if (!this.#config) {
            return;
        }
        const tempElement = document.createElement('div');

        tempElement.innerHTML = this.#template(this.#config);

        const newElement = tempElement.firstChild;
        if (!newElement) {
            console.error('Element to append doesn\'t exist', this.#name);
            return;
        }
        this.#parent.appendChild(newElement);
    }

    /**
     * UnRender component
     */
    unRender() {
        const element = document.getElementsByClassName(`${this.name}`)[0];
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }

    /** Set template to newTemplate */
    set template(newTemplate) {
        this.#template = newTemplate;
    }

    /**
     * HTML template filler
     * @returns {string} - element in string
     */
    HTML() {
        return this.#template(this.#config);
    }
}
