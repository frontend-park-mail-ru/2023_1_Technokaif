import { imgPath } from '@config/pathConfig';

export declare interface ISetupAlbumConfg{
    mainDiv: string,
    imgSrc: string,
    imgClass: string,

    headerDiv: string,
    headerImgClass: string,
    headerDescriptions: string,

    headerNameDiv: string,
    headerNameClass: string,
    headerName: string,
    headerNameOfElementDiv: string,
    headerNameOfElementClass: string,
    headerNameOfElement: string,
    byClass: string,
    headerDescription: string,
    ArtistDiv: string,
    ArtistClass: string,
    ArtistName: string,
    DescriptionsDiv: string,
    DescriptionsClass: string,
    Descriptions: string,
    ButtonsDiv: string,
    bottomDiv: string,

    buttonDiv: string,
    buttonSrc: string,
    buttonClass: string,

    numberDiv: string,
    TitleDiv: string,
    ListensDiv: string,

    placementTracks: string,
    liked: string,
    buttonPlay: string,
    albumLike: string,
    isArtistPage: boolean,
    isPlaylistPage: boolean,

    hrClass: string,
}

/**
 * Setup album cover
 * @returns {{json}}
 */
export function setupAlbum(): ISetupAlbumConfg {
    return {
        mainDiv: 'album',
        imgSrc: '',
        imgClass: 'album__img',

        headerDiv: 'album__descriptions',
        headerImgClass: 'header__img__sing-page',
        headerDescriptions: 'descriptions',

        headerNameDiv: '',
        headerNameClass: 'headerNameClass',
        headerName: 'Album',
        headerNameOfElementDiv: '',
        headerNameOfElementClass: 'headerNameOfElementClass not__clickable',
        headerNameOfElement: '',
        byClass: 'author not__clickable',
        headerDescription: 'author__place',
        ArtistDiv: 'by__div',
        ArtistClass: 'ArtistClass js__author',
        ArtistName: '',
        DescriptionsDiv: '',
        DescriptionsClass: 'js__description-album not__clickable',
        Descriptions: '',
        ButtonsDiv: 'album__buttons',
        bottomDiv: 'bottomDiv',

        buttonDiv: 'buttonPlayOnComponent',
        buttonSrc: imgPath.playInArtist,
        buttonClass: 'buttonComponent',

        numberDiv: 'numberDiv',
        TitleDiv: 'TitleDiv',
        ListensDiv: 'ListensDiv',

        placementTracks: 'js__placement-tracks',
        liked: 'likedDiv',
        buttonPlay: 'playButton js__button__play',
        albumLike: 'albumLike',
        isArtistPage: false,
        isPlaylistPage: false,

        hrClass: 'track-hr',
    };
}

/**
 * Setup line of track
 * @returns {{json}}
 */
export function setupLineList(items, subStringInEnd = '') {
    return {
        lineListClass: `line-list${subStringInEnd}`,
        title: 'popular-tracks-title',
        titleText: 'Popular tracks',

        lineDiv: 'track-line',
        lineIndex: 'track-line__index',
        lineBlock: 'track-line__block',
        lineCover: 'track-line__cover',
        lineTitle: 'track-line__title',
        lineListens: 'track-line__listens',
        lineDuration: 'track-line__duration',

        buttonsClass: 'buttons',
        playButton: 'play-button-track',
        playButtonSrc: imgPath.trackPlay,
        playButtonImg: 'likeImg',
        stopButton: 'stop-button-track',
        stopButtonSrc: imgPath.trackPause,
        stopButtonImg: 'likeImg',

        likeButtons: 'like-button-block',
        like: 'like-button',
        likeButtonSrc: imgPath.trackLike,
        likeButtonImg: 'like-button__img',

        unlike: 'unlike-button',
        unlikeButtonSrc: imgPath.trackUnLike,
        unlikeButtonImg: 'unlike-button__img',

        defaultTrackSrc: imgPath.defaultTrack,
        titleArtistDiv: 'artist__with__title',
        artistClass: 'artists__text',
        albumClass: 'albumClass',
        albumDiv: 'albumDiv',

        trackLineOptions: 'track-line-optionals',
        optionsBlock: 'options-block',

        content: items,
        isArtistPage: false,
        isPlaylistPage: false,
        isArtistShow: true,
        isAlbumShow: false,
        isListensShow: true,
        lineListensClass: 'track-line__listens',
        isOptionsShow: true,
        isPlusTrack: false,

        durationClass: 'track-line__duration',
        anotherClass: 'track-line__another',
        anotherSrc: imgPath.ellipseInArtist,
        anotherBlock: 'track-line__another-block',
    };
}
