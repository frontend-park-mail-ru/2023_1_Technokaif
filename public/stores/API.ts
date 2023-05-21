import { loginAjax } from '@api/auth/loginAjaxReq';
import { registerAjax } from '@api/auth/registerAjaxReq';
import { feedAlbumsAjax } from '@api/albums/feedAlbumsAjaxRequest';
import { logoutAjax } from '@api/auth/logoutAjaxReq';
import { EventTypes } from '@config/EventTypes';
import { feedTracksAjax } from '@api/tracks/feedTracksAjaxRequest';
import { feedArtistsAjax } from '@api/artists/feedArtistsAjaxRequest';
import { artistAjax } from '@api/artists/artistAjaxRequest';
import { artistTracksAjax } from '@api/tracks/artistTracksAjaxRequest';
import { artistAlbumsAjax } from '@api/albums/artistAlbumsAjaxRequest';
import { getAlbumTracksFromServer } from '@api/player/album';
import { trackOneAjax } from '@api/player/track';
import { userAjax } from '@api/user/userRequestAjax';
import { userUpdateAjax } from '@api/user/userUpdateAjaxReq';
import { userUpdatePasswordAjax } from '@api/user/userUpdatePasswordAjaxReq';
import { userUpdateAvatarAjax } from '@api/user/uploadAvatarAjax';
import { setTrackLikeAjax } from '@api/tracks/trackLikeAjaxRequest';
import { removeTrackLikeAjax } from '@api/tracks/trackUnLikeAjaxRequest';
import { getAlbumById } from '@api/albums/getAlbumById';
import { likeAlbum, unLikeAlbum } from '@api/albums/likeDislike';
import { likeArtist, unLikeArtist } from '@api/artists/likeDislike';
import { userFavoriteTracksAjax } from '@api/favorite/getUserFavoriteTracksAjaxReq';
import { userFavoriteArtistsAjax } from '@api/favorite/getUserFavoriteArtistsAjaxReq';
import { instancesNames } from '@config/instances';
import { TrackInTape } from '@setup/artistSetup';
import { userFavoriteAlbumsAjax } from '@api/favorite/getUserFavoriteAlbumsAjaxReq';
import { userPlaylistsAjax } from '@api/user/getUserPlaylistsAjaxReq';
import { search } from '@api/search/search';
import { apiUrl } from '@config/apiUrls';
import { userFavoritePlaylistsAjax } from '@api/favorite/getUserFavoritePlaylistsAjaxReq';
import { getPlaylist } from '@api/playlists/getPlaylistAjaxRequest';
import { getPlaylistTracks } from '@api/playlists/getTracksAjaxRequest';
import { dislikePlaylist, likePlaylist } from '@api/playlists/likeDislikePlaylistAjaxRequest';
import {
    createPlaylistAjaxRequest,
    PlaylistContent,
} from '@api/playlists/createPlaylistAjaxRequest';
import { updatePlaylistAjaxRequest } from '@api/playlists/updatePlaylistAjaxRequest';
import { uploadPlaylistCover } from '@api/playlists/uploadPlaylistCoverAjaxRequest';
import { addTrackAjaxRequest } from '@api/playlists/addTrackAjaxRequest';
import { removeTrackAjaxRequest } from '@api/playlists/removeTrackAjaxRequest';
import { deletePlaylistAjaxRequest } from '@api/playlists/deletePlaylistAjaxRequest';
import ActionsSearch from '@Actions/ActionsSearch';
import ActionTypes from '@actions/ActionTypes';
import IStore from '@store/IStore';
import ContentActions from '@Actions/ContentActions';
import Actions from '@actions/Actions';
import APISongs from '@store/APISongs';

/**
 * Class using for getting data from backend.
 */
class API extends IStore {
    /**
     * Constructor for api store.
     */
    constructor() {
        super('api');
    }

    /**
     * Switches over the action's type when an action is dispatched.
     * @param action
     */
    override dispatch(action) {
        switch (action.type) {
        case ActionTypes.LOGIN:
            this.#loginRequest(action.username, action.password);
            break;
        case ActionTypes.REGISTER:
            this.#registerRequest(action.data);
            break;
        case ActionTypes.LOGOUT:
            this.#logoutRequest();
            break;
        case ActionTypes.FEED:
            this.#feedRequest();
            break;
        case ActionTypes.PROFILE:
            this.#profileRequest(action.id);
            break;
        case ActionTypes.ARTIST:
            this.#artistRequest(action.id);
            break;
        case ActionTypes.ARTIST_TRACKS:
            this.#artistTracksRequest(action.id);
            break;
        case ActionTypes.GET_TRACK:
            this.trackRequest(action.id);
            break;
        case ActionTypes.LIKE_TRACK:
            this.#likeTrackRequest(action.id);
            break;
        case ActionTypes.UNLIKE_TRACK:
            this.#unlikeTrackRequest(action.id);
            break;
        case ActionTypes.ARTIST_ALBUMS:
            this.#artistAlbumsRequest(action.id);
            break;
        case ActionTypes.DOWNLOAD_TRACK:
            this.#downloadTrack(action.id);
            break;
        case ActionTypes.USER_UPDATE_API:
            this.#updateUser(action.id, action.userData);
            break;
        case ActionTypes.USER_UPDATE_PASSWORD:
            this.#updatePasswordForUser(action.userData);
            break;
        case ActionTypes.USER_UPDATE_AVATAR:
            this.#updateUserAvatar(action.id, action.avatar);
            break;
        case ActionTypes.GET_ALBUM_TRACKS:
            this.#getAlbumTracks(action.id);
            break;
        case ActionTypes.GET_ALBUM:
            this.#getAlbum(action.id);
            break;
        case ActionTypes.UNLIKE_ALBUM:
            this.#unlikeAlbum(action.id);
            break;
        case ActionTypes.LIKE_ALBUM:
            this.#likeAlbum(action.id);
            break;
        case ActionTypes.UNLIKE_ARTIST:
            this.unlikeArtistRequest(action.id);
            break;
        case ActionTypes.LIKE_ARTIST:
            this.likeArtistRequest(action.id);
            break;
        case ActionTypes.GET_USER_FAVORITE_TRACKS:
            this.userFavoriteTracksRequest(action.userId);
            break;
        case ActionTypes.GET_USER_FAVORITE_ALBUMS:
            this.userFavoriteAlbumsRequest(action.userId);
            break;
        case ActionTypes.GET_USER_FAVORITE_ARTISTS:
            this.userFavoriteArtistsRequest(action.userId);
            break;
        case ActionTypes.GET_USER_FAVORITE_PLAYLISTS:
            this.userFavoritePlaylistsRequest(action.userId);
            break;
        case ActionTypes.GET_USER_PLAYLISTS:
            this.userPlaylistsRequest(action.userId);
            break;
        case ActionTypes.GET_PLAYLIST:
            this.playlistRequest(action.playlistId);
            break;
        case ActionTypes.GET_PLAYLIST_TRACKS:
            this.playlistTracksRequest(action.playlistId);
            break;
        case ActionTypes.ADD_TRACK_IN_PLAYLIST:
            this.addTrackInPlaylistRequest(action.playlistId, action.trackId);
            break;
        case ActionTypes.REMOVE_TRACK_FROM_PLAYLIST:
            this.removeTrackFromPlaylistRequest(action.playlistId, action.trackId);
            break;
        case ActionTypes.LIKE_PLAYLIST:
            this.likePlaylist(action.playlistId);
            break;
        case ActionTypes.UNLIKE_PLAYLIST:
            this.unlikePlaylist(action.playlistId);
            break;
        case ActionTypes.CREATE_PLAYLIST:
            this.createPlaylist(action.playlistData);
            break;
        case ActionTypes.UPDATE_PLAYLIST:
            this.updatePlaylist(action.id, action.playlistData);
            break;
        case ActionTypes.DELETE_PLAYLIST:
            this.deletePlaylist(action.id);
            break;
        case ActionTypes.UPLOAD_PLAYLIST_COVER:
            this.uploadPlaylistCover(action.id, action.cover);
            break;
        case ActionTypes.SEARCH_WITH_NAME:
            this.searchForAlbumsWithName(action.searchString);
            this.searchForArtistsWithName(action.searchString);
            this.searchForTracksWithName(action.searchString);
            this.searchForPlaylistWithName(action.searchString);
            break;
        case ActionTypes.PLAY_ARTIST:
            APISongs.dispatch(action);
            break;
        default:
        }
    }

    /**
     * Function to post login and password to server.
     * @param login
     * @param password
     */
    #loginRequest(login, password) {
        loginAjax(login, password).then(
            (message) => this.jsEmit(EventTypes.LOGIN_STATUS, message),
        );
    }

    /**
     * Function to post registration data to server.
     * @param data
     */
    #registerRequest(data) {
        registerAjax(data).then(
            (message) => this.jsEmit(EventTypes.REGISTER_STATUS, message),
        );
    }

    /**
     * Function to log out and request about to server.
     */
    #logoutRequest() {
        logoutAjax().then(
            (message) => {
                this.jsEmit(EventTypes.LOGOUT_STATUS, message);
                Actions.clearStore('userInfo');
                Actions.clearStore('SONG_STORE');
            },
        );
    }

    /**
     * Function to get feed page data from server.
     */
    #feedRequest() {
        feedTracksAjax().then((tracks) => ContentActions.feedAddContent({ Tracks: tracks }));
        feedArtistsAjax().then((artists) => ContentActions.feedAddContent({ Artists: artists }));
        feedAlbumsAjax().then((albums) => ContentActions.feedAddContent({ Albums: albums }));
    }

    /**
     * Function to get profile page data from server.
     */
    #profileRequest(id: string) {
        userAjax(id).then((userData) => {
            ContentActions.userAddContent(userData);
        });
    }

    /**
     * Function to get an artist from server
     */
    #artistRequest(id: string) {
        artistAjax(id).then((artist) => {
            ContentActions.artistAddContent(artist, instancesNames.ARTIST_PAGE);
        });
    }

    /**
     * Function to get an artist tracks from server
     */
    #artistTracksRequest(id: string) {
        artistTracksAjax(id).then((tracks) => {
            ContentActions.artistAddContent(tracks, 'tracks');
        });
    }

    /**
     * Function to get one track by id
     * @param id
     */
    private trackRequest(id: string) {
        trackOneAjax(id).then((track) => {
            ContentActions.addTrackContent(track);
        });
    }

    /**
     * Function to send like post request to track by id
     * @param id
     */
    #likeTrackRequest(id: string) {
        setTrackLikeAjax(id).then((message) => {
            this.jsEmit(EventTypes.LIKED_TRACK, message, id);
        });
    }

    /**
     * Function to send unlike post request to track by id
     * @param id
     */
    #unlikeTrackRequest(id: string) {
        removeTrackLikeAjax(id).then((message) => {
            this.jsEmit(EventTypes.UNLIKED_TRACK, message, id);
        });
    }

    /**
     * Function to get an artist albums from server
     */
    #artistAlbumsRequest(id: string) {
        artistAlbumsAjax(id).then((albums) => {
            ContentActions.artistAddContent(albums, instancesNames.FAVORITE_ALBUMS_PAGE);
        });
    }

    /** Download track song to browser */
    #downloadTrack(id: string) {
        trackOneAjax(id).then((track) => {
            this.jsEmit(EventTypes.LOAD_TRACK, { track });
        });
    }

    /** User update data to server */
    #updateUser(id: string, userData) {
        userUpdateAjax(id, userData).then((message) => this.jsEmit(
            EventTypes.UPDATE_DATA_RECEIVED,
            message,
        ));
    }

    /** User update data to server */
    #updatePasswordForUser(userData) {
        userUpdatePasswordAjax(userData).then((message) => this.jsEmit(
            EventTypes.UPDATE_DATA_WITH_PASS_RECEIVED,
            message,
        ));
    }

    /** User update avatar post request to server */
    #updateUserAvatar(id: string, avatar: FormData) {
        userUpdateAvatarAjax(id, avatar).then((message) => this.jsEmit(
            EventTypes.UPDATE_DATA_WITH_AVATAR_RECEIVED,
            message,
        ));
    }

    /** Get album from API */
    #getAlbumTracks(id: string) {
        getAlbumTracksFromServer(id).then((tracks) => {
            ContentActions.addAlbumToContent(tracks);
        });
    }

    /** Get one album */
    #getAlbum(id: string) {
        getAlbumById(id).then((message) => ContentActions.addOneAlbum(message));
    }

    /** Get name of album by id */
    #getAlbumName(albumId) {
        return getAlbumById(albumId).then((message) => message.name);
    }

    /** Unlike */
    #likeAlbum(id: string) {
        likeAlbum(id).catch(() => {
            console.warn('Like error from Album');
        });
    }

    /** Unlike */
    #unlikeAlbum(id: string) {
        unLikeAlbum(id).catch(() => {
            console.warn('Unlike error from Album');
        });
    }

    /**
     * Function to send like post request to track by id
     * @param id
     */
    private likeArtistRequest(id: string) {
        likeArtist(id).then((message) => {
            this.jsEmit(EventTypes.LIKED_ARTIST, message);
        });
    }

    /**
     * Function to send unlike post request to track by id
     * @param id
     */
    private unlikeArtistRequest(id: string) {
        unLikeArtist(id).then((message) => {
            this.jsEmit(EventTypes.UNLIKED_ARTIST, message);
        });
    }

    /**
     * Function to get favorite tracks by user id
     * @param userId
     */
    private userFavoriteTracksRequest(userId: string) {
        userFavoriteTracksAjax(userId).then((tracks) => {
            const promises: Promise<string>[] = [] as Promise<string>[];
            if (tracks) {
                (tracks as Array<TrackInTape>).forEach((element) => {
                    const albumId = element.albumID;
                    if (albumId) {
                        promises.push(this.#getAlbumName(albumId).then((albumMessage) => {
                            element.albumName = albumMessage;
                            return albumMessage;
                        }));
                    }
                });
                Promise.allSettled(promises).then(() => {
                    ContentActions.addFavoriteContent(tracks, instancesNames.FAVORITE_TRACKS_PAGE);
                    ContentActions.addFavoriteContent(tracks, instancesNames.LIKED_SONGS);
                });
            }
            // this.jsEmit(EventTypes.GOT_FAVORITE_TRACKS, tracks);
        });
    }

    /**
     * Function to get favorite albums by user id
     * @param userId
     */
    private userFavoriteAlbumsRequest(userId: string) {
        userFavoriteAlbumsAjax(userId).then((albums) => {
            ContentActions.addFavoriteContent(albums, instancesNames.FAVORITE_ALBUMS_PAGE);
        });
    }

    /**
     * Function to get favorite artists by user id
     * @param userId
     */
    private userFavoriteArtistsRequest(userId: string) {
        userFavoriteArtistsAjax(userId).then((artists) => {
            ContentActions.addFavoriteContent(artists, instancesNames.FAVORITE_ARTISTS_PAGE);
        });
    }

    /**
     * Function to get favorite artists by user id
     * @param userId
     */
    private userFavoritePlaylistsRequest(userId: string) {
        userFavoritePlaylistsAjax(userId).then((playlists) => {
            ContentActions.addFavoriteContent(playlists, instancesNames.FAVORITE_PLAYLISTS_PAGE);
        });
    }

    /**
     * Function to get user playlists by user id
     * @param userId
     */
    private userPlaylistsRequest(userId: string) {
        userPlaylistsAjax(userId).then((playlists) => {
            const promises: Promise<void>[] = [];
            playlists.forEach((playlist) => {
                promises.push(
                    getPlaylistTracks(playlist.id)
                        .then((tracks) => {
                            playlist.tracks = tracks;
                        }),
                );
            });
            Promise.all(promises).then(() => {
                ContentActions.addFavoriteContent(playlists, instancesNames.USER_PLAYLISTS_PAGE);
            });
        });
    }

    /**
     * Function to get playlist by playlist id
     * @param playlistId
     */
    private playlistRequest(playlistId: string) {
        getPlaylist(playlistId).then((playlist) => {
            ContentActions.addPlaylistContent(playlist, instancesNames.PLAYLIST_PAGE);
        });
    }

    /**
     * Function to create playlist
     * @param playlistData
     */
    private createPlaylist(playlistData: PlaylistContent) {
        createPlaylistAjaxRequest(playlistData).then((playlistId) => {
            this.jsEmit(EventTypes.CREATED_PLAYLIST, playlistId);
        });
    }

    /**
     * Function to update playlist
     * @param playlistId
     * @param playlistData
     */
    private updatePlaylist(playlistId: string, playlistData: PlaylistContent) {
        updatePlaylistAjaxRequest(playlistId, playlistData).then((message) => {
            ContentActions.updatePlaylistContent(playlistData);
            this.jsEmit(EventTypes.UPDATED_PLAYLIST, message, playlistData, playlistId);
        });
    }

    /**
     * Function to update playlist
     * @param playlistId
     */
    private deletePlaylist(playlistId: string) {
        deletePlaylistAjaxRequest(playlistId).then((message) => {
            this.jsEmit(EventTypes.DELETED_PLAYLIST, message);
        });
    }

    /**
     * Function to update playlist
     * @param playlistId
     * @param cover
     */
    private uploadPlaylistCover(playlistId: string, cover: FormData) {
        uploadPlaylistCover(playlistId, cover).then((message) => {
            this.jsEmit(EventTypes.UPLOADED_PLAYLIST_COVER, message, cover.get('cover'), playlistId);
        });
    }

    /**
     * Function to get playlist tracks by playlist id
     * @param playlistId
     */
    private playlistTracksRequest(playlistId: string) {
        getPlaylistTracks(playlistId).then((tracks) => {
            const promises: Promise<string>[] = [] as Promise<string>[];
            if (tracks) {
                (tracks as Array<TrackInTape>).forEach((element) => {
                    const albumId = element.albumID;
                    if (albumId) {
                        promises.push(this.#getAlbumName(albumId).then((albumMessage) => {
                            element.albumName = albumMessage;
                            return albumMessage;
                        }));
                    }
                });
                Promise.allSettled(promises).then(() => {
                    ContentActions.addPlaylistContent(tracks, instancesNames.PLAYLIST_TRACKS_PAGE);
                });
            }
        });
    }

    /**
     * Function to add track in playlist by playlist id
     * @param playlistId
     * @param trackId
     */
    private addTrackInPlaylistRequest(playlistId: string, trackId: string) {
        addTrackAjaxRequest(playlistId, trackId).then((message) => {
            this.jsEmit(EventTypes.ADDED_TRACK_IN_PLAYLIST, message);
        });
    }

    /**
     * Function to remove track from playlist by playlist id
     * @param playlistId
     * @param trackId
     */
    private removeTrackFromPlaylistRequest(playlistId: string, trackId: string) {
        removeTrackAjaxRequest(playlistId, trackId).then((message) => {
            this.jsEmit(EventTypes.REMOVED_TRACK_FROM_PLAYLIST, message, trackId);
        });
    }

    /**
     * Function to like playlist by playlist id
     * @param playlistId
     */
    private likePlaylist(playlistId: string) {
        likePlaylist(playlistId).then((message) => {
            this.jsEmit(EventTypes.LIKED_PLAYLIST, message);
        });
    }

    /**
     * Function to unlike playlist by playlist id
     * @param playlistId
     */
    private unlikePlaylist(playlistId: string) {
        dislikePlaylist(playlistId).then((message) => {
            this.jsEmit(EventTypes.UNLIKED_PLAYLIST, message);
        });
    }

    /** Search for track with value */
    private searchForTracksWithName(value) {
        search(apiUrl.TRACK_SEARCH_API, value).then((tracks) => {
            const promises: Promise<string>[] = [] as Promise<string>[];
            if (tracks.tracks.length) {
                (tracks.tracks as Array<TrackInTape>).forEach((element) => {
                    const albumId = element.albumID;
                    if (albumId) {
                        promises.push(this.#getAlbumName(albumId).then((albumMessage) => {
                            element.albumName = albumMessage;
                            return albumMessage;
                        }));
                    }
                });
                Promise.allSettled(promises).then(() => {
                    ActionsSearch.gotTracks(tracks);
                });
            }
        });
    }

    /** Search for playlist with name */
    private searchForPlaylistWithName(value) {
        search(apiUrl.PLAYLIST_SEARCH_API, value).then((playlists) => {
            ActionsSearch.gotPlaylists(playlists);
        }).catch(() => {});
    }

    /** Search for track with value */
    private searchForAlbumsWithName(value) {
        search(apiUrl.ALBUM_SEARCH_API, value).then((albums) => {
            ActionsSearch.gotAlbums(albums);
        }).catch(() => {});
    }

    /** Search for track with value */
    private searchForArtistsWithName(value) {
        search(apiUrl.ARTIST_SEARCH_API, value).then((artists) => {
            ActionsSearch.gotArtists(artists);
        }).catch(() => {});
    }
}

export default new API();
