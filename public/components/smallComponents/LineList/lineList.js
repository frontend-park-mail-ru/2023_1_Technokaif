import templateHTML from './lineList.handlebars';
import { BaseComponent } from '../../BaseComponent';
import './lineList.less';
import '../Line/line.less';
import { componentsNames } from '../../../utils/config/componentsNames';
import Actions from '../../../actions/Actions';
import ContentStore from '../../../stores/ContentStore';
import { pageNames } from '../../../utils/config/pageNames';
import { checkAuth } from '../../../utils/functions/checkAuth';
import Router from '../../../router/Router';
import SongStore from '../../../stores/SongStore';
import ApiActions from '../../../actions/ApiActions';
import { EventTypes } from '../../../utils/config/EventTypes';

/**
 * Tape for elements
 */
export class LineList extends BaseComponent {
    #name;

    #parent;

    #config;

    /**
     * Create LineList component. Empty innerHtml before placement
     * @param {Element} parent -- where to place Track
     * @param {object} config -- what config use to compile template
     * @param name
     */
    constructor(parent, config, name) {
        super(parent, config, templateHTML);
        this.#parent = parent;
        this.#config = config;
        this.#name = name;
        this.#addListeners();
    }

    /**
     * Function to add click event on tape
     */
    #addListeners() {
        this.#parent.addEventListener('click', (event) => {
            const line = event.target.closest(`.${this.#config.lineDiv}`);
            const like = event.target.closest(`.${this.#config.likeButtonImg}`);
            const buttons = event.target.closest(`.${this.#config.playButtonImg}`);
            const playButtons = document.querySelectorAll(`.${this.#config.playButton}`);

            if (line) {
                if (event.target !== buttons && event.target !== like) {
                    return;
                }

                if (checkAuth() !== true) {
                    Router.go('/login');
                    return;
                }

                const id = +line.querySelector('.track-line__index').innerText;
                const trackId = line.dataset.id;
                if (event.target === buttons) {
                    if (!playButtons[id - 1].hidden) {
                        // eslint-disable-next-line max-len
                        if (SongStore.exist && SongStore.trackInfo.id === +trackId) {
                            Actions.changePlayState(true);
                        } else {
                            switch (this.#name) {
                            case componentsNames.ARTIST_LINE_LIST:
                                // eslint-disable-next-line max-len
                                Actions.playArtistWithOffset(ContentStore.state[pageNames.ARTIST_PAGE].id, id - 1);
                                break;
                            case componentsNames.ALBUM_LINE_LIST:
                                // eslint-disable-next-line max-len
                                Actions.playAlbumWithOffset(ContentStore.state[pageNames.ALBUM].id, id - 1);
                                break;
                            default:
                            }
                        }
                    } else {
                        Actions.changePlayState(false);
                    }
                } else if (event.target === like) {
                    const likeBlock = document.querySelectorAll('.like-button');
                    const unlike = document.querySelectorAll('.unlike-button');
                    if (!likeBlock[id - 1].hidden) {
                        ApiActions.likeTrack(trackId);
                        likeBlock[id - 1].hidden = true;
                        unlike[id - 1].hidden = false;
                    } else {
                        ApiActions.unlikeTrack(trackId);
                        likeBlock[id - 1].hidden = false;
                        unlike[id - 1].hidden = true;
                    }
                }
            }
        });

        SongStore.subscribe(
            (state) => {
                const playButtons = document.querySelectorAll('.play-button-track');
                const stopButtons = document.querySelectorAll('.stop-button-track');
                const lines = document.querySelectorAll('.track-line');
                const trackId = SongStore.trackInfo.id;
                for (const key in lines) {
                    if (key === 'entries') break;
                    if (+lines[key].dataset.id === trackId && state === true) {
                        playButtons[+key].hidden = true;
                        stopButtons[+key].hidden = false;
                    } else {
                        playButtons[+key].hidden = false;
                        stopButtons[+key].hidden = true;
                    }
                }
            },
            EventTypes.CHANGE_PLAY_STATE,
            this.name,
        );
    }
}
