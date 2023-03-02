'use strict';

import { NAMES } from './urls';

export function checkAuth () {
    return (localStorage.getItem(NAMES.jwtInLocal) !== null);
}
