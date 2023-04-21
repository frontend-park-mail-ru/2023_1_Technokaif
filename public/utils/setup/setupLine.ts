/**
 * Return line config with track in it
 * @param {JSON} track
 */
export function setupLine(track, position) {
    return {
        id: track.id,
        positionTrack: position,
        lineDiv: 'track',
        likedDiv: 'track__liked-img',
        imgLike: 'imgLike',
        lineIndex: 'track__index',
        lineBlock: 'track__img-block',
        cover: track.cover,
        isLiked: track.isLiked,
        lineTitle: 'track__title',
        name: track.name,
        lineListens: 'track__listens',
        listens: track.listens,
        lineDuration: '',
        duration: '',
    };
}
