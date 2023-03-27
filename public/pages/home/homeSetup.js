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

        coverMainClass: 'tape__components',
        trackDiv: 'track',
        imgDiv: 'track-img',
        imgClass: 'track__img',
        titleTextDiv: 'track__name',
        trackIdDiv: 'track-id',

        footerMainDiv: 'inner-artists',
        footerElementDiv: 'track__artist-name',
        innerArtistIdDiv: null,

        artistsTitleDiv: 'tape__title',
        artistsTitle: 'artists-title',
        artistsFullList: 'tape__show-text',

        artistDiv: 'artist',
        artistIdDiv: 'artist-id',

        albumsTitle: 'albums-title',
        albumsFullList: 'tape__show-text',

        albumDiv: 'album',
        albumIdDiv: 'album-id',

        content: items,
    });
}
