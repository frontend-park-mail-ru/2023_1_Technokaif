import { imgPath } from '../config/pathConfig';

/** Artists to show on albums */
export interface ArtistApi {
    cover: string,
    id: number,
    isLiked: boolean,
    name: string,
}

/** Cover for Artist */
export interface ArtistCover {
    coverName: string,
    title: string;
    verifyBlock: string;
    verifyImgSrc: string;
    titleName: string;
    titleListens: string;
    item: ArtistApi;
}

/** General skeleton for artist page */
export interface ArtistContent {
    mainClass: string,
    coverName: string,
    artistContent: string,
    artistPreContent: string,
    buttonsClass: string,
    playButton: string,
    playButtonSrc: string,
    playButtonImg: string,
    stopButton: string,
    stopButtonSrc: string,
    stopButtonImg: string,
    likeButton: string,
    likeButtonSrc: string,
    likeButtonImg: string,
    unlikeButtonSrc: string,
    subscribeButton: string,
    artistItems: string,
    tapeBlock: string,
}

/** JSON for album to set in cover */
export interface AlbumApi {
    artists: [ArtistApi],
    cover: string,
    isLiked: boolean,
    name: string,
    albumID:number,
    id:number,
    listens:number,
    recordSrc:string,
}

export interface ContentArtist {
    lineListClass: string,
    title: string,
    titleText: string,

    lineDiv: string,
    lineIndex: string,
    lineBlock: string,
    lineCover: string,
    lineTitle: string,
    lineListensClass: string,
    lineDuration: string,

    buttonsClass: string,
    playButton: string,
    playButtonSrc: string,
    playButtonImg: string,
    stopButton: string,
    stopButtonSrc: string,
    stopButtonImg: string,

    likeButtons: string,
    like: string,
    likeButtonSrc: string,
    likeButtonImg: string,

    unlike: string,
    unlikeButtonSrc: string,
    unlikeButtonImg: string,

    defaultTrackSrc: string,

    content: [AlbumApi],
    isArtistPage: boolean,
    isPlaylistPage: boolean,
    isLikedSongs?: boolean,

    trackLineOptions?: string
    optionsBlock?: string
    titleArtistDiv?: string
    artistClass?: string
    albumClass?: string
    albumDiv?: string
}

/** JSON for liked songs */
export interface LikedSongs {
    blockName: string,
    title: string,
    item: string,
    imgClass: string,
    descriptionBlock: string,
    description: string,
    authorBlock: string,
    artist: ArtistApi,
    count: number,
}

/** Base JSON for tape component */
export interface BaseComponentInTape {
    cover:string,
    id:number,
    isLiked:boolean,
    name: string,
}

/** JSON for track in tape */
export interface TrackInTape extends BaseComponentInTape{
    artists: [ArtistApi],
    listens:number,
    recordSrc: string,
    albumID: number,
    albumName: string,
}

/** JSON for artist in tape */
export type ArtistInTape = BaseComponentInTape

/** JSON for album in tape */
export interface AlbumInTape extends BaseComponentInTape{
    artists: [ArtistApi]
    description:string,
}

/** Setup JSON for tape */
export interface TapeSetup {
    tapeDiv: string,
    titleMainDivClass: string,
    titleOfTrackClass: string,
    fullListClass: string,
    fullListText: string,
    contentDivClass: string,
    coverMainClass: string,
    imgDiv: string,
    imgClass: string,
    titleTextDiv: string,
    descriptionDiv: string,
    artistsDiv: string,
    footerMainDiv: string,
    footerElementDiv: string,
    footerElements: string,
    defaultSrc: string,
    buttonDiv: string,
    buttonSrc: string,
    buttonClass: string,

    titleText: string,
    content: [BaseComponentInTape],
}

/**
 * Setup artist cover
 * @returns {{json}}
 */
export function setupArtistCover(artist):ArtistCover {
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
export function setupArtistContent():ArtistContent {
    return {
        mainClass: 'js__artist-page-window',
        coverName: 'artist-cover',
        artistContent: 'artist-content',
        artistPreContent: 'artist-pre-content',
        buttonsClass: 'pre-buttons',
        playButton: 'play-button',
        playButtonSrc: imgPath.playInArtist,
        playButtonImg: 'artist-pre-content__img',
        stopButton: 'stop-button',
        stopButtonSrc: imgPath.stopInArtist,
        stopButtonImg: 'artist-pre-content__img',
        likeButton: 'artist__like-button',
        likeButtonSrc: imgPath.notLiked,
        likeButtonImg: 'like__img',
        unlikeButtonSrc: imgPath.liked,
        subscribeButton: 'artist-pre-content__button',
        artistItems: 'artist-items',
        tapeBlock: 'album-list',
    };
}

/**
 * Setup line of track
 * @returns {{json}}
 */
export function setupLineList(items: [AlbumApi]):ContentArtist {
    return {
        lineListClass: 'line-list',
        title: 'popular-tracks-title',
        titleText: 'Popular tracks',

        lineDiv: 'track-line',
        lineIndex: 'track-line__index',
        lineBlock: 'track-line__block',
        lineCover: 'track-line__cover',
        lineTitle: 'track-line__title',
        lineListensClass: 'track-line__listens',
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

        content: items,
        isArtistPage: true,
        isPlaylistPage: false,
    };
}

/**
 * Setup liked songs
 * @returns {{json}}
 */
export function setupLikedSongs(artist:ArtistApi, count: number):LikedSongs {
    return {
        blockName: 'liked-songs',
        title: 'liked-songs__title',
        item: 'liked-songs__item',
        imgClass: 'liked-songs__img',
        descriptionBlock: 'liked-songs__description',
        description: 'liked-songs__notification',
        authorBlock: 'liked-songs__author',
        artist,
        count,
    };
}

/**
 * Setup tapes
 * @returns {{json}}
 */
export function setupTape(title:string, items: [BaseComponentInTape]): TapeSetup {
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
        buttonDiv: 'buttonPlayOnComponent',
        buttonSrc: imgPath.playInArtist,
        buttonClass: 'buttonComponent',

        titleText: title,
        content: items,
    };
}
