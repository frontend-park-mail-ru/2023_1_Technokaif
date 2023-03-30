/**
 * Function to create home setup config for template.
 * @param items -- some data from server about some items. .
 * @return {json} config -- config for template.
 */
export function homeSetup(title, items) {
    return ({
        tapeDiv: 'tape',
        titleMainDivClass: 'tape__title',
        titleOfTrackClass: '',
        titleText: title,
        fullListClass: 'tape__show-text',
        fullListText: 'Show all',

        contentDivClass: 'tape__components',

        coverMainClass: 'component',
        imgDiv: 'component__img-div',
        imgClass: 'component__img',

        titleTextDiv: 'component__title',

        descriptionDiv: 'component__description',

        footerMainDiv: '',
        footerElementDiv: 'component__description',
        footerElements: 'artists',

        content: items,
    });
}
