export const apiUrl = {
    FEED_TRACKS_API: '/api/tracks/feed',
    FEED_ALBUMS_API: '/api/albums/feed',
    FEED_ARTISTS_API: '/api/artists/feed',

    ARTIST_API: '/api/artists/',
    TRACK_API: '/api/tracks/',
    ALBUM_API: '/api/albums/',

    ARTIST_TRACKS_API: (id) => `/api/artists/${id}/tracks`,
    ARTIST_ALBUMS_API: (id) => `/api/artists/${id}/albums`,

    USER_API: (id) => `/api/users/${id}/`,
    USER_UPDATE_API: (id) => `/api/users/${id}/update`,
    USER_UPDATE_AVATAR_API: (id) => `/api/users/${id}/avatar`,
    USER_UPDATE_PASSWORD: '/api/auth/changepass',

    AUTH: '/api/auth/signup',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    CHECK_AUTH: '/api/auth/check',
    CSRF_REQ: '/api/csrf',
};
