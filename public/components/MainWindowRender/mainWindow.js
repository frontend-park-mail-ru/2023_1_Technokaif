export function createHomePageContent (parent, items) {
    const templateOfMainPage = Handlebars.compile(document.getElementById('main-page-template').innerHTML);

    const mainPage = templateOfMainPage({
        mainPageWindowDiv: 'main-page-window',

        tracksDiv: 'tracks',
        trackDiv: 'track-item',
        trackImgDiv: 'track-item-img',
        trackImg: 'track-img',
        trackNameDiv: 'track-name',
        trackIdDiv: 'track-id',

        artistsDiv: 'artists',
        artistDiv: 'artist-item',
        artistImgDiv: 'artist-item-img',
        artistImg: 'artist-img',
        artistNameDiv: 'artist-name',
        artistIdDiv: 'artist-id',

        albumsDiv: 'albums',
        albumDiv: 'album-item',
        albumImgDiv: 'album-item-img',
        albumImg: 'album-img',
        albumNameDiv: 'album-name',
        albumIdDiv: 'album-id',

        defaultAlbumCover: '/static/img/album.jpg',
        defaultTrackCover: '/static/img/peace.jpeg',
        defaultArtistCover: '/static/img/artist.jpg',

        content: items
    });

    parent.innerHTML += mainPage;
}
