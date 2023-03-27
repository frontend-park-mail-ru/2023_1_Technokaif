import ActionTypes from '../actions/ActionTypes';

// TODO rename file to content
/**
 * Stores Content of pages like artists, tracks.
 */
class Content extends IStore {
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
     * @param {string} nameOfContent - name of content
     * @param {JSON} content - content
     */
    #addContentOnFeed(items) {
        for (const nameOfContent in items) {
            this.#addContentOnFeed(nameOfContent, items[nameOfContent]);
        }

        this.#addContent('feed', nameOfContent, content);
    }

    /**
     * Add content to store
     * @param {string} page - page where it required
     * @param {string} nameOfContent - name of content like artists, tracks
     * @param {JSON} content - json of content
     */
    #addContent(page, nameOfContent, content) {
        super.state[page][nameOfContent].push(content);
        this.jsEmit('CHANGE_CONTENT', nameOfContent);
    }
}

export default new Content();
