'use strict'

import {renderLogin} from '../auth/auth.js'
import {renderHome} from "../home/home.js";

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
