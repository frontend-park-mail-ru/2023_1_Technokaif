import { componentsNames } from '../config/componentsNames';

/**
 * Setup library tracks
 * @returns {{json}}
 */
export function setupLibraryTracks() {
    return {
        tracksClass: `library-tracks ${componentsNames.LIBRARY_TRACKS}`,
        imgSrc: '/static/svg/favoriteSongs.svg',
        imgClass: 'album__img',

        headerDiv: 'album__descriptions',
        headerImgClass: '',
        headerDescriptions: 'descriptions',

        headerNameDiv: '',
        headerNameClass: 'headerNameClass',
        headerName: 'Playlist',
        headerNameOfElementDiv: '',
        headerNameOfElementClass: 'headerNameOfElementClass',
        headerNameOfElement: 'Favorite tracks',
        byClass: 'author',
        headerDescription: 'author__place',
        ArtistDiv: 'by__div',
        ArtistClass: 'ArtistClass js__author',
        ArtistName: 'name artist',
        DescriptionsDiv: '',
        DescriptionsClass: 'js__description-album',
        ButtonsDiv: 'album__buttons',
        bottomDiv: 'bottomDiv',

        numberDiv: 'numberDiv',
        TitleDiv: 'TitleDiv',
        ListensDiv: 'ListensDiv',

        placementTracks: 'js__placement-tracks',
        liked: 'likedDiv',
        buttonPlay: 'playButton js__button__play',
        albumLike: 'albumLike',

        hrClass: 'track-hr',
        isArtistPage: false,
        isPlaylistPage: true,
        isLikedSongs: true,

        trackLineOptions: 'track-line-optionals',
        optionsBlock: 'options-block',
    };
}
