import { feedAjax } from '../../api/feed.js';

// todo change dependencies from config render functions when delete this shit
/**
 *
 * @param {HTMLElement} parent -- where to place Home page
 */
export function renderHome(parent) {
    feedAjax(parent);
}
