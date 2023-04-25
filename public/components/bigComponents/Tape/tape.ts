import './tape.less';
import template from './tape.handlebars';
import { BaseComponent } from '../../BaseComponent';
import Router from '../../../router/Router';
import { instancesNames } from '../../../utils/config/instances';
import { checkAuth } from '../../../utils/functions/checkAuth';
import Actions from '../../../actions/Actions';
import { TapeSetup } from '../../../utils/setup/artistSetup';
import { METHOD } from '../../../utils/config/config';
import SongStore from '../../../stores/SongStore';
import { EventTypes } from '../../../utils/config/EventTypes';
import { imgPath } from '../../../utils/config/pathConfig';

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
        console.log(tapeTrigger);
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
                        if (event.target.classList.contains('play')) {
                            Actions.changePlayState(false);
                            event.target.classList.remove('play');
                        } else {
                            if (SongStore.artistsInfo.find((artist) => Number(id) === artist.id)) {
                                Actions.changePlayState(true);
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
                    if (!checkAuth()) {
                        Router.go('/login');
                        return;
                    }

                    if (isPlayPressed) {
                        if (event.target.classList.contains('play')) {
                            Actions.changePlayState(false);
                            event.target.classList.remove('play');
                        } else {
                            if (SongStore.trackInfo.id === Number(id)) {
                                Actions.changePlayState(true);
                            } else {
                                Actions.playTrack(id);
                            }
                            event.target.classList.add('play');
                        }
                    }
                    break;
                case 'Albums':
                    if (isPlayPressed) {
                        if (event.target.classList.contains('play')) {
                            Actions.changePlayState(false);
                            event.target.classList.remove('play');
                        } else {
                            if (SongStore.albumInfo === Number(id)) {
                                Actions.changePlayState(true);
                            } else {
                                Actions.playAlbum(id);
                            }
                            event.target.classList.add('play');
                        }
                    } else {
                        Router.go(`/${instancesNames.ALBUM_PAGE}/${id}`);
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
            // @ts-ignore
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
                    const albumId = SongStore.albumInfo;
                    if (!albumId) {
                        console.warn('Artist doesn\'t exist');
                        return;
                    }
                    const arrAlb = [];
                    arrAlb.push((albumId as never));
                    idArray = arrAlb;
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
