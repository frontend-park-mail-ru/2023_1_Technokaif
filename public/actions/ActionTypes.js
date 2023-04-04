/** Global object types for Actions */
const ActionTypes = {
    /** Send data in API store from Views */
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    REGISTER: 'REGISTER',
    FEED: 'FEED',
    ARTIST: 'ARTIST',
    ARTIST_ALBUMS: 'ARTIST_ALBUMS',
    ARTIST_TRACKS: 'ARTIST_TRACKS',

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

    /** Send when click on button in register/login */
    VALIDATION_CHECK_CORRECT_ALL: 'VALIDATION_CHECK_CORRECT_ALL',

    /** Send when api request returned data and add it in state after emit a CHANGE_CONTENT event */
    FEED_GOT_CONTENT: 'FEED_GOT_CONTENT',
    ARTIST_GOT_ALL_CONTENT: 'ARTIST_GOT_ALL_CONTENT',
    FEED_ALL_CONTENT_RECEIVED: 'FEED_ALL_CONTENT_RECEIVED',

    /** Router usage ActionType for Stores adaptation */
    CHANGE_STORE: 'CHANGE_STORE',
    ID_PROVIDED: 'ID_PROVIDED',
};

export default ActionTypes;
