import { componentsNames } from '@config/componentsNames';
import { EventTypes } from '@config/EventTypes';
import { pageNames } from '@config/pageNames';
import { ISetupAlbumConfg, setupLineList } from '@setup/albumSetup';
import { imgPath } from '@config/pathConfig';
import PlayerActions from '@Actions/PlayerActions';
import SongStore from '@store/SongStore';
import Actions from '@actions/Actions';
import ContentStore from '@store/ContentStore';
import { BaseComponent } from '@components/BaseComponent';
import Router from '@router/Router';
import { LineList } from '@bigComponents/LineList/lineList';
import { instancesNames } from '@config/instances';
import TrackActions from '@API/TrackActions';

import { Notification, TypeOfNotification } from '@smallComponents/notification/notification';
import API from '@store/API';
import tmp from './track.handlebars';
import headerTemplate from './headerTrack.handlebars';

/** Class for Album */
export class Track extends BaseComponent {
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
        super(parent, config, tmp, componentsNames.TRACK);
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
                componentsNames.TRACK_LINE_LIST,
            );

            line.appendElement();
        });
    }

    /**
     * Function to subscribe to all events from Stores
     */
    private addSubscribes() {
        API.subscribe(
            (message) => {
                if (message === 'OK') {
                    const like: HTMLImageElement|null = document.querySelector('.albumLike');
                    if (!like) {
                        return;
                    }
                    like.src = imgPath.liked;
                }
            },
            EventTypes.LIKED_TRACK,
            this.name,
        );

        API.subscribe(
            (message) => {
                if (message === 'OK') {
                    const like: HTMLImageElement|null = document.querySelector('.albumLike');
                    if (!like) {
                        return;
                    }
                    like.src = imgPath.notLiked;
                }
            },
            EventTypes.UNLIKED_TRACK,
            this.name,
        );

        ContentStore.subscribe(
            () => {
                const { id } = ContentStore.state[pageNames.TRACK];
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
                    const state = ContentStore.state.TRACK;
                    if (state.isLiked) {
                        imgLike.src = imgPath.notLiked;
                        TrackActions.likeTrack(this.#id);
                    } else {
                        imgLike.src = imgPath.liked;
                        TrackActions.unlikeTrack(this.#id);
                    }
                    state.isLiked = !state.isLiked;
                });

                button.addEventListener('click', () => {
                    this.firstPlay = true;
                    if (!this.#isAlbumLoaded) {
                        this.#isAlbumLoaded = true;
                        PlayerActions.apiPlayTrack([ContentStore.state[pageNames.TRACK].track]);
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
                                document.querySelector('.js__navbar'),
                                'Track link saved to clipboard!',
                            );
                            notification.appendElement();
                        })
                        .catch((error) => {
                            const notification = new Notification(
                                document.querySelector('.js__navbar'),
                                'Track link haven\'t been saved to clipboard!',
                                'notify',
                                TypeOfNotification.failure,
                            );
                            notification.appendElement();
                            console.error(`Error in copy to clipboard: ${error}`);
                        });
                });

                if (id !== undefined) {
                    TrackActions.getTrack(id);
                }
            },
            EventTypes.ID_CAN_BE_VIEWED,
            this.name,
        );

        ContentStore.subscribe(
            (instance) => {
                if (instance === 'track') {
                    const { track } = ContentStore.state[pageNames.TRACK];
                    const artistsText = track.artists.reduce((acc, { name }) => {
                        acc.push(name);
                        return acc;
                    }, []).join(' ');

                    const placement = document.querySelector('.album__descriptions');
                    if (!placement) {
                        console.error('Error at track. Cannot find placement for description');
                        return;
                    }

                    this.config.imgSrc = `/static/img${track.cover}`;
                    this.config.headerNameOfElement = track.name;
                    this.config.ArtistName = artistsText;
                    placement.innerHTML = headerTemplate();
                    placement.innerHTML = headerTemplate(this.config);
                    const artistItem = document.querySelector('.js__author');
                    if (!artistItem) {
                        console.error('Error at track. Can\'t add listener');
                        return;
                    }
                    artistItem.addEventListener('click', () => {
                        Router.go(`/${instancesNames.ARTIST_PAGE}/${track.id}`);
                    });

                    const imgLike = document.querySelector('.albumLike');

                    if (!imgLike || !(imgLike instanceof HTMLImageElement)) {
                        console.error('Error at track. Doesnt have header');
                        return;
                    }

                    imgLike.src = track.isLiked ? imgPath.liked : imgPath.notLiked;
                    document.title = track.name;

                    this.#lineConfigs.push(setupLineList([track]));
                    this.#renderLines();
                }
            },
            EventTypes.GOT_TRACK,
            this.name,
        );

        SongStore.subscribe(
            this.changeStatePlayer.bind(this),
            EventTypes.CHANGE_PLAY_STATE,
            this.name,
        );
    }

    /** Change state of Play button on track */
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
        console.log(this.config);
        super.appendElement();
        this.addSubscribes();
        Actions.checkID(pageNames.TRACK);
    }
}
