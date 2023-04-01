export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

export const Names = {
    nameOfApp: 'Spotify',
};

export const unAuthNavConfig = {
    left: {
        name: 'back page button',
        href: '/next',
        key: 'next',
        type: 'img',
        logoSrc: '/static/svg/buttonprevBut.svg',
    },
    right: {
        name: 'next page button',
        href: '/prev',
        key: 'prev',
        type: 'img',
        logoSrc: '/static/svg/buttonnextBut.svg',
    },
    premium: {
        name: 'Premium',
        href: '/premium',
        key: 'premium',
        type: 'a',
    },
    registration: {
        name: 'Sign up',
        href: '/register',
        key: 'registration',
        type: 'a',
    },
    login: {
        name: 'Log in',
        href: '/login',
        key: 'login',
        type: 'button',
    },
};

export const authNavConfig = {
    premium: {
        name: 'Upgrade',
        href: '/premium',
        key: 'premium',
        type: 'button',
    },
    profile: {
        name: 'Profile',
        href: '/profile',
        key: 'profile',
        type: 'button',
    },
    logout: {
        name: 'Logout',
        href: '/logout',
        key: 'logout',
        type: 'button',
    },
};

export const sidebarConfig = {
    feed: {
        name: 'Home',
        href: '/',
        key: 'feed',
        logoSrc: '/static/svg/VectorhomeLogo.svg',
    },
    search: {
        name: 'Search',
        href: '/search',
        key: 'search',
        logoSrc: '/static/svg/VectorsearchLogo.svg',
    },
    library: {
        name: 'Library',
        href: '/library',
        key: 'library',
        logoSrc: '/static/svg/librarylibraryLogo.svg',
    },
    createPlaylist: {
        name: 'Create Playlist',
        href: '/createPlaylist',
        key: 'createPlaylist',
        logoSrc: '/static/svg/Frame 29createPlaylisLogo.svg',
    },
    likedSongs: {
        name: 'Liked Songs',
        href: '/likedSongs',
        key: 'likedSongs',
        logoSrc: '/static/svg/Frame 28likedSongsLogo.svg',
    },
};
