import { definitions } from '../../schema';

export type ArtistApi = definitions['models.ArtistTransfer'];
export type ArtistsApi = ArtistApi[];

export type AlbumApi = definitions['models.AlbumTransfer'];
export type PlaylistApi = definitions['models.PlaylistTransfer'];

export type TrackApi = definitions['models.TrackTransfer'];
export type TracksApi = {
    tracks: TrackApi[]
}

export declare interface csrfResponse {
    csrf: string,
}

export declare interface loginResponse {
    id: string,
}
