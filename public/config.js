'use strict'

import {renderAuth as renderAuth} from './js/auth/auth.js'

export const Names = {
    nameOfApp: 'Spotify',
}

export const config = {
    login: {
        name: 'Авторизация',
        href: '/login',
        render: renderAuth,
        key: 'login',
    },
}