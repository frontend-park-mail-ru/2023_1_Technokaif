import { imgPath } from '@config/pathConfig';

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

    const warningDiv = document.createElement('div');
    warningDiv.classList.add('empty-warning-artist');

    const textElementBeforeImg = document.createElement('p');
    textElementBeforeImg.innerText = 'To add click';
    textElementBeforeImg.classList.add('smallText');
    warningDiv.appendChild(textElementBeforeImg);

    const imgThreeDots = document.createElement('img');
    imgThreeDots.src = imgPath.ellipseInArtist;
    warningDiv.appendChild(imgThreeDots);

    const textElementAfterImg = document.createElement('p');
    textElementAfterImg.innerText = '--> "Add" and choose playlist';
    textElementAfterImg.classList.add('smallText');
    warningDiv.appendChild(textElementAfterImg);

    warningPlace.appendChild(warningDiv);
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

    const warningDiv = document.createElement('div');
    warningDiv.classList.add('empty-warning-artist');

    const textElement = document.createElement('p');
    textElement.innerText = 'To add click on heart near track';
    textElement.classList.add('smallText');
    textElement.style.paddingTop = '0.2rem';

    warningPlace.appendChild(textElement);
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
