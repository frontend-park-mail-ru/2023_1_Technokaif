import { convertImgSrc } from '../../utils/functions/stringOperations';

// todo jsdoc
/**
 *
 * @param {*} options
 */
function convert(options) {
    convertImgSrc(options.fn(this));
}

export default convert;
