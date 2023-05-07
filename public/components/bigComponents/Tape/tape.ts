import './tape.less';
import { instancesNames } from '@config/instances';
import { checkAuth } from '@functions/checkAuth';
import { TapeSetup } from '@setup/artistSetup';
import { METHOD } from '@config/config';
import { EventTypes } from '@config/EventTypes';
import { imgPath } from '@config/pathConfig';
import SongStore from '../../../stores/SongStore';
import Actions from '../../../actions/Actions';
import Router from '../../../router/Router';
import { BaseComponent } from '../../BaseComponent';
import template from './tape.handlebars';

/** Tape for elements */
export class Tape extends BaseComponent {
    /** Name of component */
    #name;

    /** Parent where render component */
    #parent;

    /** Config of component */
    #config;

    /**
     * Create Track component. Empty innerHtml before placement
     * @param {Element} parent -- where to place Track
     * @param {object} config -- what config use to compile template
     * @param name
     */
    constructor(parent: HTMLElement, config: TapeSetup, name:string) {
        super(parent, config, template);
        this.#parent = parent;
        this.#config = config;
        this.#name = name;
    }

    /** Add events to Elements of tape */
    #addEventListeners() {
        const tapeTrigger = this.#parent.querySelector(`.tape__${this.#name}`);
        if (!tapeTrigger) {
            console.error('Tape doesn\'t exist:', this.#name);
            return;
        }

        tapeTrigger.addEventListener(METHOD.BUTTON, (event) => {
            event.preventDefault();
            // // todo think about checker for existence
            if (!document.querySelector(`.component__${this.#name}`)) {
                return;
            }
            let isPlayPressed = false;
            if (event.target.classList.contains('buttonComponent')) {
                isPlayPressed = true;
            }

            const tape = event.target.closest(`.component__${this.#name}`);
            if (tape) {
                const id = tape.getAttribute('data-id');
                switch (this.#name) {
                case 'Artists':
                    if (isPlayPressed) {
                        if (!checkAuth()) {
                            Router.go('/login');
                            return;
                        }
                        if (event.target.classList.contains('play')) {
                            PlayerActions.changePlayState(false);
                            event.target.classList.remove('play');
                        } else {
                            if (SongStore.artistsInfo.find((artist) => Number(id) === artist.id)) {
                                PlayerActions.changePlayState(true);
                            } else {
                                Actions.playArtist(id);
                            }
                            event.target.classList.add('play');
                        }
                    } else {
                        Router.go(`/${instancesNames.ARTIST_PAGE}/${id}`);
                    }
                    break;
                case 'Tracks':
                    if (isPlayPressed) {
                        if (!checkAuth()) {
                            Router.go('/login');
                            return;
                        }

                        if (event.target.classList.contains('play')) {
                            PlayerActions.changePlayState(false);
                            event.target.classList.remove('play');
                        } else {
                            if (SongStore.trackInfo.id === Number(id)) {
                                PlayerActions.changePlayState(true);
                            } else {
                                Actions.playTrack(id);
                            }
                            event.target.classList.add('play');
                        }
                    }
                    break;
                case 'Albums':
                    if (isPlayPressed) {
                        if (!checkAuth()) {
                            Router.go('/login');
                            return;
                        }

                        if (event.target.classList.contains('play')) {
                            PlayerActions.changePlayState(false);
                            event.target.classList.remove('play');
                        } else {
                            if (SongStore.albumInfo === Number(id)) {
                                PlayerActions.changePlayState(true);
                            } else {
                                Actions.playAlbum(id);
                            }
                            event.target.classList.add('play');
                        }
                    } else {
                        Router.go(`/${instancesNames.ALBUM_PAGE}/${id}`);
                    }
                    break;
                case 'Playlists':
                    if (isPlayPressed) {
                        if (!checkAuth()) {
                            Router.go('/login');
                            return;
                        }

                        if (event.target.classList.contains('play')) {
                            PlayerActions.changePlayState(false);
                            event.target.classList.remove('play');
                        } else {
                            if (SongStore.albumInfo === Number(id)) {
                                PlayerActions.changePlayState(true);
                            } else {
                                Actions.playPlaylistWithOffset(id, 0);
                            }
                            event.target.classList.add('play');
                        }
                    } else {
                        Router.go(`/${instancesNames.PLAYLIST_PAGE}/${id}`);
                    }
                    break;
                default:
                }
            }
        });

        const components = tapeTrigger.querySelectorAll(`.component__${this.#config.titleText}`);
        components.forEach((element) => {
            const id = element.getAttribute('data-id');
            if (!id) {
                return;
            }
            const button = element.querySelector(`.js__button__${this.#config.titleText}-${id}`);
            button.style.display = 'none';
            element.addEventListener(METHOD.ON_ELEMENT, () => {
                button.style.display = 'block';
            });

            element.addEventListener(METHOD.OUT_OF_ELEMENT, () => {
                button.style.display = 'none';
            });
        });
    }

    /** Subscribe to stores */
    #subscribe() {
        SongStore.subscribe(
            (state) => {
                const covers = document.querySelectorAll(`.component__${this.#name}`);
                if (!covers) {
                    console.error('Error at covers');
                    return;
                }
                let idArray:number[];
                switch (this.#name) {
                case 'Artists':
                    const artists = SongStore.artistsInfo;
                    if (!artists) {
                        console.warn('Artist doesn\'t exist');
                        return;
                    }
                    const artistID: number[] = [];
                    artists.forEach((el) => artistID.push(el.id));
                    idArray = artistID;
                    break;
                case 'Tracks':
                    const trackId = SongStore.trackInfo.id;
                    const arrTr = [];
                    arrTr.push((trackId as never));
                    idArray = arrTr;
                    break;
                case 'Albums':
                    let albumId = SongStore.albumInfo;
                    if (!albumId) {
                        console.warn('Albums doesn\'t exist');
                        albumId = '-1';
                        // return;
                    }
                    const arrAlb = [];
                    arrAlb.push((albumId as never));
                    idArray = arrAlb;
                    break;
                case 'Playlists':
                    let playlistId = SongStore.playlist;
                    if (!playlistId) {
                        console.warn('Playlist doesn\'t exist');
                        playlistId = -1;
                        // return;
                    }
                    const arrPlaylist = [];
                    arrPlaylist.push((playlistId as never));
                    idArray = arrPlaylist;
                    break;
                default:
                    return;
                }

                for (const key in covers) {
                    if (!covers[key]) {
                        console.error('Error at find covers');
                        return;
                    }

                    if (key === 'entries') {
                        return;
                    }
                    const button = (covers[key] as HTMLElement).querySelector('.buttonComponent');
                    if (button) {
                        // @ts-ignore
                        const idOnElement = (covers[key] as HTMLElement).dataset.id;
                        if (!idOnElement) {
                            console.warn('Id doesn\'t exist');
                            return;
                        }

                        if (idArray.includes(Number(idOnElement))
                        && state === true) {
                            (button as HTMLImageElement).src = imgPath.stopInArtist;
                        } else {
                            (button as HTMLImageElement).src = imgPath.playInArtist;
                        }
                    }
                }
            },
            EventTypes.CHANGE_PLAY_STATE,
            this.#name,
        );
    }

    /** Append element to parent */
    public override appendElement() {
        const pr:Promise<void> = new Promise((resolve) => {
            super.appendElement();
            resolve();
        });

        pr.then(() => {
            this.#addEventListeners();
            this.#subscribe();
        });
    }
}
