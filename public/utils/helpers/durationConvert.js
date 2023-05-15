/**
 * Convert
 * @param duration
 * @returns {string}
 */
function convert(duration) {
    const minutes = Math.floor(+duration / 60);
    let seconds = +duration % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

/**
 * Function to convert duration in string
 * @param {*} options -- options where to get return result
 * @returns
 */
export default function durationConvert(options) {
    return convert(options.fn(this));
}
