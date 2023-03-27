/**
 * Function to create home setup config for template.
 * @param items -- some data from server about tracks, artists, albums.
 * @return {json} config -- config for template.
 */
export function homeSetup(items) {
    return ({
        tapeDiv: 'tape__title',
        titleMainDivClass: '',
        titleOfTrackClass: '',
        // titleText: '',
        fullListClass: 'tape__show-text',
        fullListText: 'Show all',

        contentDivClass: 'tape__components',

        coverMainClass: 'component',
        imgDiv: 'component__img-div',
        // imgSrc: '',
        imgClass: 'component__img',

        titleTextDiv: 'component__title',
        // titleText: '',

        descriptionDiv: 'component__description',
        // descriptionText: '',

        footerMainDiv: '',
        footerElementDiv: 'component__description',
        // footerElementText: '',

        content: items,
    });
}
