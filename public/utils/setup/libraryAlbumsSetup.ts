/**
 * Setup library albums
 * @returns {{json}}
 */
export function setupLibraryAlbums(albums) {
    return {
        mainDiv: 'album',
        imgSrc: '',
        imgClass: 'album__img',

        headerDiv: 'album__descriptions',
        headerImgClass: 'header__img__sing-page',
        headerDescriptions: 'descriptions',

        headerNameDiv: '',
        headerNameClass: 'headerNameClass not__clickable',
        headerName: 'Album',
        headerNameOfElementDiv: 'not__clickable',
        headerNameOfElementClass: 'headerNameOfElementClass not__clickable',
        headerNameOfElement: 'Album name',
        byClass: 'author',
        headerDescription: 'author__place',
        ArtistDiv: 'by__div',
        ArtistClass: 'ArtistClass js__author',
        ArtistName: 'name artist',
        DescriptionsDiv: '',
        DescriptionsClass: 'js__description-album not__clickable',
        Descriptions: '2019 11 songs 32 min',
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
        albums,
    };
}
