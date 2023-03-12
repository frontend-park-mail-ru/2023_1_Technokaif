import { feedAjax } from '../../api/feed.js';

/**
 *
 * @param {HTMLElement} parent -- where to place Home page
 */
export function renderHome(parent) {
    feedAjax(parent);
}
