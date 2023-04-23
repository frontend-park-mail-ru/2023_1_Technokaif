/**
 * Function to make + 1.
 * @param(*) options.
 */
export default function position(options) {
    return +options.fn(this) + 1;
}
