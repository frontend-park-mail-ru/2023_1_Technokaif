import { imgPath } from './pathConfig';

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

export const NAMES = {
    nameOfApp: 'Fluire',
};

export const unAuthNavConfig = {
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
        logoSrc: imgPath.homeLogo,
    },
    search: {
        name: 'Search',
        href: '/search',
        key: 'search',
        logoSrc: imgPath.searchLogo,
    },
    library: {
        name: 'Library',
        href: '/library/tracks',
        key: 'library',
        logoSrc: imgPath.likedLogo,
    },
    createPlaylist: {
        name: 'Create Playlist',
        href: '/createPlaylistAjaxRequest',
        key: 'createPlaylist',
        logoSrc: imgPath.createPlaylistLogo,
    },
};

/** RESPONSES between stores and view */
export const RESPONSES = {
    OK: 'OK',
    BAD: 'BAD',
    REPEAT: 'REPEAT',
};

export const METHOD = {
    FIELD: 'focusout',
    BUTTON: 'click',
    FORM: 'submit',
    CHANGE_FIELD_IMMEDIATELY: 'input',
    CHANGE_FIELD: 'change',
    UNLOAD_PAGE: 'beforeunload',
    ON_ELEMENT: 'mouseover',
    OUT_OF_ELEMENT: 'mouseout',
    KEY_PRESSED: 'keydown',
    SHOW: 'show',
    HIDE: 'hide',
    TOGGLE: 'toggle',
};

export const ElementsClassForUser = {
    email: 'js__email',
    username: 'js__username',
    FirstLastName: 'js__name',

    day: 'js__day',
    month: 'js__month',
    year: 'js__year',

    password: 'js__password',
    newPassword: 'js__new__password',
    newConfPassword: 'js__new__confirm__password',

    email_error: 'js__error__email',
    username_error: 'js__error__username',

    day_error: 'js__error__day',
    month_error: 'js__error__month',
    year_error: 'js__error__year',

    password_error: 'js__error__password',
    newPasswordError: 'js__error__new__password',
    newConfPasswordError: 'js__error__new__confirm__password',

    cancelButton: 'js__cancel-button',
    saveButton: 'js__save-button',
};

/** Next track and prev track of player */
export const playerConfig = {
    NEXT_TRACK: 1,
    PREV_TRACK: -1,
    FIRST_TIMER: 0,
    INTERVAL: 1,
};

/** All js tags for Player */
export const playerElementsJS = {
    trackArt: 'js__img',
    trackName: 'js__track-name',
    trackArtist: 'js__track-artist',

    playPauseButton: 'js__play-pause-track',
    playPauseImg: 'js__play-pause__img',
    nextTrack: 'js__next-track',
    prevTrack: 'js__prev-track',
    trackSlider: 'js__seek_slider',

    repeatButton: 'js__repeat',
    repeatImg: 'js__repeat__img',

    volumeIcon: 'js__music-icon',
    volumeSlider: 'js__volume_slider',
    currentTime: 'js__current-time',
    totalDuration: 'js__total-duration',
};

export const ElementsClassForRegister = {
    login: 'js__login',
    email: 'js__email',
    confEmail: 'js__email-confirm',
    confPassword: 'js__password-confirm',
    password: 'js__password',
    username: 'js__username',
    firstName: 'js__firstname',
    lastName: 'js__lastname',
    day: 'js__day',
    month: 'js__month',
    year: 'js__year',

    login_error: 'js__error__login',
    email_error: 'js__error__email',
    confEmail_error: 'js__error__email-confirm',
    confPassword_error: 'js__error__password-confirm',
    password_error: 'js__error__password',
    username_error: 'js__error__username',
    firstName_error: 'js__error__firstName',
    lastName_error: 'js__error__lastName',
    day_error: 'js__error__day',
    month_error: 'js__error__month',
    year_error: 'js__error__year',
};

export const DIRECTIONS = {
    forward: 'forward',
    backward: 'backward',
};

export const ACTION_ON_PATH = {
    goForward: 'goForward',
    goBackward: 'goBackward',
    login: 'login',
    canBeAccessed: 'Accessed',
};

/**
 * Black list of paths for authenticate user
 * @type {string[]} paths
 */
export const BLACKLIST_AUTH = [
    '/login',
    '/register',
];

/**
 * Black list of paths for authenticate user
 * @type {string[]} paths
 */
export const BLACKLIST_UNAUTH = [
    '^\/library\/',
];
