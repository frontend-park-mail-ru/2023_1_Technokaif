import { convertMediaImgSrc } from '@functions/stringOperations';

/**
 * Function to convert srcImg to static format.
 * @param(*) options.
 */
export default function convertMedia(options) {
    return convertMediaImgSrc(options.fn(this));
}
