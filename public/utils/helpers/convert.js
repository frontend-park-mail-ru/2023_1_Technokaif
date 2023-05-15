import { convertImgSrc } from '@functions/stringOperations';

/**
 * Function to convert srcImg to static format.
 * @param(*) options.
 */
export default function convert(options) {
    return convertImgSrc(options.fn(this));
}
