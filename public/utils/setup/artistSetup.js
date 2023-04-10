import { imgPath } from '../config/pathConfig';

/**
 * Setup artist cover
 * @returns {{json}}
 */
export function setupArtistCover(artist) {
    return {
        coverName: 'artist-cover',
        title: 'artist-title',
        verifyBlock: 'artist-title__verify',
        verifyImgSrc: imgPath.verify,
        titleName: 'artist-title__name',
        titleListens: 'artist-title__listens',
        item: artist,
    };
}

/**
 * Setup general skeleton of artist page
 * @returns {{json}}
 */
export function setupArtistContent() {
    return {
        mainClass: 'js__artist-page-window',
        coverName: 'artist-cover',
        artistContent: 'artist-content',
        artistPreContent: 'artist-pre-content',
        playButton: 'play-button',
        playButtonSrc: imgPath.playInArtist,
        playButtonImg: 'artist-pre-content__img',
        stopButton: 'stop-button',
        stopButtonSrc: imgPath.stopInArtist,
        stopButtonImg: 'artist-pre-content__img',
        subscribeButton: 'artist-pre-content__button',
        anotherButton: 'another-button',
        anotherButtonSrc: imgPath.ellipseInArtist,
        anotherButtonImg: null,
        artistItems: 'artist-items',
        tapeBlock: 'album-list',
    };
}

/**
 * Setup line of track
 * @returns {{json}}
 */
export function setupLineList(items) {
    return {
        lineListClass: 'line-list',
        title: 'popular-tracks-title',
        titleText: 'Popular tracks',

        lineDiv: 'track-line',
        lineIndex: 'track-line__index',
        lineBlock: 'track-line__block',
        lineCover: 'track-line__cover',
        lineTitle: 'track-line__title',
        lineListens: 'track-line__listens',
        lineDuration: 'track-line__duration',
        defaultTrackSrc: imgPath.defaultTrack,

        content: items,
    };
}

/**
 * Setup liked songs
 * @returns {{json}}
 */
export function setupLikedSongs(artist) {
    return {
        blockName: 'liked-songs',
        title: 'liked-songs__title',
        item: 'liked-songs__item',
        imgClass: 'liked-songs__img',
        descriptionBlock: 'liked-songs__description',
        description: 'liked-songs__notification',
        authorBlock: 'liked-songs__author',
        artist,
    };
}

/**
 * Setup tapes
 * @returns {{json}}
 */
export function setupTape(title, items) {
    return {
        tapeDiv: 'tape',
        titleMainDivClass: 'tape__title',
        titleOfTrackClass: '',
        fullListClass: 'tape__show-text',
        fullListText: 'Show all',
        contentDivClass: 'tape__components',
        coverMainClass: 'component',
        imgDiv: 'component__img-div',
        imgClass: 'component__img',
        titleTextDiv: 'component__title',
        descriptionDiv: 'component__description',
        artistsDiv: 'component__artists',
        footerMainDiv: '',
        footerElementDiv: 'component__description',
        footerElements: 'artists',
        defaultSrc: imgPath.defaultAlbum,

        titleText: title,
        content: items,
    };
}
