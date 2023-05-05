import { convertMediaImgSrc } from '@functions/stringOperations';

/**
 * Function to convert srcImg to static format.
 * @param(*) options.
 */
export default function mediaConvert(options) {
    return convertMediaImgSrc(options.fn(this));
}
