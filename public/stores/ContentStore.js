import ActionTypes from '../actions/ActionTypes';
import IStore from './IStore';
import { EventTypes } from '../utils/config/EventTypes';
import { pageNames } from '../utils/config/pageNames';
import { instancesNames } from '../utils/config/instances';

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
        case ActionTypes.ID_VIEW_REQUEST:
            this.#checkID(action.nameOfPage);
            break;
        case ActionTypes.FEED_GOT_CONTENT:
            this.#addContentOnFeed(action.items);
            break;
        case ActionTypes.ARTIST_GOT_ALL_CONTENT:
            this.#addContentOnArtistPage(action.item, action.instance);
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
        switch (nameOfPage) {
        case instancesNames.ARTIST_PAGE:
            this.#addContent(pageNames.ARTIST_PAGE, 'id', id);
            break;
        default:
        }

        this.jsEmit(EventTypes.ID_GOT);
    }

    /**
     * Function to check if we have id for page
     * @param nameOfPage
     */
    #checkID(nameOfPage) {
        if (this.state[nameOfPage].id !== undefined) {
            this.jsEmit(EventTypes.ID_CAN_BE_VIEWED);
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

        if (Object.keys(this.state[pageNames.FEED]).length === 3) {
            console.log(this.state);
            this.jsEmit(EventTypes.FEED_CONTENT_DONE);
        }
    }

    /**
     * Add item(s) on Artist page
     *
     * Artist object OR array of artist tracks OR array of artist albums
     * @param item
     * @param instance
     */
    #addContentOnArtistPage(item, instance) {
        this.#addContent(pageNames.ARTIST_PAGE, instance, item);

        this.jsEmit(EventTypes.ARTIST_CONTENT_DONE, instance);
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
