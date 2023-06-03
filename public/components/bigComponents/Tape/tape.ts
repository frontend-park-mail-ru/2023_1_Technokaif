import './tape.less';
import { instancesNames } from '@config/instances';
import { TapeSetup } from '@setup/artistSetup';
import { METHOD } from '@config/config';
import { EventTypes } from '@config/EventTypes';
import { imgPath } from '@config/pathConfig';
import PlayerActions from '@Actions/PlayerActions';
import SongStore from '@store/SongStore';
import Router from '@router/Router';
import { BaseComponent } from '@components/BaseComponent';
import { checkAuth } from '@functions/checkAuth';
import { Cover } from '@smallComponents/Cover/cover';
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
     * Array of all tracks
     */
    private allTracks;

    /**
     * Function for events on show
     * @private
     */
    private showButtonCallback;

    /**
     * Function for events on hide
     * @private
     */
    private hideButtonCallback;

    /**
     * Function for main action of tape
     * @private
     */
    private mainActionCallback;

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
        this.allTracks = config.content;
        this.#name = name;

        this.mainActionCallback = (event) => {
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
                            Router.goToLogin();
                            return;
                        }

                        if (event.target.classList.contains('play')) {
                            PlayerActions.changePlayState(false);
                            event.target.classList.remove('play');
                        } else {
                            if (SongStore.artistsInfo?.find((artist) => Number(id) === artist.id)) {
                                PlayerActions.changePlayState(true);
                            } else {
                                PlayerActions.playArtist(id);
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
                            Router.goToLogin();
                            return;
                        }

                        if (event.target.classList.contains('play')) {
                            PlayerActions.changePlayState(false);
                            event.target.classList.remove('play');
                        } else {
                            if (SongStore.trackInfo.id === Number(id)) {
                                PlayerActions.changePlayState(true);
                            } else {
                                PlayerActions.playTrack([id]);
                            }
                            event.target.classList.add('play');
                        }
                    } else {
                        Router.go(`/${instancesNames.TRACK_PAGE}/${id}`);
                    }
                    break;
                case 'Albums':
                    if (isPlayPressed) {
                        if (!checkAuth()) {
                            Router.goToLogin();
                            return;
                        }

                        if (event.target.classList.contains('play')) {
                            PlayerActions.changePlayState(false);
                            event.target.classList.remove('play');
                        } else {
                            if (SongStore.albumInfo === Number(id)) {
                                PlayerActions.changePlayState(true);
                            } else {
                                PlayerActions.playAlbum(id);
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
                            Router.goToLogin();
                            return;
                        }

                        if (event.target.classList.contains('play')) {
                            PlayerActions.changePlayState(false);
                            event.target.classList.remove('play');
                        } else {
                            if (SongStore.albumInfo === Number(id)) {
                                PlayerActions.changePlayState(true);
                            } else {
                                PlayerActions.playPlaylist(id);
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
        };

        this.showButtonCallback = (event) => {
            const showButton = event.target.closest('.tape__show-text');
            const tape = this.#parent.querySelector(`.tape__${this.#name}`);
            if (!tape) {
                console.error('Tape doesn\'t exist:', this.#name);
                return;
            }
            this.renderMoreCovers();

            const hideElement: HTMLDivElement|null = tape.querySelector('.tape__hide-placement');
            if (!hideElement) {
                console.error('Tape hide placement doesn\'t exist:', this.#name);
                return;
            }

            hideElement.hidden = false;
            showButton.hidden = true;
            hideElement.classList.remove('hidden-class');
            showButton.classList.add('hidden-class');
            hideElement.classList.add('hidden-with-padding');
        };

        this.hideButtonCallback = (event) => {
            const hideButton = event.target.closest('.tape__hide-placement');
            const tape = this.#parent.querySelector(`.tape__${this.#name}`);
            if (!tape) {
                console.error('Tape doesn\'t exist:', this.#name);
                return;
            }

            this.renderLessCovers();
            const showElement: HTMLDivElement|null = tape.querySelector('.tape__show-text');
            if (!showElement) {
                console.error('Tape hide placement doesn\'t exist:', this.#name);
                return;
            }

            showElement.hidden = false;
            hideButton.hidden = true;
            hideButton.classList.add('hidden-class');
            showElement.classList.remove('hidden-class');
            hideButton.classList.remove('hidden-with-padding');
        };
    }

    /**
     * Render more components
     * @private
     */
    private renderMoreCovers() {
        this.setItemsCount(this.allTracks.length);
        const tape = this.#parent.querySelector(`.tape__${this.#name}`);
        if (!tape) {
            console.error('Tape doesn\'t exist:', this.#name);
            return;
        }

        const componentsPlacement: HTMLDivElement|null = tape.querySelector(`.${this.#config.contentDivClass}`);
        if (!componentsPlacement) {
            console.error('Tape covers don\'t exist:', this.#name);
            return;
        }

        this.#config.content.forEach((track, index) => {
            if (index >= 5) {
                new Cover(componentsPlacement, {
                    item: track,
                    titleText: this.#name,
                    tapeDiv: 'tape',
                    titleMainDivClass: 'tape__title',
                    titleOfTrackClass: '',
                    fullListClass: 'tape__show-text',
                    fullListText: 'Show all',
                    hideClass: 'tape__hide-placement',
                    hideText: 'Hide',
                    contentDivClass: 'tape__components',
                    coverMainClass: 'component',
                    imgDiv: 'component__img-div',
                    imgClass: 'component__img',
                    titleTextDiv: 'component__title',
                    descriptionDiv: 'component__description',
                    artistsDiv: 'component__artists',
                    footerMainDiv: '',
                    footerElementDiv: 'component__description',
                    footerElements: 'artists',
                    defaultSrc: imgPath.defaultAlbum,
                    buttonDiv: 'buttonPlayOnComponent',
                    buttonSrc: imgPath.playInArtist,
                    buttonClass: 'buttonComponent',
                }).appendElement();
            }
        });

        this.#addEventListeners();
        this.#subscribe();
    }

    /**
     * Render less components
     * @private
     */
    private renderLessCovers() {
        this.setItemsCount();

        const tape = this.#parent.querySelector(`.tape__${this.#name}`);
        if (!tape) {
            console.error('Tape doesn\'t exist:', this.#name);
            return;
        }

        const components: NodeListOf<HTMLDivElement>|null = tape.querySelectorAll(`.${this.#config.coverMainClass}`);
        if (!components) {
            console.error('Tape covers don\'t exist:', this.#name);
            return;
        }

        Array.from(components).forEach((component, index) => {
            if (index >= 5) {
                component.remove();
            }
        });
    }

    /** Add events to Elements of tape */
    #addEventListeners() {
        const tapeTrigger = this.#parent.querySelector(`.tape__${this.#name}`);
        if (!tapeTrigger) {
            console.error('Tape doesn\'t exist:', this.#name);
            return;
        }

        tapeTrigger.removeEventListener(METHOD.BUTTON, this.mainActionCallback);
        tapeTrigger.addEventListener(METHOD.BUTTON, this.mainActionCallback);

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

        const showElement: HTMLDivElement|null = tapeTrigger.querySelector('.tape__show-text');
        const hideElement: HTMLDivElement|null = tapeTrigger.querySelector('.tape__hide-placement');
        if (!showElement || !hideElement) {
            console.error('Show element not found');
            return;
        }

        if (this.#config.content.length > 4) {
            showElement.removeEventListener('click', this.showButtonCallback);
            showElement.addEventListener('click', this.showButtonCallback);

            hideElement.removeEventListener('click', this.hideButtonCallback);
            hideElement.addEventListener('click', this.hideButtonCallback);

            hideElement.hidden = true;
        } else {
            showElement.hidden = true;
        }
    }

    /** Subscribe to stores */
    #subscribe() {
        SongStore.subscribe(
            (state) => {
                const covers: NodeListOf<HTMLDivElement>|null = document.querySelectorAll(`.component__${this.#name}`);
                if (!covers) {
                    console.error('Error at covers');
                    return;
                }

                let idArray:number[];
                const artists = SongStore.artistsInfo;

                switch (this.#name) {
                case 'Artists':
                    if (!artists) {
                        console.warn('Artist doesn\'t exist');
                        return;
                    }

                    {
                        const artistID: number[] = [];
                        artists.forEach((el) => artistID.push(el.id));
                        idArray = artistID;
                    }
                    break;
                case 'Tracks':
                    {
                        const trackId = SongStore.trackInfo.id;
                        const arrTr = [];
                        arrTr.push((trackId as never));
                        idArray = arrTr;
                    }

                    break;
                case 'Albums':
                    {
                        let albumId = SongStore.albumInfo;
                        if (!albumId) {
                            console.warn('Albums doesn\'t exist');
                            albumId = '-1';
                        }
                        const arrAlb = [];
                        arrAlb.push((albumId as never));
                        idArray = arrAlb;
                    }
                    break;
                case 'Playlists':
                    {
                        let playlistId = SongStore.playlist;
                        if (!playlistId) {
                            console.warn('Playlist doesn\'t exist');
                            playlistId = -1;
                        }
                        const arrPlaylist = [];
                        arrPlaylist.push((playlistId as never));
                        idArray = arrPlaylist;
                    }
                    break;
                default:
                    return;
                }

                for (const cover of covers) {
                    if (!cover) {
                        console.error('Error at find covers');
                        return;
                    }

                    const button: HTMLImageElement|null = cover.querySelector('.buttonComponent');
                    if (button) {
                        // @ts-ignore
                        const idOnElement = cover.dataset?.id;
                        if (!idOnElement) {
                            console.warn('Id doesn\'t exist');
                            return;
                        }

                        if (idArray.includes(Number(idOnElement))
                        && state) {
                            button.src = imgPath.stopInArtist;
                        } else {
                            button.src = imgPath.playInArtist;
                        }
                    }
                }
            },
            EventTypes.CHANGE_PLAY_STATE,
            this.#name,
        );
    }

    /**
     * Function to set items count to 5 (our personal value)
     * @private
     */
    private setItemsCount(count = 5) {
        this.config.content = this.allTracks
            .slice(0, count);
    }

    /** Append element to parent */
    public override appendElement() {
        this.setItemsCount();
        super.appendElement();
        this.#addEventListeners();
        this.#subscribe();
    }
}
