// todo jsdoc
function ifEquals(arg1, arg2, options) {
    return ((arg1 === arg2) ? options.fn(this) : options.inverse(this));
}

export default ifEquals;
