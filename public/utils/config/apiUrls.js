export const apiUrl = {
    FEED_TRACKS_API: '/api/tracks/feed',
    FEED_ALBUMS_API: '/api/albums/feed',
    FEED_ARTISTS_API: '/api/artists/feed',

    ARTIST_API: '/api/artists/',
    TRACK_API: '/api/tracks/',
    ALBUM_API: '/api/albums/',

    LIKE_ALBUM: '/api/albums/',
    UNLIKE_ALBUM: '/api/albums/',

    LIKE_TRACK: '/api/tracks/',
    UNLIKE_TRACK: '/api/tracks/',

    ARTIST_TRACKS_API: (id) => `/api/artists/${id}/tracks`,
    ARTIST_ALBUMS_API: (id) => `/api/artists/${id}/albums`,

    USER_API: (id) => `/api/users/${id}/`,
    USER_UPDATE_API: (id) => `/api/users/${id}/update`,
    AVATAR_REGEX: /^\/api\/users\/\d+\/avatar$/,
    USER_UPDATE_AVATAR_API: (id) => `/api/users/${id}/avatar`,
    USER_UPDATE_PASSWORD: '/api/auth/changepass',
    USER_PLAYLISTS: (id) => `/api/users/${id}/playlists`,
    USER_FAVOURITE_TRACKS: (id) => `/api/users/${id}/favorite/tracks`,
    USER_FAVOURITE_ARTISTS: (id) => `/api/users/${id}/favorite/artists`,
    USER_FAVOURITE_ALBUMS: (id) => `/api/users/${id}/favorite/albums`,

    TRACK_LIKE: (id) => `/api/tracks/${id}/like`,
    TRACK_UNLIKE: (id) => `/api/tracks/${id}/unlike`,

    ARTIST_LIKE: (id) => `/api/artists/${id}/like`,
    ARTIST_UNLIKE: (id) => `/api/artists/${id}/unlike`,

    AUTH: '/api/auth/signup',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    CHECK_AUTH: '/api/auth/check',
    CSRF_REQ: '/api/csrf',
};
