import Dispatcher from '../dispatcher/Dispatcher.js';
import ActionTypes from './ActionTypes.js';

/**
 * Global Action creator object.
 */
const Actions = {
    /** Action to emit two functions for ComponentsStore: what render on page and what
     *  to unrender by pageName */
    whatRender(name) {
        Dispatcher.dispatch({
            type: ActionTypes.CHECK_WHAT_RENDER,
            name,
        });
    },

    /** Action to add a component in ComponentsStore state */
    addElementOnPage(name) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_COMPONENT_ON_PAGE,
            name,
        });
    },

    /** Action to remove a component from ComponentsStore state */
    removeElementFromPage(name) {
        Dispatcher.dispatch({
            type: ActionTypes.REMOVE_COMPONENT_FROM_PAGE,
            name,
        });
    },

    /** Action to validate a named field in login or registration form and add it in state */
    validationField(nameOfField, content) {
        Dispatcher.dispatch({
            type: ActionTypes.VALIDATION_FIELD,
            nameOfField,
            content,
        });
    },

    /** Validate password and confirm password */
    validatePasswordAndConf(nameOfField, password, confPassword) {
        Dispatcher.dispatch({
            type: ActionTypes.VALIDATION_FIELD,
            nameOfField,
            content: {
                password,
                confPassword,
            },
        });
    },

    /** Action to validate all login or registration form fields */
    validateAll(nameOfValidation, content) {
        const nameOfField = nameOfValidation;
        Dispatcher.dispatch({
            type: ActionTypes.VALIDATION_CHECK_CORRECT_ALL,
            nameOfField,
            content,
        });
    },

    /** Action to add items got from feed api in ContentStore */
    feedAddContent(items) {
        Dispatcher.dispatch({
            type: ActionTypes.FEED_GOT_CONTENT,
            items,
        });
    },

    /** Action to add items got from artist api in ContentStore */
    artistAddContent(item, instance) {
        Dispatcher.dispatch({
            type: ActionTypes.ARTIST_GOT_ALL_CONTENT,
            item,
            instance,
        });
    },

    /** Action to add items got from user api in ContentStore */
    userAddContent(userData) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_USER_INFO,
            userData,
        });
    },

    /** Router changes item in Store state */
    sendStoreState(item) {
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_STORE,
            item,
        });
    },

    /** Router changes item in Store state */
    sendId(id, nameOfPage) {
        Dispatcher.dispatch({
            type: ActionTypes.ID_PROVIDED,
            id,
            nameOfPage,
        });
    },

    /** Check if ID for page was placed in Store state */
    checkID(nameOfPage) {
        Dispatcher.dispatch({
            type: ActionTypes.ID_VIEW_REQUEST,
            nameOfPage,
        });
    },

    /** Send action to SongStore and search for needed track */
    searchForTrack(status, whatTrack) {
        Dispatcher.dispatch({
            type: ActionTypes.DOWNLOAD_DIRECTIONAL_TRACK,
            status,
            whatTrack,
        });
    },

    /** Change volume in Store */
    volumeChange(volume) {
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_VOLUME,
            volume,
        });
    },

    /** Add new line to exit one */
    loadMoreLine(requestJSON) {
        Dispatcher.dispatch({
            type: ActionTypes.UPLOAD_TAPE,
            requestJSON,
        });
    },

    /** Play track send in SongStore id to play now */
    playTrack(id) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_TRACK,
            id,
        });
    },

    /** Play album send in SongStore album id to play now */
    playAlbum(id) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_ALBUM,
            id,
        });
    },

    /** Play artist send in SongStore artist id to play now his tracks (compilation) */
    playArtist(id) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_ARTIST,
            id,
        });
    },

    /** Play artist send in SongStore artist id to play now from track (compilation) */
    playArtistWithOffset(id, offset) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_ARTIST,
            id,
            offset,
        });
    },

    /** Play album send in SongStore album id to play now from track (compilation) */
    playAlbumWithOffset(id, offset) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_ALBUM,
            id,
            offset,
        });
    },

    /** Play playlist send in SongStore id to play now from track */
    playPlaylistWithOffset(id, offset = 0) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAY_PLAYLIST,
            playlistId: id,
            offset,
        });
    },

    /** Queue track send in SongStore track id to play now from track (compilation) */
    queueTrackWithOffset(id, offset) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_TRACK,
            id,
            offset,
        });
    },

    /** Queue track send in SongStore id to put in queue */
    queueTrack(id) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_TRACK,
            id,
        });
    },

    /** Queue album send in SongStore album id to put in queue */
    queueAlbum(id) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_ALBUM,
            id,
        });
    },

    /** Queue artist send in SongStore artist id to put in queue */
    queueArtist(id) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_ARTIST,
            id,
        });
    },

    /** Download one track song */
    downloadTrack(id) {
        Dispatcher.dispatch({
            type: ActionTypes.DOWNLOAD_TRACK,
            id,
        });
    },

    /** Set repeat state */
    createRepeat(state) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_REPEAT,
            state,
        });
    },

    /** Set play state */
    changePlayState(state) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_STATE,
            state,
        });
    },

    /** Set time to track in Store */
    setTimeToTrack(time) {
        Dispatcher.dispatch({
            type: ActionTypes.TIME_OF_PLAY,
            time,
        });
    },

    /** When player dying notify store */
    playerDelete() {
        Dispatcher.dispatch({
            type: ActionTypes.CLEAR_ALL,
        });
    },

    /** Get data after restart */
    getDataAfterRestart() {
        Dispatcher.dispatch({
            type: ActionTypes.FIRST_START_AFTER_RESTART,
        });
    },

    /**
     * Add album JSON to content
     */
    addAlbumToContent(items) {
        Dispatcher.dispatch({
            type: ActionTypes.ALBUM_TO_CONTENT,
            items,
        });
    },

    /** addOneAlbumToContent */
    addOneAlbum(item) {
        Dispatcher.dispatch({
            type: ActionTypes.ONE_ALBUM_TO_CONTENT,
            item,
        });
    },

    /** Function to send favorite data in ContentStore from API */
    addFavoriteContent(items, instance) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_FAVORITE_CONTENT,
            items,
            instance,
        });
    },

    /** Function to send data about playlists in ContentStore from API */
    addPlaylistContent(items, instance) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_PLAYLIST_CONTENT,
            items,
            instance,
        });
    },

    /** Queue Tracks */
    addQueueTracks(trackId, offset) {
        Dispatcher.dispatch({
            type: ActionTypes.QUEUE_TRACK,
            idOfTracks: trackId,
            offset,
        });
    },

    /** set offset */
    setOffset(offset) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_OFFSET,
            offset,
        });
    },
};

export default Actions;
