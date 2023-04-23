/**
 * Compare arg1 and arg2, if not equal return null
 * @param {string} arg1 -- first argument
 * @param {string} arg2 -- second argument
 * @param arg3
 * @param arg4
 * @param {*} options -- options where to get return result
 * @returns
 */
export default function ifAllEquals(arg1, arg2, arg3, options) {
    return ((arg1 === arg2 || arg1 === arg3) ? options.fn(this) : options.inverse(this));
}
