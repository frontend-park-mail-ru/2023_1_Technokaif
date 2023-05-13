export declare interface SearchRequest{
    'amount': Partial<number>,
    'query'?: string
}

export declare interface BaseApi {
    'cover': string,
    'id': Partial<number>,
    'isLiked': boolean,
    'name': string
}

export declare interface ArtistApi
{
    'artists': [
        {
            BaseApi,
        }
    ]
}

export declare interface AlbumApi
{
    'albums': [
        {
            ArtistApi,
            'description': string,
            BaseApi,
        }
    ]
}

// eslint-disable-next-line no-shadow
export enum sexType {
    'M',
    'F',
    'O',
}
export declare interface PlaylistApi
{
    'playlists': [
        {
            'description': string,
            BaseApi,
            'users': [
                {
                    'avatarSrc': string,
                    'birthDate': {
                        'time.Time': string
                    },
                    'email': string,
                    'firstName': string,
                    'id': Partial<number>,
                    'lastName': string,
                    'sex': sexType,
                    'username': string
                }
            ]
        }
    ]
}

export declare interface TracksApi
{
    'tracks': [
        {
            ArtistApi,
            'albumID': Partial<number>,
            'albumPosition': Partial<number>,
            'cover': string,
            'duration': Partial<number>,
            'id': Partial<number>,
            'isLiked': boolean,
            'listens': Partial<number>,
            'name': string,
            'recordSrc': string
        }
    ]
}

export declare interface csrfResponse {
    csrf: string,
}

export declare interface loginResponse {
    id: string,
}
