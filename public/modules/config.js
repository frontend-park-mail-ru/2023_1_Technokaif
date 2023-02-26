'use strict'

import {renderLogin} from '../api/auth/auth.js'
import {renderHome} from "../pages/home/home.js";
import {renderSignup} from "../api/auth/registration.js";

export const Names = {
    nameOfApp: 'Spotify',
}

export const componentsConfig = {
    sidebar: {

    },
    navbar: {

    },
    content: {

    }
}

export const sidebarConfig = {
    feed: {
        name: 'Home',
        href: '/feed',
        render: renderHome,
        key: 'feed',
    },
    search: {
        name: 'Search',
        href: '/search',
        render: renderSearchPage,
        key: 'search',
    },
    library: {
        name: 'Your Library',
        href: '/library',
        render: renderLibrary,
        key: 'library'
    }
}

export const unAuthNavConfig = {
    premium: {
        name: 'Premium',
        href: '/premium',
        render: renderHome,
        key: 'premium',
        type: 'a',
    }, registration: {
        name: 'Sign up',
        href: '/auth/registration',
        render: renderSignup,
        key: 'registration',
        type: 'a',
    }, login: {
        name: 'Log in',
        href: '/auth/login',
        render: renderLogin,
        key: 'login',
        type: 'button',
    }
}

export const authNavConfig = {
    premium: {
        name: 'Upgrade',
        href: '/premium',
        render: renderHome,
        key: 'premium',
        type: 'button',
    },
    profile: {
        name: 'Profile',
        href: '/auth/registration',
        render: null,
        key: 'profile',
        type: 'button',
    },
}
