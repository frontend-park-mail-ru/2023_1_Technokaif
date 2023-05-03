import { convertMediaImgSrc } from '../../../utils/functions/stringOperations.js';

/**
 * Function to convert srcImg to static format.
 * @param(*) options.
 */
export default function convert(options) {
    return convertMediaImgSrc(options.fn(this));
}
