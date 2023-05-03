import { convertMediaImgSrc } from '../../../utils/functions/stringOperations.js';

/**
 * Function to convert srcImg to static format.
 * @param(*) options.
 */
export default function convertMedia(options) {
    return convertMediaImgSrc(options.fn(this));
}
