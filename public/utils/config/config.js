export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

export const NAMES = {
    nameOfApp: 'Spotify',
};

export const unAuthNavConfig = {
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

/** RESPONSES between stores and view */
export const RESPONSES = {
    OK: 'OK',
    BAD: 'BAD',
};

export const METHOD = {
    FIELD: 'focusout',
    BUTTON: 'click',
};

export const ElementsClassForUser = {
    email: 'js__email',
    username: 'js__username',
    FirstLastName: 'js__name',

    day: 'js__day',
    month: 'js__month',
    year: 'js__year',

    gender: 'js__gender',
    gender_element: 'js__gender__element',

    password: 'js__password',
    newPassword: 'js__new__password',
    newConfPassword: 'js__new__confirm__password',

    email_error: 'js__error__email',
    username_error: 'js__error__username',

    day_error: 'js__error__day',
    month_error: 'js__error__month',
    year_error: 'js__error__year',

    gender_error: 'js__error__gender',

    password_error: 'js__error__password',
    newPasswordError: 'js__error__new__password',
    newConfPasswordError: 'js__error__new__confirm__password',

    cancelButton: 'js__cancel-button',
    saveButton: 'js__save-button',
};
