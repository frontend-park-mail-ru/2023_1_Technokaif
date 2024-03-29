import './album.less';
import { componentsNames } from '@config/componentsNames';
import { EventTypes } from '@config/EventTypes';
import { pageNames } from '@config/pageNames';
import { ISetupAlbumConfg, setupLineList } from '@setup/albumSetup';
import { imgPath } from '@config/pathConfig';
// eslint-disable-next-line import/namespace
import AlbumActions from '@API/AlbumActions';
import PlayerActions from '@Actions/PlayerActions';
import SongStore from '@store/SongStore';
import Actions from '@actions/Actions';
import ContentStore from '@store/ContentStore';
import { BaseComponent } from '@components/BaseComponent';
import Router from '@router/Router';
import { LineList } from '@bigComponents/LineList/lineList';
import { instancesNames } from '@config/instances';
import { Notification, TypeOfNotification } from '@smallComponents/notification/notification';
import { checkAuth } from '@functions/checkAuth';
import tmp from './album.handlebars';
import headerTemplate from './headerAlbum.handlebars';

/** Class for Album */
export class Album extends BaseComponent {
    /** Flag if album was loaded */
    #isAlbumLoaded;

    /**
     * Config to use in handlebars setup of track lines
     */
    #lineConfigs;

    /**
     * If button in play mode
     */
    public isPlaying;

    /**
     * Play button
     */
    playButton;

    /** If first play */
    private firstPlay;

    /** id of Album */
    #id;

    /**
     * Create Album. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Album
     * @param {{json}} config
     */
    constructor(parent, config: ISetupAlbumConfg) {
        super(parent, config, tmp, componentsNames.ALBUM);
        this.#lineConfigs = [];
        this.isPlaying = SongStore.isPlaying;
        this.#isAlbumLoaded = false;
        this.firstPlay = false;
    }

    /**
     * Function to render track lines by input configs.
     */
    #renderLines() {
        const linesPlacement = document.querySelector('.js__placement-tracks');
        this.#lineConfigs.forEach((configForInsertElement) => {
            const line = new LineList(
                linesPlacement,
                configForInsertElement,
                componentsNames.ALBUM_LINE_LIST,
            );

            line.appendElement();
        });
    }

    /**
     * Function to subscribe to all events from Stores
     */
    private addSubscribes() {
        ContentStore.subscribe(
            () => {
                const { id } = ContentStore.state[pageNames.ALBUM];
                this.#id = id;
                const button = document.querySelector('.js__button__play');
                const imgLike = document.querySelector('.albumLike');

                if (!imgLike || !(imgLike instanceof HTMLImageElement)) {
                    console.warn('Img doesn\'t exist in album');
                    return;
                }
                if (!button) {
                    console.warn('Button doesn\'t\'exist on Album');
                    return;
                }
                this.playButton = button;

                imgLike.addEventListener('click', () => {
                    if (!checkAuth()) {
                        Router.goToLogin();
                        return;
                    }

                    const state = ContentStore.state.ALBUM;
                    if (state.isLiked) {
                        imgLike.src = imgPath.notLiked;
                        AlbumActions.unLikeAlbum(this.#id);
                    } else {
                        imgLike.src = imgPath.liked;
                        AlbumActions.likeAlbum(this.#id);
                    }
                    state.isLiked = !state.isLiked;
                });

                button.addEventListener('click', () => {
                    if (!checkAuth()) {
                        Router.goToLogin();
                        return;
                    }

                    this.firstPlay = true;
                    if (!this.#isAlbumLoaded) {
                        this.#isAlbumLoaded = true;
                        PlayerActions.playAlbum(id);
                    }

                    PlayerActions.changePlayState(!SongStore.isPlaying);
                });

                const share: HTMLImageElement|null = document.querySelector('.shareButton');
                if (!share) {
                    console.error('Button share are not exist');
                    return;
                }

                share.addEventListener('click', () => {
                    navigator.clipboard.writeText(window.location.href)
                        .then(() => {
                            const notification = new Notification(
                                document.querySelector('.notification__placement'),
                                'Album link saved to clipboard!',
                            );
                            notification.appendElement();
                        })
                        .catch((error) => {
                            const notification = new Notification(
                                document.querySelector('.notification__placement'),
                                'Album link haven\'t been saved to clipboard!',
                                'notify',
                                TypeOfNotification.failure,
                            );
                            notification.appendElement();
                            console.error(`Error in copy to clipboard: ${error}`);
                        });
                });

                if (id !== undefined) {
                    AlbumActions.getAlbum(id);
                }
            },
            EventTypes.ID_CAN_BE_VIEWED,
            this.name,
        );

        ContentStore.subscribe(
            (instance) => {
                if (instance === 'tracks') {
                    const { tracks } = ContentStore.state[pageNames.ALBUM];
                    this.#lineConfigs.push(setupLineList(tracks));
                    this.#renderLines();
                }
            },
            EventTypes.ALBUM_CONTENT_DONE,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                const state = ContentStore.state.ALBUM;

                const artistsText = state.artists.reduce((acc, { id, name }) => {
                    acc.push(`<span data-id="${id}">${name}</span>`);
                    return acc;
                }, []).join(', ');

                const placement = document.querySelector('.album__descriptions');
                if (!placement) {
                    console.warn('Error at album. Cannot find placement for description');
                    return;
                }

                this.config.imgSrc = `/static/img${state.cover}`;
                this.config.headerNameOfElement = state.name;
                this.config.ArtistName = artistsText;
                this.config.Descriptions = state.description;
                placement.innerHTML = headerTemplate(this.config);

                const artistsElement: HTMLParagraphElement|null = this.parent.querySelector('.js__author');
                if (!artistsElement) {
                    console.error('Bad in track artists');
                    return;
                }

                artistsElement.innerHTML = artistsText;
                const spansInArtists: NodeListOf<HTMLSpanElement>|null = artistsElement.querySelectorAll('span');
                if (!spansInArtists) {
                    console.error('Bad in track artists');
                    return;
                }

                spansInArtists.forEach((spanElement: HTMLSpanElement) => {
                    spanElement.addEventListener('click', () => {
                        // @ts-ignore
                        const artistId: string|undefined = spanElement.dataset?.id;
                        if (artistId) {
                            Router.go(`/${instancesNames.ARTIST_PAGE}/${artistId}`);
                        }
                    });
                });
                const imgLike = document.querySelector('.albumLike');

                if (!imgLike || !(imgLike instanceof HTMLImageElement)) {
                    console.warn('Error at album. Doesnt have header');
                    return;
                }

                imgLike.src = state.isLiked ? imgPath.liked : imgPath.notLiked;
                document.title = state.name;
            },
            EventTypes.GOT_ONE_ALBUM,
            this.name,
        );

        SongStore.subscribe(
            this.changeStatePlayer.bind(this),
            EventTypes.CHANGE_PLAY_STATE,
            componentsNames.ALBUM,
        );
    }

    /** Change state of Play button */
    changeStatePlayer(newState) {
        if (this.firstPlay && newState) {
            this.firstPlay = true;
            this.playButton.src = imgPath.pauseAlbum;
        }

        if (this.firstPlay && !newState) {
            this.isPlaying = false;
            this.playButton.src = imgPath.playAlbum;
        }
    }

    /**
     * @description render MainWindowContent in parent
     */
    override render() {
        super.appendElement();
        this.addSubscribes();
        Actions.checkID(pageNames.ALBUM);
    }
}
