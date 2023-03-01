'use strict';

import { renderLogin } from '../pages/login/auth.js';
import { renderHome } from '../pages/home/home.js';
import { renderSignup } from '../pages/registration/registration.js';
import {createHomePageContent} from "../components/MainWindowRender/mainWindow";

export const Names = {
    nameOfApp: 'Spotify'
};

export const componentsConfig = {
    sidebar: {

    },
    navbar: {

    },
    content: {

    }
};

export const sidebarConfig = {
    feed: {
        name: 'Home',
        href: '/feed',
        render: createHomePageContent,
        key: 'feed',
        logoSrc: '/static/svg/VectorhomeLogo.svg'
    },
    search: {
        name: 'Search',
        href: '/search',
        render: renderSearchPage,
        key: 'search',
        logoSrc: '/static/svg/VectorsearchLogo.svg'
    },
    library: {
        name: 'Library',
        href: '/library',
        render: renderLibrary,
        key: 'library',
        logoSrc: '/static/svg/librarylibraryLogo.svg'
    },
    createPlaylist: {
        name: 'Create Playlist',
        href: '/createPlaylist',
        render: renderLibrary,
        key: 'createPlaylist',
        logoSrc: '/static/svg/Frame 29createPlaylisLogo.svg'
    },
    likedSongs: {
        name: 'Liked Songs',
        href: '/likedSongs',
        render: renderLibrary,
        key: 'likedSongs',
        logoSrc: '/static/svg/Frame 28likedSongsLogo.svg'
    }
};

function renderLibrary () {

}

function renderSearchPage () {

}

export const unAuthNavConfig = {
    left: {
        name: 'back page button',
        href: '/next',
        render: renderHome,
        key: 'next',
        type: 'img',
        logoSrc: '/static/svg/buttonprevBut.svg',
    },
    right: {
        name: 'next page button',
        href: '/prev',
        render: renderHome,
        key: 'prev',
        type: 'img',
        logoSrc: '/static/svg/buttonnextBut.svg',
    },
    premium: {
        name: 'Premium',
        href: '/premium',
        render: renderHome,
        key: 'premium',
        type: 'a'
    },
    registration: {
        name: 'Sign up',
        href: '/auth/registration',
        render: renderSignup,
        key: 'registration',
        type: 'a'
    },
    login: {
        name: 'Log in',
        href: '/auth/login',
        render: renderLogin,
        key: 'login',
        type: 'button'
    }
};

export const authNavConfig = {
    premium: {
        name: 'Upgrade',
        href: '/premium',
        render: renderHome,
        key: 'premium',
        type: 'button'
    },
    profile: {
        name: 'Profile',
        href: '/auth/registration',
        render: null,
        key: 'profile',
        type: 'button'
    }
};
