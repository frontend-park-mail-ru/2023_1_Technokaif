import { convertImgSrc } from '../../utils/functions/stringOperations';

// todo jsdoc
function convert(options) {
    convertImgSrc(options.fn(this));
}

export default convert;
