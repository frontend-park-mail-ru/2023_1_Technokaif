'use strict'

import {renderLogin} from '../api/auth/auth.js'
import {renderHome} from "../home/home.js";
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
    login: {
        name: 'Home',
        href: '/feed',
        render: renderHome,
        key: 'home',
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
    }, signUp: {
        name: 'Sign up',
        href: '/auth/registration',
        render: renderSignup,
        key: 'registration',
    }, logIn: {
        name: 'Log in',
        href: '/auth/login',
        render: renderLogin,
        key: 'login',
    }
}

export const authNavConfig = {
    premium: {
        name: 'Upgrade',
        href: '/premium',
        render: renderHome,
        key: 'premium',
    },
    signUp: {
        name: 'Profile',
        href: '/auth/registration',
        render: null,
        key: 'profile',
    },
}
