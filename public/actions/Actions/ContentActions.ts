import ActionTypes from '@actions/ActionTypes';
import Dispatcher from '@dispatcher/Dispatcher';

/** Work with content of pages */
class ContentActions {
    /** Action to add items got from feed api in ContentStore */
    feedAddContent(items) {
        Dispatcher.dispatch({
            type: ActionTypes.FEED_GOT_CONTENT,
            items,
        });
    }

    /** Action to add items got from artist api in ContentStore */
    artistAddContent(item, instance) {
        Dispatcher.dispatch({
            type: ActionTypes.ARTIST_GOT_ALL_CONTENT,
            item,
            instance,
        });
    }

    /** Action to add items got from user api in ContentStore */
    userAddContent(userData) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_USER_INFO,
            userData,
        });
    }

    /** Add new line to exit one */
    loadMoreLine(requestJSON) {
        Dispatcher.dispatch({
            type: ActionTypes.UPLOAD_TAPE,
            tracks: requestJSON,
        });
    }

    /**
     * Add album JSON to content
     */
    addAlbumToContent(items) {
        Dispatcher.dispatch({
            type: ActionTypes.ALBUM_TO_CONTENT,
            items,
        });
    }

    /** addOneAlbumToContent */
    addOneAlbum(item) {
        Dispatcher.dispatch({
            type: ActionTypes.ONE_ALBUM_TO_CONTENT,
            item,
        });
    }

    /** Function to send favorite data in ContentStore from API */
    addFavoriteContent(items, instance) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_FAVORITE_CONTENT,
            items,
            instance,
        });
    }

    /** Function to send data about playlists in ContentStore from API */
    addPlaylistContent(items, instance) {
        Dispatcher.dispatch({
            type: ActionTypes.ADD_PLAYLIST_CONTENT,
            items,
            instance,
        });
    }

    /** Download one track song */
    downloadTrack(id) {
        Dispatcher.dispatch({
            type: ActionTypes.DOWNLOAD_TRACK,
            id,
        });
    }
}

export default new ContentActions();
