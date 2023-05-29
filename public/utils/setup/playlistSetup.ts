import { componentsNames } from '@config/componentsNames';
import { imgPath } from '@config/pathConfig';
import { DropDownSetup } from '@smallComponents/dropDown/dropDown';
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
 * Object of playlist types
 */
export const playlistTypes = {
    USER_PLAYLIST: 'USER_PLAYLIST',
    PLAYLIST: 'PLAYLIST',
};

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
        headerImgClass: 'header__img__sing-page',
        headerDescriptions: 'descriptions',
        headerNameDiv: '',
        headerNameClass: 'headerNameClass',
        headerName: 'Playlist',
        headerNameOfElementDiv: '',
        headerNameOfElementClass: 'headerNameOfElementClass',
        headerNameOfElement: playlist.name,
        byClass: 'author',
        headerDescription: 'author__place',
        descClass: 'description-playlist',
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
        playlistDelete: 'playlist-delete',

        mainDiv: 'navbar-avatar',
        imgDiv: 'navbar-avatar__img-container',
        imgAvatarClass: 'avatar-image-playlist',
        defaultAvatar: imgPath.defaultArtist,
        avatarImgClass: 'navbar-avatar__img',
        textDiv: 'navbar-avatar__text-container',
        textClass: 'navbar-avatar__text',
        usersPlacement: 'user-placement',
        users: playlist.users,

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
        headerImgClass: 'header__img__sing-page',
        headerDescriptions: 'descriptions',

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

        mainDiv: 'navbar-avatar',
        imgDiv: 'navbar-avatar__img-container',
        imgAvatarClass: 'avatar-image-playlist',
        defaultAvatar: imgPath.defaultArtist,
        avatarImgClass: 'navbar-avatar__img',
        textDiv: 'navbar-avatar__text-container',
        textClass: 'navbar-avatar__text',
        usersPlacement: 'user-placement',
        users: playlist.users,

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
export function setupPlaylistLineList(items: AlbumApi[]): ContentArtist {
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
        isAlbumShow: true,
        isShowTitle: false,
        isOptionsShow: true,

        isUserPlaylistPage: true,

        durationClass: 'track-line__duration',
        anotherClass: 'track-line__another',
        anotherSrc: imgPath.ellipseInArtist,
    };
}

/**
 * Function to setup modal window
 */
export function setupModalWindow(playlist: Playlist) {
    return {
        windowOverlay: 'modal-overlay',
        windowClass: 'modal',
        titleClass: 'playlist-title',
        title: 'Change your playlist info',
        dataClass: 'playlist-info',
        coverClass: 'playlist-modal-cover',
        coverImg: 'playlist-cover-img',
        coverSrc: playlist.cover,
        defaultCover: imgPath.defaultTrack,
        infoBlockClass: 'playlist-info-block',

        saveButtonClass: 'modal-playlist-button',
        nameInputClass: 'playlist-name-input',
        nameBlockClass: 'playlist-name',
        descriptionInputClass: 'playlist-description-input',
        descriptionBlockClass: 'playlist-description',
        inputValue: playlist.name,
        textareaValue: playlist.description,
        labelClass: 'modal-window-label',
        nameInputPlaceholder: 'Enter a playlist name',
        descriptionPlaceholder: 'Add a description',
    };
}

/**
 * Setup of track dropdown
 * @param id
 */
export function dropDownTrackSetup(id: string):DropDownSetup {
    return {
        mainDropDownDiv: 'dropDown',
        dropdownName: `track${id}-dropDown__name`,
        dropdownTitleDiv: 'dropDown__title',
        dropdownOptionsDiv: 'dropDown__options',
    };
}
