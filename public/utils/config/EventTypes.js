/** Events emitted by stores */
export const EventTypes = {
    /** BASE VIEW usage events */
    ON_NOT_RENDERED_ITEMS: 'ON_NOT_RENDERED_ITEMS',
    ON_REMOVE_ANOTHER_ITEMS: 'ON_REMOVE_ANOTHER_ITEMS',

    /** FEED VIEW usage events */
    CHANGE_CONTENT: 'CHANGE_CONTENT',

    /** Login and Register forms events */
    VALIDATION_RESPONSE: 'VALIDATION_RESPONSE',

    /**
     * Events emitting after login or registration full validation
     * Subscribed function would probably be api request
     */
    SEND_DATA: 'SEND_DATA',

    /** Events for getting status from api authorization requests */
    REGISTER_STATUS: 'REGISTER_STATUS',
    LOGIN_STATUS: 'LOGIN_STATUS',
    LOGOUT_STATUS: 'LOGOUT_STATUS',
};
