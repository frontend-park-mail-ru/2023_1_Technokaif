/**
 * Compare arg1 and arg2, if equal return null
 * @param {string} arg1 -- first argument
 * @param {string} arg2 -- second argument
 * @param {*} options -- options where to get return result
 * @returns
 */
export default function ifNotEquals(arg1, arg2, options) {
    return ((arg1 !== arg2) ? options.fn(this) : options.inverse(this));
}
