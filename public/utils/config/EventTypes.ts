/** Events emitted by stores */
export const EventTypes = {
    /** BASE VIEW usage events */
    ON_NOT_RENDERED_ITEMS: 'ON_NOT_RENDERED_ITEMS',
    ON_REMOVE_ANOTHER_ITEMS: 'ON_REMOVE_ANOTHER_ITEMS',

    /** FEED VIEW usage events */
    CHANGE_CONTENT: 'CHANGE_CONTENT',
    FEED_CONTENT_DONE: 'FEED_CONTENT_DONE',
    ARTIST_CONTENT_DONE: 'ARTIST_CONTENT_DONE',
    ALBUM_CONTENT_DONE: 'ALBUM_CONTENT_DONE',

    /** Login and Register forms events */
    VALIDATION_RESPONSE: 'VALIDATION_RESPONSE',

    /** Events emitting after login or registration full validation
     * Subscribed function would probably be api request */
    SEND_DATA: 'SEND_DATA',
    SEND_DATA_WITH_PASSWORD: 'SEND_DATA_WITH_PASSWORD',

    UPDATE_DATA_RECEIVED: 'UPDATE_DATA_RECEIVED',
    UPDATE_DATA_WITH_PASS_RECEIVED: 'UPDATE_DATA_WITH_PASS_RECEIVED',
    UPDATE_DATA_WITH_AVATAR_RECEIVED: 'UPDATE_DATA_WITH_AVATAR_RECEIVED',

    /** Events for getting status from api authorization requests */
    REGISTER_STATUS: 'REGISTER_STATUS',
    LOGIN_STATUS: 'LOGIN_STATUS',
    LOGOUT_STATUS: 'LOGOUT_STATUS',

    /** Event for saying to request in api by content on page */
    ID_GOT: 'ID_GOT',
    ID_CAN_BE_VIEWED: 'ID_CAN_BE_VIEWED',

    /** Events after likes requests on API */
    LIKED_TRACK: 'LIKED_TRACK',
    UNLIKED_TRACK: 'UNLIKED_TRACK',
    LIKED_ARTIST: 'LIKED_ARTIST',
    UNLIKED_ARTIST: 'UNLIKED_ARTIST',
    LIKED_PLAYLIST: 'LIKED_PLAYLIST',
    UNLIKED_PLAYLIST: 'UNLIKED_PLAYLIST',

    /** Event for starting user page render */
    USER_DATA_GOT_FOR_PAGE: 'USER_DATA_GOT_FOR_PAGE',

    /** Song events */
    VOLUME_CHANGED: 'VOLUME_CHANGED',
    SONG_FOUND: 'SONG_FOUND',
    SONG_VOLUME: 'SONG_VOLUME',
    DOWNLOAD_NEW_TAPE: 'DOWNLOAD_NEW_TAPE',
    DOWNLOADING_ID: 'DOWNLOADING_ID',

    LOAD_TRACK: 'LOAD_TRACK',
    TRACK_END: 'TRACK_END',
    CHANGE_PLAY_STATE: 'CHANGE_PLAY_STATE',
    GET_DATA_AFTER_RESTART: 'GET_DATA_AFTER_RESTART',
    REPEAT_CHANGED: 'REPEAT_CHANGED',

    GOT_ALBUM: 'GOT_ALBUM',
    GOT_ONE_ALBUM: 'GOT_ONE_ALBUM',

    GOT_FAVORITE_TRACKS: 'GOT_FAVORITE_TRACKS',
    GOT_FAVORITE_ARTISTS: 'GOT_FAVORITE_ARTISTS',
    GOT_FAVORITE_ALBUMS: 'GOT_FAVORITE_ALBUMS',
    GOT_FAVORITE_PLAYLISTS: 'GOT_FAVORITE_PLAYLISTS',
    GOT_USER_PLAYLISTS: 'GOT_USER_PLAYLISTS',
    GOT_USER_PLAYLISTS_NO_TRACKS: 'GOT_USER_PLAYLISTS_NO_TRACKS',
    GOT_PLAYLIST: 'GOT_PLAYLIST',
    GOT_TRACK: 'GOT_TRACK',
    GOT_PLAYLIST_TRACKS: 'GOT_PLAYLIST_TRACKS',
    ADDED_TRACK_IN_PLAYLIST: 'ADDED_TRACK_IN_PLAYLIST',
    REMOVED_TRACK_FROM_PLAYLIST: 'REMOVED_TRACK_FROM_PLAYLIST',

    CREATED_PLAYLIST: 'CREATED_PLAYLIST',
    UPDATED_PLAYLIST: 'UPDATED_PLAYLIST',
    DELETED_PLAYLIST: 'DELETED_PLAYLIST',
    UPLOADED_PLAYLIST_COVER: 'UPLOADED_PLAYLIST_COVER',

    SEARCH_ALBUMS_ADDED: 'SEARCH_ALBUMS_ADDED',
    SEARCH_TRACKS_ADDED: 'SEARCH_TRACKS_ADDED',
    SEARCH_ARTISTS_ADDED: 'SEARCH_ARTISTS_ADDED',
    SEARCH_PLAYLIST_ADDED: 'SEARCH_PLAYLIST_ADDED',
    EMPTY_SEARCH: 'EMPTY_SEARCH',

    CHANGE_SHUFFLE: 'CHANGE_SHUFFLE',
};
