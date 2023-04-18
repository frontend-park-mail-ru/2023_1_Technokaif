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
        DescriptionsClass: '',
        Descriptions: '2019 11 songs 32 min',
        ButtonsDiv: '',
        bottomDiv: 'bottomDiv',

        numberDiv: 'numberDiv',
        TitleDiv: 'TitleDiv',
        ListensDiv: 'ListensDiv',

        placementTracks: 'js__placement-tracks',
        liked: 'likedDiv',
        buttonPlay: 'playButton js__button__play',
        albumLike: 'albumLike',
    };
}
