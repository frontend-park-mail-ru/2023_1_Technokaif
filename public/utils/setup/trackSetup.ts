import { imgPath } from '@config/pathConfig';
import { ISetupAlbumConfg } from '@setup/albumSetup';

/**
 * Setup album cover
 * @returns {{json}}
 */
export function setupTrack(): ISetupAlbumConfg {
    return {
        mainDiv: 'album',
        imgSrc: '',
        imgClass: 'album__img',

        headerDiv: 'album__descriptions',
        headerImgClass: 'header__img__sing-page',
        headerDescriptions: 'descriptions',

        headerNameDiv: '',
        headerNameClass: 'headerNameClass',
        headerName: 'Track',
        headerNameOfElementDiv: '',
        headerNameOfElementClass: 'headerNameOfElementClass not__clickable',
        headerNameOfElement: '',
        byClass: 'author',
        headerDescription: 'author__place',
        ArtistDiv: 'by__div',
        ArtistClass: 'ArtistClass js__author',
        ArtistName: '',
        DescriptionsDiv: '',
        DescriptionsClass: 'js__description-album',
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
