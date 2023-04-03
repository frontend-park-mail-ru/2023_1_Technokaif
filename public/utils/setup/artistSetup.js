/**
 * Setup
 * @returns {{json}}
 */
export function setupArtistCover() {
    return {
        coverName: 'artist-cover',
        title: 'artist-title',
        verifyBlock: 'artist-title__verify',
        verifyImgSrc: '/static/svg/verify.svg',
        titleName: 'artist-title__name',
        titleListens: 'artist-title__listens',
    };
}

/**
 * Setup
 * @returns {{json}}
 */
export function setupArtistContent() {
    return {
        mainClass: 'js__artist-page-window',
        coverName: 'artist-cover',
        artistContent: 'artist-content',
        artistPreContent: 'artist-pre-content',
        playButton: 'play-button',
        playButtonSrc: '/static/svg/Pause.svg',
        playButtonImg: 'artist-pre-content__img',
        subscribeButton: 'artist-pre-content__button',
        anotherButton: 'another-button',
        anotherButtonSrc: '/static/svg/ellipses.svg',
        anotherButtonImg: null,
        artistItems: 'artist-items',
        tapeBlock: 'album-list',
    };
}

/**
 * Setup
 * @returns {{json}}
 */
export function setupLineList() {
    return {
        lineListClass: 'line-list',
        title: 'popular-tracks-title',
        titleText: 'Popular tracks',
    };
}

/**
 * Setup
 * @returns {{json}}
 */
export function setupList() {
    return {
        lineCover: 'track-line__cover',
        lineTitle: 'track-line__title',
        lineListens: 'track-line__listens',
        lineDuration: 'track-line__duration',
    };
}

/**
 * Setup
 * @returns {{json}}
 */
export function setupLikedSongs() {
    return {
        blockName: 'liked-songs',
        title: 'liked-songs__title',
        item: 'liked-songs__item',
        imgClass: 'liked-songs__img',
        descriptionBlock: 'liked-songs__description',
        description: 'liked-songs__notification',
        authorBlock: 'liked-songs__author',
        /** Get artist from api or view (in this we should know artist) */
        artist: null,
    };
}

// We have to place data inside some configs in ArtistContent
// or
// change logic with root = ../. in tape handlebars and place there.
/**
 * Setup
 * @returns {{json}}
 */
export function setupTape(/** title and items */) {
    return {
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
    };
}
