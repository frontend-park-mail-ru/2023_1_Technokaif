import ActionTypes from '../actions/ActionTypes';
import IStore from './IStore';
import { EventTypes } from '../utils/config/EventTypes';
import { pageNames } from '../utils/config/pageNames';

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
        case ActionTypes.ID_PROVIDED:
            this.#addCurrentIdOnPageContent(action.id, action.nameOfPage);
            break;
        case ActionTypes.FEED_GOT_CONTENT:
            this.#addContentOnFeed(action.items);
            break;
        case ActionTypes.FEED_ALL_CONTENT_RECEIVED:
            this.jsEmit(EventTypes.CHANGE_CONTENT);
            break;
        case ActionTypes.ARTIST_GOT_ALL_CONTENT:
            this.#addContentOnArtistPage(action.artist);
            break;
        default:
        }
    }

    /**
     * Function to add id on state of page and emit that request by id can be managed
     * @param id
     * @param nameOfPage
     */
    #addCurrentIdOnPageContent(id, nameOfPage) {
        this.#addContent(nameOfPage, 'id', id);
        this.jsEmit(EventTypes.ID_GOT);
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
     * Add artist on Artist page
     * @param artist
     */
    #addContentOnArtistPage(artist) {
        this.#addContent(pageNames.ARTIST_PAGE, 'artist', artist);
        this.jsEmit(EventTypes.ARTIST_CONTENT_DONE);
    }

    /**
     * Add content to store
     * @param {string} page - page where it required
     * @param {string} nameOfContent - name of content like artists, tracks
     * @param {JSON} content - json of content
     */
    #addContent(page, nameOfContent, content) {
        if (super.state[page] === undefined) {
            super.state[page] = {};
        }

        super.state[page][nameOfContent] = content;
    }
}

export default new ContentStore();
