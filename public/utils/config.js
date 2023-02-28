'use strict';

import { renderLogin } from '../pages/login/auth.js';
import { renderHome } from '../pages/home/home.js';
import { renderSignup } from '../pages/registration/registration.js';

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
        render: renderHome,
        key: 'feed'
    },
    search: {
        name: 'Search',
        href: '/search',
        render: renderSearchPage,
        key: 'search'
    },
    library: {
        name: 'Library',
        href: '/library',
        render: renderLibrary,
        key: 'library'
    },
    createPlaylist: {
        name: 'Create Playlist',
        href: '/createPlaylist',
        render: renderLibrary,
        key: 'createPlaylist'
    },
    likedSongs: {
        name: 'Liked Songs',
        href: '/likedSongs',
        render: renderLibrary,
        key: 'likedSongs'
    }
};

function renderLibrary () {

}

function renderSearchPage() {

}

export const unAuthNavConfig = {
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