import { imgPath } from '../config/pathConfig';

/**
 * Setup album cover
 * @returns {{json}}
 */
export function setupAlbum() {
    return {
        mainDiv: 'album',
        imgSrc: '',
        imgClass: 'album__img',

        headerDiv: 'album__descriptions',
        headerImgClass: '',
        headerDescriptions: 'descriptions',

        headerNameDiv: '',
        headerNameClass: 'headerNameClass',
        headerName: 'Album',
        headerNameOfElementDiv: '',
        headerNameOfElementClass: 'headerNameOfElementClass',
        headerNameOfElement: 'Album name',
        byClass: 'author',
        headerDescription: 'author__place',
        ArtistDiv: 'by__div',
        ArtistClass: 'ArtistClass js__author',
        ArtistName: 'name artist',
        DescriptionsDiv: '',
        DescriptionsClass: 'js__description-album',
        Descriptions: '2019 11 songs 32 min',
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

        hrClass: 'track-hr',
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
    };
}

/**
 *
 * @param track
 * @param position
 * @returns {json}
 */
export function setupLine(track, position) {
    return {
        id: track.id,
        positionTrack: position,
        lineDiv: 'track',
        imgLike: 'imgLike',
        lineIndex: 'track__index',
        lineBlock: 'track__img-block',
        cover: track.cover,
        isLiked: track.isLiked,
        lineTitle: 'track__title',
        name: track.name,
        lineListens: 'track__listens',
        listens: track.listens,
        lineDuration: '',
        duration: '',
    };
}
