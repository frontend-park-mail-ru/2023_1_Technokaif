/**
 * Return line config with track in it
 * @param {JSON} track
 */
export function setupLine(track, position) {
    console.log('track', track);
    console.log('pos', position);
    return {
        id: track.id,
        positionTrack: position,
        lineDiv: 'track',
        likedDiv: 'track__liked-img',
        imgLike: 'imgLike',
        lineIndex: 'track__index',
        lineBlock: 'track__img-block',
        cover: track.cover,
        lineTitle: 'track__title',
        name: track.name,
        lineListens: 'track__listens',
        listens: track.listens,
        lineDuration: '',
        duration: '',
    };
}
