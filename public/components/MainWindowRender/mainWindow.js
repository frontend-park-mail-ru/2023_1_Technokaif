export function createHomePageContent (parent, items) {
    const templateOfMainPage = Handlebars.compile(document.getElementById('main-page-template').innerHTML);

    const mainPage = templateOfMainPage({
        mainPageWindowDiv: 'main-page-window',

        tracksTitleDiv: 'tracks-titles',
        tracksTitle: 'tracks-title',
        tracksFullList: 'tracks-show-full',

        tracksDiv: 'tracks',
        trackDiv: 'track-item',
        trackImgDiv: 'track-item-img',
        trackImg: 'track-img',
        trackNameDiv: 'track-name',
        trackIdDiv: 'track-id',

        innerArtistsDiv: 'inner-artists',
        innerArtistNameDiv: 'inner-artist-name',
        innerArtistIdDiv: null,

        artistsTitleDiv: 'artists-titles',
        artistsTitle: 'artists-title',
        artistsFullList: 'artists-show-full',

        artistsDiv: 'artists',
        artistDiv: 'artist-item',
        artistImgDiv: 'artist-item-img',
        artistImg: 'artist-img',
        artistNameDiv: 'artist-name',
        artistIdDiv: 'artist-id',

        albumsTitleDiv: 'albums-titles',
        albumsTitle: 'albums-title',
        albumsFullList: 'albums-show-full',

        albumsDiv: 'albums',
        albumDiv: 'album-item',
        albumImgDiv: 'album-item-img',
        albumImg: 'album-img',
        albumNameDiv: 'album-name',
        albumIdDiv: 'album-id',
        albumDescriptionDiv: 'album-description',

        defaultAlbumCover: '/static/img/album.jpg',
        defaultTrackCover: '/static/img/peace.jpeg',
        defaultArtistCover: '/static/img/singer.jpg',

        content: items
    });

    parent.innerHTML += mainPage;
}
