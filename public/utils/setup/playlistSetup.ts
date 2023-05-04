import { componentsNames } from '../config/componentsNames';
import { imgPath } from '../config/pathConfig';
import { AlbumApi } from './artistSetup';
import { DropDownSetup } from '../../components/smallComponents/dropDown/dropDown';

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
export function setupPlaylistLineList(items: [AlbumApi]):{ optionsBlock: string; lineDuration: string; lineCover: string; lineIndex: string; stopButtonImg: string; albumClass: string; artistClass: string; unlikeButtonImg: string; title: string; likeButtonImg: string; anotherSrc: string; likeButtons: string; content: [AlbumApi]; isLikedSongs: boolean; lineListensClass: string; lineTitle: string; titleText: string; unlike: string; durationClass: string; playButtonImg: string; isArtistShow: boolean; isAlbumShow: boolean; anotherClass: string; like: string; unlikeButtonSrc: string; defaultTrackSrc: string; lineListClass: string; lineBlock: string; playButton: string; likeButtonSrc: string; isUserPlaylistPage: boolean; titleArtistDiv: string; albumDiv: string; isArtistPage: boolean; lineDiv: string; buttonsClass: string; stopButton: string; stopButtonSrc: string; isPlaylistPage: boolean; playButtonSrc: string; trackLineOptions: string; isShowTitle: boolean } {
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
        nameInputClass: 'playlist-name',
        descriptionInputClass: 'playlist-description',
        inputValue: playlist.name,
        textareaValue: playlist.description,
        labelClass: '',
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
        mainDropDownDiv: 'track-dropDown',
        dropdownName: `track${id}-dropDown__name`,
        dropdownTitleDiv: 'track-dropDown__title',
        dropdownOptionsDiv: 'track-dropDown__options',
    };
}

/**
 * Setup of track playlist dropdown
 * @param id
 */
export function dropDownPlaylistsSetup(id: number):DropDownSetup {
    return {
        mainDropDownDiv: 'playlists-dropDown',
        dropdownName: `track${id}-dropDown__name`,
        dropdownTitleDiv: 'playlists-dropDown__title',
        dropdownOptionsDiv: 'playlists-dropDown__options',
    };
}
