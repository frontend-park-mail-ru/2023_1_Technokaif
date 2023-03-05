'use strict';

import { feedAjax } from '../../api/feed.js';

// todo What is it?
/**
 *
 * @param {HTMLElement} parent -- where to place Home page
 */
export function renderHome (parent) {
    feedAjax(parent);
}
