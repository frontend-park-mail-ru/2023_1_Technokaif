/** Events emitted by stores */
export const EventTypes = {
    /** BASE VIEW usage events */
    ON_NOT_RENDERED_ITEMS: 'ON_NOT_RENDERED_ITEMS',
    ON_REMOVE_ANOTHER_ITEMS: 'ON_REMOVE_ANOTHER_ITEMS',

    /** FEED VIEW usage events */
    CHANGE_CONTENT: 'CHANGE_CONTENT',
    FEED_CONTENT_DONE: 'FEED_CONTENT_DONE',
    ARTIST_CONTENT_DONE: 'ARTIST_CONTENT_DONE',

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
};
