/**
 * Function to convert input src to view source.
 * @param {string} src -- input from server image src.
 * @return {string} -- result source using in view.
 */
export function convertImgSrc(src) {
    return `/static/img${src}`;
}
