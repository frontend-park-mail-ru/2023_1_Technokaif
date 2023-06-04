import { componentsNames } from '@config/componentsNames';
import { imgPath } from '@config/pathConfig';
import { AlbumApi, ContentArtist } from './artistSetup';

/**
 * Setup library tracks
 * @returns {{json}}
 */
export function setupLibraryTracks() {
    return {
        tracksClass: `library-tracks ${componentsNames.LIBRARY_TRACKS}`,
        imgSrc: '/static/svg/likedSongsLogo.svg',
        imgClass: 'album__img',

        headerDiv: 'album__descriptions',
        headerImgClass: 'header__img__sing-page',
        headerDescriptions: 'descriptions',

        headerNameDiv: '',
        headerNameClass: 'headerNameClass not__clickable',
        headerName: 'Playlist',
        headerNameOfElementDiv: '',
        headerNameOfElementClass: 'headerNameOfElementClass not__clickable',
        headerNameOfElement: 'Favorite tracks',
        byClass: 'author not__clickable',
        headerDescription: 'author__place',
        ArtistDiv: 'by__div',
        ArtistClass: 'ArtistClass js__author',
        ArtistName: 'name artist',
        DescriptionsDiv: '',
        descriptionText: '',
        DescriptionsClass: 'js__description-album not__clickable',
        ButtonsDiv: 'album__buttons',
        bottomDiv: 'bottomDiv',

        numberDiv: 'numberDiv',
        TitleDiv: 'TitleDiv',
        ListensDiv: 'ListensDiv',

        placementTracks: 'js__placement-tracks',
        liked: 'likedDiv',
        buttonPlay: 'playButton js__button__play',
        albumLike: 'albumLike',

        isArtistPage: false,
        isPlaylistPage: true,
        isUserPlaylistPage: false,
        isLikedSongs: true,
    };
}

/**
 * Setup line of track
 * @returns {{json}}
 */
export function setupLineList(items: AlbumApi[], subStringInEnd = ''):ContentArtist {
    return {
        lineListClass: `line-list${subStringInEnd}`,
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
        isLikedSongs: false,
        isPlusTrack: false,

        trackLineOptions: 'track-line-optionals',
        optionsBlock: 'options-block',
        isArtistShow: true,
        isOptionsShow: true,
        isAlbumShow: true,
        isShowTitle: false,

        durationClass: 'track-line__duration',
        anotherClass: 'track-line__another',
        anotherSrc: imgPath.ellipseInArtist,
        anotherBlock: 'track-line__another-block',
    };
}

/**
 * Setup line of track
 * @returns {{json}}
 */
export function setupSearchLineList(items: AlbumApi[]): ContentArtist {
    return {
        lineListClass: 'line-list-search',
        title: 'popular-tracks-title',
        titleText: 'Popular tracks',

        lineDiv: 'search-track-line',
        lineIndex: 'track-line__index',
        lineBlock: 'track-line__block',
        lineCover: 'track-line__cover',
        lineTitle: 'track-line__title',
        lineListensClass: 'track-line__listens',
        lineDuration: 'track-line__duration',

        buttonsClass: 'buttons',
        playButton: 'search-play-button-track',
        playButtonSrc: imgPath.trackPlay,
        playButtonImg: 'likeImg',
        stopButton: 'search-stop-button-track',
        stopButtonSrc: imgPath.trackPause,
        stopButtonImg: 'likeImg',

        likeButtons: 'like-button-block',
        like: 'search-like-button',
        likeButtonSrc: imgPath.trackLike,
        likeButtonImg: 'like-button__img',

        unlike: 'search-unlike-button',
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
        isPlusTrack: false,

        trackLineOptions: 'track-line-optionals',
        optionsBlock: 'options-block',
        isArtistShow: true,
        isAlbumShow: false,
        isShowTitle: false,
        isOptionsShow: false,

        durationClass: 'track-line__duration',
        anotherClass: 'search-track-line__another',
        anotherSrc: imgPath.ellipseInArtist,
        anotherBlock: 'search-track-line__another-block',
    };
}

/**
 * Setup line of track
 * @returns {{json}}
 */
export function setupSearchLineListForPlaylist(items: AlbumApi[], playlistId: string): ContentArtist {
    return {
        lineListClass: 'line-list-search',
        title: 'popular-tracks-title',
        titleText: 'Popular tracks',

        lineDiv: 'search-track-line',
        generalLineDiv: 'track-line',
        lineIndex: 'track-line__index',
        lineBlock: 'track-line__block',
        lineCover: 'track-line__cover',
        lineTitle: 'track-line__title',
        lineListensClass: 'track-line__listens',
        lineDuration: 'track-line__duration',

        buttonsClass: 'buttons',
        playButton: 'search-play-button-track',
        playButtonSrc: imgPath.trackPlay,
        playButtonImg: 'likeImg',
        stopButton: 'search-stop-button-track',
        stopButtonSrc: imgPath.trackPause,
        stopButtonImg: 'likeImg',

        likeButtons: 'like-button-block',
        like: 'search-like-button',
        likeButtonSrc: imgPath.trackLike,
        likeButtonImg: 'search-like-button__img',

        unlike: 'search-unlike-button',
        unlikeButtonSrc: imgPath.trackUnLike,
        unlikeButtonImg: 'search-unlike-button__img',

        defaultTrackSrc: imgPath.defaultTrack,
        titleArtistDiv: 'artist__with__title',
        artistClass: 'artists__text',
        albumClass: 'albumClass',
        albumDiv: 'albumDiv',

        content: items,
        isArtistPage: false,
        isPlaylistPage: true,
        isLikedSongs: true,
        isPlusTrack: true,

        trackLineOptions: 'track-line-optionals',
        optionsBlock: 'options-block',
        isArtistShow: true,
        isAlbumShow: false,
        isShowTitle: false,
        isOptionsShow: false,

        durationClass: 'track-line__duration',
        anotherClass: 'search-track-line__another',
        anotherBlock: 'search-track-line__another-block',
        anotherSrc: imgPath.trackAdd,

        playlistId,
    };
}
