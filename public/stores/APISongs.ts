import { artistTracksAjax } from '@api/tracks/artistTracksAjaxRequest';
import { getAlbumTracksFromServer } from '@api/player/album';
import { trackOneAjax } from '@api/player/track';
import { getPlaylistTracks } from '@api/playlists/getTracksAjaxRequest';
import ActionTypes from '@actions/ActionTypes';
import IStore from '@store/IStore';
import PlayerActions from '@Actions/PlayerActions';

declare interface Artist {
    'cover': string,
    'id': number,
    'isLiked': boolean,
    'name': string
}

declare interface ApiTrack {
    'albumID': number,
    'albumPosition': number,
    'artists': Artist[],
    'cover': string,
    'duration': number,
    'id': number,
    'isLiked': boolean,
    'listens': number,
    'name': string,
    'recordSrc': string
}

declare interface ApiTrackWithPlaylistID extends ApiTrack{
    playlistID: number;
}
/**
 * Class using for getting data from backend.
 */
class APISongs extends IStore {
    /**
     * Constructor for api store.
     */
    constructor() {
        super('apiSongs');
    }

    /**
     * Switches over the action's type when an action is dispatched.
     * @param action
     */
    override dispatch(action) {
        switch (action.type) {
        case ActionTypes.PLAY_TRACK_API:
            this.playTrack(action.id, action.offset);
            break;
        case ActionTypes.QUEUE_TRACK_API:
            this.queueTrack(action.idOfTracks);
            break;
        case ActionTypes.PLAY_ALBUM_API:
            this.playAlbum(action.id, action.offset);
            break;
        case ActionTypes.QUEUE_ALBUM_API:
            this.queueAlbum(action.id);
            break;
        case ActionTypes.PLAY_ARTIST_API:
            this.playArtist(action.id, action.offset);
            break;
        case ActionTypes.QUEUE_ARTIST_API:
            this.queueArtist(action.id);
            break;
        case ActionTypes.PLAY_PLAYLIST_API:
            this.playlistPlay(action.playlistId, action.offset);
            break;
        case ActionTypes.QUEUE_PLAYLIST_API:
            this.queuePlay(action.playlistId);
            break;
        default:
        }
    }

    /** Load tracks from server with offset in it */
    private loadTracks(tracksIds: number[]) {
        const promises: Promise<ApiTrack>[] = [];
        tracksIds.forEach((ind) => {
            promises.push(trackOneAjax(String(ind)));
        });

        return Promise.all(promises);
    }

    /** Play track */
    private playTrack(ids: number[], offset = 0) {
        this.loadTracks(ids).then((tracks) => {
            PlayerActions.apiPlayTrack(tracks, offset);
        });
    }

    /** Queue tracks */
    private queueTrack(ids: number[]) {
        const promises: Promise<ApiTrack>[] = [];
        ids.forEach((ind) => {
            promises.push(trackOneAjax(String(ind)));
        });

        Promise.all(promises).then((values:ApiTrack[]) => {
            PlayerActions.apiQueueTracks(values);
        });
    }

    /** Album queue */
    private queueAlbum(id:string) {
        getAlbumTracksFromServer(id).then((tracks:ApiTrack[]) => {
            PlayerActions.apiQueueAlbum(tracks);
        });
    }

    /** Album play */
    private playAlbum(id: string, offset = 0) {
        getAlbumTracksFromServer(id).then((tracks:ApiTrack[]) => {
            PlayerActions.apiPlayAlbum(tracks, offset);
        });
    }

    /** Function to get Artists from server */
    private playArtist(id: string, offset = 0) {
        artistTracksAjax(id).then((tracks:ApiTrack[]) => {
            PlayerActions.apiPlayArtist(tracks, offset);
        });
    }

    /** Function to get Artists from server */
    private queueArtist(id: string) {
        artistTracksAjax(id).then((tracks:ApiTrack[]) => {
            PlayerActions.apiQueueArtist(tracks);
        });
    }

    /** Add playlist tracks to SongStore */
    private playlistPlay(playlistId, offset = 0) {
        getPlaylistTracks(playlistId).then((tracks:ApiTrack[]) => {
            const tracksWithPlaylist = tracks
                .map((track): ApiTrackWithPlaylistID => ({ ...track, playlistID: playlistId }));
            PlayerActions.playPlaylist(tracksWithPlaylist, offset);
        });
    }

    /** Add playlist tracks to SongStore */
    private queuePlay(playlistId) {
        getPlaylistTracks(playlistId).then((tracks:ApiTrack[]) => {
            const tracksWithPlaylist = tracks
                .map((track): ApiTrackWithPlaylistID => ({ ...track, playlistID: playlistId }));
            PlayerActions.queuePlaylist(tracksWithPlaylist);
        });
    }
}

export default new APISongs();
