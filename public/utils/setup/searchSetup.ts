import { imgPath } from '../config/pathConfig';

/**
 * Search setup
 * @returns {{json}}
 */
export function searchSetup() {
    return {
        searchLine: {
            mainDiv: 'search-line',
            imgDiv: 'search-line__img-container',
            imgSrc: imgPath.searchLogo,
            imgClass: 'search-line__img',
            input: {
                divBeforeInput: '',
                typeOfInput: 'search',
                autocompleteOff: 'on',
                nameOfField: 'search',
                placeholder: 'Input your search request',
                classInp: 'search-line__input',
            },
        },
    };
}
