import { componentsNames } from '../config/componentsNames';
import { imgPath } from '../config/pathConfig';
import { AlbumApi, ContentArtist } from './artistSetup';

export interface User {
    avatarSrc: string,
    birthDate: string,
    email: string,
    firstName: string,
    id: number,
    lastName: string,
    username: string
}

export interface Playlist {
    cover: string,
    description: string,
    id: number,
    isLiked: boolean,
    name: string,
    users: User,
}

/**
 * Setup user playlist
 * @returns {{json}}
 */
export function setupUserPlaylist(playlist: Playlist) {
    return {
        tracksClass: `library-tracks ${componentsNames.PLAYLIST}`,
        imgSrc: playlist.cover,
        imgClass: 'album__img',

        headerDiv: 'album__descriptions',
        headerImgClass: '',
        headerDescriptions: 'playlist-desc',
        headerNameDiv: '',
        headerNameClass: 'headerNameClass',
        headerName: 'Playlist',
        headerNameOfElementDiv: '',
        headerNameOfElementClass: 'headerNameOfElementClass',
        headerNameOfElement: playlist.name,
        byClass: 'author',
        headerDescription: 'author__place',
        DescriptionsDiv: '',
        descriptionText: playlist.description,
        DescriptionsClass: 'js__description-album',
        ButtonsDiv: 'album__buttons',
        bottomDiv: 'bottomDiv',

        numberDiv: 'numberDiv',
        TitleDiv: 'TitleDiv',
        ListensDiv: 'ListensDiv',

        isLiked: playlist.isLiked,
        placementTracks: 'js__placement-tracks',
        liked: 'likedDiv',
        buttonPlay: 'playButton js__button__play',
        albumLike: 'albumLike',

        isArtistPage: false,
        isPlaylistPage: true,
        isUserPlaylistPage: true,
        isLikedSongs: false,
    };
}

/**
 * Setup user playlist
 * @returns {{json}}
 */
export function setupPlaylist(playlist: Playlist) {
    return {
        tracksClass: `library-tracks ${componentsNames.PLAYLIST}`,
        imgSrc: playlist.cover,
        imgClass: 'album__img',

        headerDiv: 'album__descriptions',
        headerImgClass: '',
        headerDescriptions: 'playlist-desc',

        headerNameDiv: '',
        headerNameClass: 'headerNameClass',
        headerName: 'Playlist',
        headerNameOfElementDiv: '',
        headerNameOfElementClass: 'headerNameOfElementClass',
        headerNameOfElement: playlist.name,
        byClass: 'author',
        headerDescription: 'author__place',
        DescriptionsDiv: '',
        descriptionText: playlist.description,
        DescriptionsClass: 'js__description-album',
        ButtonsDiv: 'album__buttons',
        bottomDiv: 'bottomDiv',

        numberDiv: 'numberDiv',
        TitleDiv: 'TitleDiv',
        ListensDiv: 'ListensDiv',

        isLiked: playlist.isLiked,
        placementTracks: 'js__placement-tracks',
        liked: 'likedDiv',
        buttonPlay: 'playButton js__button__play',
        albumLike: 'albumLike',

        isArtistPage: false,
        isPlaylistPage: true,
        isUserPlaylistPage: false,
        isLikedSongs: false,
    };
}

/**
 * Setup line of track
 * @returns {{json}}
 */
export function setupPlaylistLineList(items: [AlbumApi]):ContentArtist {
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
        titleArtistDiv: 'artist__with__title',
        artistClass: 'artists__text',
        albumClass: 'albumClass',
        albumDiv: 'albumDiv',

        content: items,
        isArtistPage: false,
        isPlaylistPage: true,
        isLikedSongs: true,

        trackLineOptions: 'track-line-optionals',
        optionsBlock: 'options-block',
        isArtistShow: true,
        isAlbumShow: false,
        isShowTitle: false,

        durationClass: 'track-line__duration',
    };
}
