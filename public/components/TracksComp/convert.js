import { convertImgSrc } from '../../utils/functions/stringOperations.js';

// todo jsdoc
/**
 *
 */
export default function convert(options) {
    return convertImgSrc(options.fn(this));
}
