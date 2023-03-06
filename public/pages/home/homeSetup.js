'use strict';

/**
 * Function to create home setup config for template.
 * @param items -- some data from server about tracks, artists, albums.
 * @returns {json} config -- config for template.
 */
export function homeSetup (items) {
    return ({
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

        defaultAlbumCover: '/static/img/album2.jpg',
        defaultTrackCover: '/static/img/pink.jpeg',
        defaultArtistCover: '/static/img/singer.jpg',

        content: items
    });
}
