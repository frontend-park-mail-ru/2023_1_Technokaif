export const routingUrl = {
    ROOT: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PAGE404: '/404',
    PROFILE: '/profile',
    LIBRARY: '/library',
    SEARCH: '/search',

    LIBRARY_TRACKS: '/library/tracks',
    LIBRARY_ALBUMS: '/library/albums',
    LIBRARY_ARTISTS: '/library/artists',
    LIBRARY_PLAYLISTS: '/library/playlists',

    ARTIST_PAGE: (id) => `/artist/${id}`,
    ALBUM_PAGE: (id) => `/album/${id}`,
    PLAYLIST_PAGE: (id) => `/playlist/${id}`,
    GENERAL_REG_EXP: /^\/(\w+)\/(\d+)$/,
    ARTIST_PAGE_EXP: '^/artist/(\\d+)$',
    ALBUM_PAGE_EXP: '^/album/(\\d+)$',
    TRACK_PAGE_EXP: '^/track/(\\d+)$',
    USER_PAGE_EXP: '^/user/(\\d+)$',
    PLAYLIST_PAGE_EXP: '^/playlist/(\\d+)$',
};
