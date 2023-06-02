/** All variants of playlist */
export const TypeOfPlaylist = {
    playlist: 'playlist',
    favoriteTracks: 'favoriteTracks',
};

/** Return HTMLElement for playlist */
function createPlaylistError() {
    const warningPlace = document.createElement('div');
    warningPlace.classList.add('warning-placement');

    const boldText = document.createElement('p');
    boldText.classList.add('usualText');
    boldText.innerText = 'No tracks added to playlist';
    warningPlace.appendChild(boldText);
    warningPlace.style.paddingTop = '0.5rem';

    return warningPlace;
}

/** Return HTMLElement for playlist */
function createErrorForFavoriteTracks() {
    const warningPlace = document.createElement('div');
    warningPlace.classList.add('warning-placement');

    const boldText = document.createElement('p');
    boldText.classList.add('usualText');
    boldText.innerText = 'No tracks added to playlist';
    warningPlace.appendChild(boldText);
    warningPlace.style.paddingTop = '0.5rem';

    return warningPlace;
}

/** Return HTMLElement to place. Default type is playlist */
export function createErrorForPlaylist(typeOfPlaylist = TypeOfPlaylist.playlist) {
    switch (typeOfPlaylist) {
    case TypeOfPlaylist.playlist:
        return createPlaylistError();
    case TypeOfPlaylist.favoriteTracks:
        return createErrorForFavoriteTracks();
    default:
        console.error('Create error type not in TypeOfPlaylist:', typeOfPlaylist);
        return document.createElement('div');
    }
}
