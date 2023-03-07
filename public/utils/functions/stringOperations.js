'use strict';

/**
 * Function to convert input src to view source.
 * @param {string} src -- input from server image src.
 * @returns {string} -- result source using in view.
 */
export function convertImgSrc (src) {
    return '/static/img' + src;
}
