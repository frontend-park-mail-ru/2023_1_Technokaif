import { convertImgSrc } from '@functions/stringOperations';

/**
 *
 */
export default function convert(options) {
    return convertImgSrc(options.fn(this));
}
