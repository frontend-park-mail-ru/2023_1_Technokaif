import { TracksApi } from '@api/ApiAnswers';

/** Shuffle songs and move song in position to 0 position */
export function shuffle(position: number, songs: TracksApi) {
    const saveSong = songs[position];
    if (!Array.isArray(songs)) return;

    const songsWithoutPosition: TracksApi[] = Array.from(songs)
        .filter((el) => el.id !== saveSong?.id);

    for (let i = songsWithoutPosition.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        if (songsWithoutPosition[i] && songsWithoutPosition[j]) {
            // We are using "ts ignore" here because
            // we checked value before and can say that it exists.
            // @ts-ignore
            // eslint-disable-next-line max-len
            [songsWithoutPosition[i], songsWithoutPosition[j]] = [songsWithoutPosition[j], songsWithoutPosition[i]];
        }
    }

    return [saveSong].concat(songsWithoutPosition);
}
