import { loginAjax } from '../api/auth/loginAjaxReq';
import { registerAjax } from '../api/auth/registerAjaxReq';
import IStore from './IStore';
import ActionTypes from '../actions/ActionTypes';
import { feedAlbumsAjax } from '../api/albums/feedAlbumsAjaxRequest';
import Actions from '../actions/Actions';
import { logoutAjax } from '../api/auth/logoutAjaxReq';
import { EventTypes } from '../utils/config/EventTypes';
import { feedTracksAjax } from '../api/tracks/feedTracksAjaxRequest';
import { feedArtistsAjax } from '../api/artists/feedArtistsAjaxRequest';
import { artistAjax } from '../api/artists/artistAjaxRequest';
import { artistTracksAjax } from '../api/tracks/artistTracksAjaxRequest';
import { artistAlbumsAjax } from '../api/albums/artistAlbumsAjaxRequest';
import { trackAjax } from '../api/player/trackRequest';
import { getAlbumTracksFromServer } from '../api/player/album';
import { trackOneAjax } from '../api/player/track';
import { userAjax } from '../api/user/userRequestAjax';
import { userUpdateAjax } from '../api/user/userUpdateAjaxReq';
import { userUpdatePasswordAjax } from '../api/user/userUpdatePasswordAjaxReq';
import { userUpdateAvatarAjax } from '../api/user/uploadAvatarAjax';
import { setTrackLikeAjax } from '../api/tracks/trackLikeAjaxRequest';
import { removeTrackLikeAjax } from '../api/tracks/trackUnLikeAjaxRequest';
import { getAlbumById } from '../api/albums/getAlbumById.js';
import { likeAlbum, unLikeAlbum } from '../api/albums/likeDislike';
import { likeArtist, unLikeArtist } from '../api/artists/likeDislike';
import { userFavoriteTracksAjax } from '../api/favorite/getUserFavoriteTracksAjaxReq';
import { userFavoriteArtistsAjax } from '../api/favorite/getUserFavoriteArtistsAjaxReq';
import { instancesNames } from '../utils/config/instances';
import { TrackInTape } from '../utils/setup/artistSetup';
import { userFavoriteAlbumsAjax } from '../api/favorite/getUserFavoriteAlbumsAjaxReq';
import { userPlaylistsAjax } from '../api/user/getUserPlaylistsAjaxReq';
import { search } from '../api/search/search';
import { apiUrl } from '../utils/config/apiUrls';
import ActionsSearch from '../actions/Actions/ActionsSearch';
import { userFavoritePlaylistsAjax } from '../api/favorite/getUserFavoritePlaylistsAjaxReq';

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
        case ActionTypes.LIKE_TRACK:
            this.#likeTrackRequest(action.id);
            break;
        case ActionTypes.UNLIKE_TRACK:
            this.#unlikeTrackRequest(action.id);
            break;
        case ActionTypes.ARTIST_ALBUMS:
            this.#artistAlbumsRequest(action.id);
            break;
        case ActionTypes.PLAY_TRACK:
        case ActionTypes.QUEUE_TRACK:
            this.#trackRequestFromServer(action.id);
            break;
        case ActionTypes.PLAY_ALBUM:
        case ActionTypes.QUEUE_ALBUM:
            this.#albumsRequestFromServer(action.id);
            break;
        case ActionTypes.PLAY_ARTIST:
        case ActionTypes.QUEUE_ARTIST:
            this.#artistRequestFromServer(action.id);
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
        case ActionTypes.SEARCH_WITH_NAME:
            this.searchForAlbumsWithName(action.searchString);
            this.searchForArtistsWithName(action.searchString);
            this.searchForTracksWithName(action.searchString);
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
            (message) => this.jsEmit(EventTypes.LOGOUT_STATUS, message),
        );
    }

    /**
     * Function to get feed page data from server.
     */
    #feedRequest() {
        feedTracksAjax().then((tracks) => Actions.feedAddContent({ Tracks: tracks }));
        feedArtistsAjax().then((artists) => Actions.feedAddContent({ Artists: artists }));
        feedAlbumsAjax().then((albums) => Actions.feedAddContent({ Albums: albums }));
    }

    /**
     * Function to get profile page data from server.
     */
    #profileRequest(id: string) {
        userAjax(id).then((userData) => {
            Actions.userAddContent(userData);
        });
    }

    /**
     * Function to get an artist from server
     */
    #artistRequest(id: string) {
        artistAjax(id).then((artist) => {
            Actions.artistAddContent(artist, instancesNames.ARTIST_PAGE);
        });
    }

    /**
     * Function to get an artist tracks from server
     */
    #artistTracksRequest(id: string) {
        artistTracksAjax(id).then((tracks) => {
            Actions.artistAddContent(tracks, 'tracks');
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
            Actions.artistAddContent(albums, instancesNames.FAVORITE_ALBUMS_PAGE);
        });
    }

    /** Download track song to browser */
    #downloadTrack(id: string) {
        trackOneAjax(id).then((track) => {
            this.jsEmit(EventTypes.LOAD_TRACK, { track });
        });
    }

    /** Function to get Tracks from server */
    #trackRequestFromServer(id: string) {
        trackAjax(id).then((tracks) => {
            Actions.loadMoreLine(tracks);
        });
    }

    /** Function to get Albums from server */
    #albumsRequestFromServer(id: string) {
        getAlbumTracksFromServer(id).then((tracks) => {
            Actions.loadMoreLine(tracks);
        });
    }

    /** Function to get Artists from server */
    #artistRequestFromServer(id: string) {
        artistTracksAjax(id).then((tracks) => {
            Actions.loadMoreLine(tracks);
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
            Actions.addAlbumToContent(tracks);
        });
    }

    /** Get one album */
    #getAlbum(id: string) {
        getAlbumById(id).then((message) => Actions.addOneAlbum(message));
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
            this.jsEmit(EventTypes.LIKED_TRACK, message);
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
                    Actions.addFavoriteContent(tracks, instancesNames.FAVORITE_TRACKS_PAGE);
                    Actions.addFavoriteContent(tracks, instancesNames.LIKED_SONGS);
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
            Actions.addFavoriteContent(albums, instancesNames.FAVORITE_ALBUMS_PAGE);
        });
    }

    /**
     * Function to get favorite artists by user id
     * @param userId
     */
    private userFavoriteArtistsRequest(userId: string) {
        userFavoriteArtistsAjax(userId).then((artists) => {
            Actions.addFavoriteContent(artists, instancesNames.FAVORITE_ARTISTS_PAGE);
        });
    }

    /**
     * Function to get favorite artists by user id
     * @param userId
     */
    private userFavoritePlaylistsRequest(userId: string) {
        userFavoritePlaylistsAjax(userId).then((playlists) => {
            Actions.addFavoriteContent(playlists, instancesNames.FAVORITE_PLAYLISTS_PAGE);
        });
    }

    /**
     * Function to get user playlists by user id
     * @param userId
     */
    private userPlaylistsRequest(userId: string) {
        userPlaylistsAjax(userId).then((playlists) => {
            Actions.addFavoriteContent(playlists, instancesNames.USER_PLAYLISTS_PAGE);
        });
    }

    /** Search for track with value */
    private searchForTracksWithName(value) {
        search(apiUrl.TRACK_SEARCH_API, value).then((tracks) => {
            ActionsSearch.gotTracks(tracks);
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
