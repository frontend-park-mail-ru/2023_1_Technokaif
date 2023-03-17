/**
 * Function to create home setup config for template.
 * @param items -- some data from server about tracks, artists, albums.
 * @return {json} config -- config for template.
 */
export function homeSetup(items) {
    return ({
        mainPageWindowDiv: 'main-page-window',
        tracksTitleDiv: 'tape__title',
        tracksTitle: 'tracks-title',
        tracksFullList: 'tape__show-text',

        tracksDiv: 'tape__components',
        trackDiv: 'track',
        trackImgDiv: 'track-img',
        trackImg: 'track__img',
        trackNameDiv: 'track__name',
        trackIdDiv: 'track-id',

        innerArtistsDiv: 'inner-artists',
        innerArtistNameDiv: 'track__artist-name',
        innerArtistIdDiv: null,

        artistsTitleDiv: 'tape__title',
        artistsTitle: 'artists-title',
        artistsFullList: 'tape__show-text',

        artistsDiv: 'tape__components',
        artistDiv: 'artist',
        artistImgDiv: 'artist-img',
        artistImg: 'artist__img',
        artistNameDiv: 'artist__name',
        artistIdDiv: 'artist-id',

        albumsTitleDiv: 'tape__title',
        albumsTitle: 'albums-title',
        albumsFullList: 'tape__show-text',

        albumsDiv: 'tape__components',
        albumDiv: 'album',
        albumImgDiv: 'album-img',
        albumImg: 'album__img',
        albumNameDiv: 'album__name',
        albumIdDiv: 'album-id',
        albumDescriptionDiv: 'album__description',

        defaultAlbumCover: '/static/img/albums/gorgorod.jpg',
        defaultTrackCover: '/static/img/tracks/pink.jpeg',
        defaultArtistCover: '/static/img/artists/singer.jpg',

        content: items,
    });
}
