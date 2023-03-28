import ActionTypes from '../actions/ActionTypes';
import IStore from './IStore';
import { EventTypes } from './EventTypes';

// TODO rename file to content
/**
 * Stores Content of pages like artists, tracks.
 */
class ContentStore extends IStore {
    /**
     * Create state
     * @example
     * {
     *  feed: {
     *    artists: [
     *      {
     *        title: ...,
     *        imgSrc: ...,
     *        ...
     *      };
     *    ];
     *  };
     * }
     */
    constructor() {
        super('Content');
        super.state = {};
    }

    /**
     * dispatch actions on enter
     * @param {*} action - action
     */
    dispatch(action) {
        super.dispatch();
        switch (action.type) {
        case ActionTypes.FEED_GOT_CONTENT:
            this.#addContentOnFeed(action.items);
            break;
        default:
        }
    }

    /**
     * Add content on feed
     * @param items
     */
    #addContentOnFeed(items) {
        for (const nameOfContent in items) {
            this.#addContent(pageNames.FEED, nameOfContent, items[nameOfContent]);
        }
    }

    /**
     * Add content to store
     * @param {string} page - page where it required
     * @param {string} nameOfContent - name of content like artists, tracks
     * @param {JSON} content - json of content
     */
    #addContent(page, nameOfContent, content) {
        super.state[page][nameOfContent].push(content);
        this.jsEmit(EventTypes.CHANGE_CONTENT, nameOfContent);
    }
}

export default new ContentStore();
