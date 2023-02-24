'use strict'

import {renderLogin} from '../auth/auth.js'
import {renderHome} from "../home/home";

export const Names = {
    nameOfApp: 'Spotify',
}

export const config = {
    login: {
        name: 'Home',
        href: '/home',
        render: renderHome,
        key: 'home',
    },
    search: {
        name: 'Search',
        href: '/search',
        render: renderLogin,
        key: 'search',
    },
    library: {
        name: 'Your Library',
        href: '/library',
        render: null,
        key: 'library'
    }
}
