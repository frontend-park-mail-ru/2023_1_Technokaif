'use strict';

import { feedAjax } from '../../api/feed.js';

/**
 * Handler for home page logic.
 * @param {HTMLElement} parent -- where to place Home page
 */
export function renderHome (parent) {
    feedAjax(parent);
}
