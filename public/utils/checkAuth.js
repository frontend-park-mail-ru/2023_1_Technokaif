'use strict';

export function checkAuth () {
    return (localStorage.getItem('jwt') !== null);
}
