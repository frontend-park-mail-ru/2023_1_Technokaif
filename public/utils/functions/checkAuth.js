'use strict';

/**
 *
 * @returns return true if jwt token exist in localStorage
 */
export function checkAuth () {
    return (localStorage.getItem('jwt') !== null);
}
