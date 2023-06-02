import ActionTypes from '@actions/ActionTypes';
import IStore from '@store/IStore';
import { EventTypes } from '@config/EventTypes';
import { pageNames } from '@config/pageNames';
import { instancesNames } from '@config/instances';
import { PlaylistContent } from '@api/playlists/createPlaylistAjaxRequest';

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
    override dispatch(action) {
        super.dispatch(action);
        switch (action.type) {
        case ActionTypes.ID_PROVIDED:
            this.addCurrentIdOnPageContent(action.id, action.nameOfPage);
            break;
        case ActionTypes.ID_VIEW_REQUEST:
            this.checkID(action.nameOfPage);
            break;
        case ActionTypes.ADD_FAVORITE_CONTENT:
            this.addContentOnFavoritePages(action.items, action.instance);
            break;
        case ActionTypes.ADD_FAVORITE_CONTENT_NO_TRACKS:
            this.addContentOnFavoritePages(action.items, action.instance, true);
            break;
        case ActionTypes.ADD_PLAYLIST_CONTENT:
            this.addContentOnPlaylistPage(action.items, action.instance);
            break;
        case ActionTypes.UPDATE_PLAYLIST_CONTENT:
            this.updatePlaylistData(action.items);
            break;
        case ActionTypes.FEED_GOT_CONTENT:
            this.addContentOnFeed(action.items);
            break;
        case ActionTypes.ARTIST_GOT_ALL_CONTENT:
            this.addContentOnArtistPage(action.item, action.instance);
            break;
        case ActionTypes.ALBUM_TO_CONTENT:
            this.addContentOnAlbumPage(action.items);
            break;
        case ActionTypes.ONE_ALBUM_TO_CONTENT:
            this.addToState('ALBUM', action.item);
            this.jsEmit(EventTypes.GOT_ONE_ALBUM);
            break;
        case ActionTypes.GOT_ALBUMS_SEARCH:
            this.addAlbumsToSearchPage(action.items);
            break;
        case ActionTypes.GOT_TRACKS_SEARCH:
            this.addTracksToSearchPage(action.items);
            break;
        case ActionTypes.GOT_ARTISTS_SEARCH:
            this.addArtistsToSearchPage(action.items);
            break;
        case ActionTypes.GOT_PLAYLIST_SEARCH:
            this.addPlaylistsToSearchPage(action.items);
            break;
        case ActionTypes.EMPTY_SEARCH:
            this.jsEmit(EventTypes.EMPTY_SEARCH);
            break;
        case ActionTypes.GOT_TRACK:
            this.addTrack(action.item);
            break;
        default:
        }
    }

    /**
     * Set name in state to value
     * @param name
     * @param value
     */
    private addToState(name, value) {
        super.state[name] = value;
    }

    /**
     * Function to add id on state of page and emit that request by id can be managed
     * @param id
     * @param nameOfPage
     */
    private addCurrentIdOnPageContent(id, nameOfPage) {
        switch (nameOfPage) {
        case instancesNames.ARTIST_PAGE:
            this.addContent(pageNames.ARTIST_PAGE, 'id', id);
            break;
        case instancesNames.ALBUM_PAGE:
            this.addContent(pageNames.ALBUM, 'id', id);
            break;
        case instancesNames.PLAYLIST_PAGE:
            this.addContent(pageNames.PLAYLIST, 'id', id);
            break;
        case instancesNames.TRACK_PAGE:
            this.addContent(pageNames.TRACK, 'id', id);
            break;
        default:
        }

        this.jsEmit(EventTypes.ID_GOT);
    }

    /**
     * Function to check if we have id for page
     * @param nameOfPage
     */
    private checkID(nameOfPage) {
        if (!super.state) {
            console.warn('STATE NOT EXIST in checkID', nameOfPage);
        }

        if (super.state[nameOfPage].id !== undefined) {
            this.jsEmit(EventTypes.ID_CAN_BE_VIEWED);
        }
    }

    /**
     * Add content on feed
     * @param items
     */
    private addContentOnFeed(items) {
        for (const nameOfContent in items) {
            this.addContent(pageNames.FEED, nameOfContent, items[nameOfContent]);
        }

        if (Object.keys(super.state[pageNames.FEED]).length === 3) {
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
    private addContentOnArtistPage(item, instance) {
        this.addContent(pageNames.ARTIST_PAGE, instance, item);

        this.jsEmit(EventTypes.ARTIST_CONTENT_DONE, instance);
    }

    /**
     * Add item(s) on favorite pages
     */
    private addContentOnFavoritePages(items, instance, isNoTrack?:boolean) {
        switch (instance) {
        case instancesNames.FAVORITE_TRACKS_PAGE:
            this.addContent(pageNames.LIBRARY_TRACKS, instance, items);
            this.jsEmit(EventTypes.GOT_FAVORITE_TRACKS, instance);
            break;
        case instancesNames.FAVORITE_ARTISTS_PAGE:
            this.addContent(pageNames.LIBRARY_ARTISTS, instance, items);
            this.jsEmit(EventTypes.GOT_FAVORITE_ARTISTS, instance);
            break;
        case instancesNames.FAVORITE_ALBUMS_PAGE:
            this.addContent(pageNames.LIBRARY_ALBUMS, instance, items);
            this.jsEmit(EventTypes.GOT_FAVORITE_ALBUMS, instance);
            break;
        case instancesNames.USER_PLAYLISTS_PAGE:
            this.addContent(pageNames.LIBRARY_PLAYLISTS, instance, items);
            if (isNoTrack) {
                this.jsEmit(EventTypes.GOT_USER_PLAYLISTS_NO_TRACKS, instance);
            } else {
                this.jsEmit(EventTypes.GOT_USER_PLAYLISTS, instance);
            }
            break;
        case instancesNames.FAVORITE_PLAYLISTS_PAGE:
            this.addContent(pageNames.LIBRARY_PLAYLISTS, instance, items);
            this.jsEmit(EventTypes.GOT_FAVORITE_PLAYLISTS, instance);
            break;
        case instancesNames.LIKED_SONGS:
            this.addContent(pageNames.ARTIST_PAGE, instance, items);
            this.jsEmit(EventTypes.GOT_FAVORITE_TRACKS, instance);
            break;
        default:
        }
    }

    /**
     * Add item(s) on playlist page
     * @param items
     * @param instance
     */
    private addContentOnPlaylistPage(items, instance) {
        switch (instance) {
        case instancesNames.PLAYLIST_PAGE:
            this.addContent(pageNames.PLAYLIST, instance, items);
            this.jsEmit(EventTypes.GOT_PLAYLIST, instance);
            break;
        case instancesNames.PLAYLIST_TRACKS_PAGE:
            this.addContent(pageNames.PLAYLIST, instance, items);
            this.jsEmit(EventTypes.GOT_PLAYLIST_TRACKS, instance);
            break;
        default:
        }
    }

    /**
     * Update playlist info
     * @param items
     * @private
     */
    private updatePlaylistData(items: PlaylistContent) {
        const { playlist } = this.state[pageNames.PLAYLIST];
        playlist.name = items.name;
        playlist.description = items.description;
        this.addContent(pageNames.PLAYLIST, instancesNames.PLAYLIST_PAGE, playlist);
    }

    /**
     * Add content to store
     * @param {string} page - page where it required
     * @param {string} nameOfContent - name of content like artists, tracks
     * @param {JSON} content - json of content
     */
    private addContent(page, nameOfContent, content) {
        if (super.state[page] === undefined) {
            super.state[page] = {};
        }
        super.state[page][nameOfContent] = content;
    }

    /** Add tracks to Album state */
    private addContentOnAlbumPage(items) {
        this.addContent(pageNames.ALBUM, 'tracks', items);
        this.jsEmit(EventTypes.ALBUM_CONTENT_DONE, 'tracks');
    }

    /** Add tracks to search */
    private addTracksToSearchPage(items) {
        this.addContent(pageNames.SEARCH, 'tracks', items);
        this.jsEmit(EventTypes.SEARCH_TRACKS_ADDED, 'tracks');
    }

    /** Add albums to search */
    private addAlbumsToSearchPage(items) {
        this.addContent(pageNames.SEARCH, 'albums', items);
        this.jsEmit(EventTypes.SEARCH_ALBUMS_ADDED, 'albums');
    }

    /** Add artists to search */
    private addArtistsToSearchPage(items) {
        this.addContent(pageNames.SEARCH, 'artists', items);
        this.jsEmit(EventTypes.SEARCH_ARTISTS_ADDED, 'artists');
    }

    /** Playlists add to search */
    private addPlaylistsToSearchPage(items) {
        this.addContent(pageNames.SEARCH, 'playlists', items);
        this.jsEmit(EventTypes.SEARCH_PLAYLIST_ADDED, 'playlists');
    }

    /** Track content */
    private addTrack(item) {
        this.addContent(pageNames.TRACK, 'track', item);
        this.jsEmit(EventTypes.GOT_TRACK, 'track');
    }
}

export default new ContentStore();
