/** Global object types for Actions */
const ActionTypes = {
    /** Send data in API store from Views */
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    REGISTER: 'REGISTER',
    FEED: 'FEED',
    PROFILE: 'PROFILE',
    ARTIST: 'ARTIST',
    ARTIST_ALBUMS: 'ARTIST_ALBUMS',
    ARTIST_TRACKS: 'ARTIST_TRACKS',
    GET_TRACK: 'GET_TRACK',
    GOT_TRACK: 'GOT_TRACK',

    /** ComponentsStore checks for what render and handle un/render */
    CHECK_WHAT_RENDER: 'CHECK_WHAT_RENDER',
    ADD_COMPONENT_ON_PAGE: 'ADD_COMPONENT_ON_PAGE',
    REMOVE_COMPONENT_FROM_PAGE: 'REMOVE_COMPONENT_FROM_PAGE',
    CHANGE_ITEMS_ON_FEED: 'CHANGE_ITEMS_ON_FEED',

    /** Send when focusout of field */
    VALIDATION_FIELD: 'VALIDATION_FIELD',
    REGISTER_STATUS: 'REGISTER_STATUS',
    LOGIN_STATUS: 'LOGIN_STATUS',
    LOGOUT_STATUS: 'LOGOUT_STATUS',

    /** Like actions */
    LIKE_TRACK: 'LIKE_TRACK',
    UNLIKE_TRACK: 'UNLIKE_TRACK',
    LIKE_ARTIST: 'LIKE_ARTIST',
    UNLIKE_ARTIST: 'UNLIKE_ARTIST',
    LIKE_ALBUM: 'LIKE_ALBUM',
    UNLIKE_ALBUM: 'UNLIKE_ALBUM',
    LIKE_PLAYLIST: 'LIKE_PLAYLIST',
    UNLIKE_PLAYLIST: 'UNLIKE_PLAYLIST',

    /** Send when click on button in register/login */
    VALIDATION_CHECK_CORRECT_ALL: 'VALIDATION_CHECK_CORRECT_ALL',

    /** Send when api request returned data and add it in state after emit a CHANGE_CONTENT event */
    FEED_GOT_CONTENT: 'FEED_GOT_CONTENT',
    ARTIST_GOT_ALL_CONTENT: 'ARTIST_GOT_ALL_CONTENT',

    /** Add data in user info store */
    ADD_USER_INFO: 'ADD_USER_INFO',

    /** ID request from view */
    ID_VIEW_REQUEST: 'ID_VIEW_REQUEST',

    VALIDATE_USER: 'VALIDATE_USER',
    USER_UPDATE_API: 'USER_UPDATE_API',
    USER_UPDATE_PASSWORD: 'USER_UPDATE_PASSWORD',
    USER_UPDATE_AVATAR: 'USER_UPDATE_AVATAR',

    /** Send when clicked on some interactive elements and want to play track now clearing tape */
    PLAY_TRACK: 'PLAY_TRACK',
    PLAY_ALBUM: 'PLAY_ALBUM',
    PLAY_ARTIST: 'PLAY_ARTIST',

    /** Send when clicked on some interactive elements and want to queue track in the end */
    QUEUE_TRACK: 'QUEUE_TRACK',
    QUEUE_ALBUM: 'QUEUE_ALBUM',
    QUEUE_ARTIST: 'QUEUE_ARTIST',
    QUEUE_PLAYLIST: 'QUEUE_PLAYLIST',

    /** Router usage ActionType for Stores adaptation */
    CHANGE_STORE: 'CHANGE_STORE',
    ID_PROVIDED: 'ID_PROVIDED',

    /** Song update */
    DOWNLOAD_DIRECTIONAL_TRACK: 'DOWNLOAD_DIRECTIONAL_TRACK',
    DOWNLOAD_TRACK: 'DOWNLOAD_TRACK',
    CHANGE_VOLUME: 'CHANGE_VOLUME',
    UPLOAD_TAPE: 'UPLOAD_TAPE',
    SET_STATE: 'SET_STATE',
    SET_REPEAT: 'SET_REPEAT',
    TIME_OF_PLAY: 'TIME_OF_PLAY',
    CLEAR_ALL: 'CLEAR_ALL',
    FIRST_START_AFTER_RESTART: 'FIRST_START_AFTER_RESTART',

    GET_ALBUM_TRACKS: 'GET_ALBUM_TRACKS',
    ALBUM_TO_CONTENT: 'ALBUM_TO_CONTENT',
    GET_ALBUM: 'GET_ALBUM',

    /** Favorite api */
    GET_USER_FAVORITE_TRACKS: 'GET_USER_FAVORITE_TRACKS',
    GET_USER_FAVORITE_ALBUMS: 'GET_USER_FAVORITE_ALBUMS',
    GET_USER_FAVORITE_ARTISTS: 'GET_USER_FAVORITE_ARTISTS',
    GET_USER_FAVORITE_PLAYLISTS: 'GET_USER_FAVORITE_PLAYLISTS',

    /** Playlists api */
    GET_USER_PLAYLISTS: 'GET_USER_PLAYLISTS',
    GET_PLAYLIST: 'GET_PLAYLIST',
    CREATE_PLAYLIST: 'CREATE_PLAYLIST',
    UPDATE_PLAYLIST: 'UPDATE_PLAYLIST',
    DELETE_PLAYLIST: 'DELETE_PLAYLIST',
    UPLOAD_PLAYLIST_COVER: 'UPLOAD_PLAYLIST_COVER',
    GET_PLAYLIST_TRACKS: 'GET_PLAYLIST_TRACKS',
    ADD_TRACK_IN_PLAYLIST: 'ADD_TRACK_IN_PLAYLIST',
    REMOVE_TRACK_FROM_PLAYLIST: 'REMOVE_TRACK_FROM_PLAYLIST',

    FAVORITE_TRACKS_GOT: 'FAVORITE_TRACKS_GOT',
    FAVORITE_ARTISTS_GOT: 'FAVORITE_ARTISTS_GOT',
    FAVORITE_ALBUMS_GOT: 'FAVORITE_ALBUMS_GOT',

    ADD_FAVORITE_CONTENT: 'ADD_FAVORITE_CONTENT',
    ADD_PLAYLIST_CONTENT: 'ADD_PLAYLIST_CONTENT',
    UPDATE_PLAYLIST_CONTENT: 'UPDATE_PLAYLIST_CONTENT',

    /** Get album by id */
    ONE_ALBUM_TO_CONTENT: 'ONE_ALBUM_TO_CONTENT',

    /** Search */
    SEARCH_WITH_NAME: 'SEARCH_WITH_NAME',
    GOT_TRACKS_SEARCH: 'GOT_TRACKS_SEARCH',
    GOT_ALBUMS_SEARCH: 'GOT_ALBUMS_SEARCH',
    GOT_ARTISTS_SEARCH: 'GOT_ARTISTS_SEARCH',
    GOT_PLAYLIST_SEARCH: 'GOT_PLAYLIST_SEARCH',

    SET_OFFSET: 'SET_OFFSET',

    PLAY_PLAYLIST: 'PLAY_PLAYLIST',
    CLEAR_STORE: 'CLEAR_STORE_STATE',
    EMPTY_SEARCH: 'EMPTY_SEARCH',

    PLAY_TRACK_API: 'PLAY_TRACK_API',
    QUEUE_TRACK_API: 'QUEUE_TRACK_API',
    PLAY_ALBUM_API: 'PLAY_ALBUM_API',
    QUEUE_ALBUM_API: 'QUEUE_ALBUM_API',
    PLAY_ARTIST_API: 'PLAY_ARTIST_API',
    QUEUE_ARTIST_API: 'QUEUE_ARTIST_API',
    PLAY_PLAYLIST_API: 'PLAY_PLAYLIST_API',
    QUEUE_PLAYLIST_API: 'QUEUE_PLAYLIST_API',

    REMOVE_FROM_QUEUE: 'REMOVE_FROM_QUEUE',
    SWAP_IN_QUEUE: 'SWAP_IN_QUEUE',
};

export default ActionTypes;
