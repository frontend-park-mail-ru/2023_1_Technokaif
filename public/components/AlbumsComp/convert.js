import { convertImgSrc } from '../../utils/functions/stringOperations.js';

/**
 *
 */
export default function convert(options) {
    return convertImgSrc(options.fn(this));
}
