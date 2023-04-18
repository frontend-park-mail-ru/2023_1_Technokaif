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

/**
 * Tape for elements
 */
export class LineList extends BaseComponent {
    #name;

    #parent;

    #config;

    /**
     * Create LineList component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Track
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
            const line = event.target.closest('.track-line');
            const like = event.target.closest('.like-button__img');
            const buttons = event.target.closest('.likeImg');
            const playButtons = document.querySelectorAll('.play-button-track');
            const stopButtons = document.querySelectorAll('.stop-button-track');

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
                    switch (this.#name) {
                    case componentsNames.ARTIST_LINE_LIST:
                        if (!playButtons[id - 1].hidden) {
                            // eslint-disable-next-line max-len
                            if (SongStore.exist && SongStore.trackInfo.id === trackId) {
                                Actions.changePlayState(true);
                            } else {
                                // eslint-disable-next-line max-len
                                Actions.playArtistWithOffset(ContentStore.state[pageNames.ARTIST_PAGE].id, id - 1);
                            }

                            playButtons[id - 1].hidden = true;
                            stopButtons[id - 1].hidden = false;
                        } else {
                            Actions.changePlayState(false);
                            stopButtons[id - 1].hidden = true;
                            playButtons[id - 1].hidden = false;
                        }
                        break;
                    default:
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

        // SongStore.subscribe(
        //     (state) => {
        //         const playButtons = document.querySelectorAll('.play-button-track');
        //         const stopButtons = document.querySelectorAll('.stop-button-track');
        //         const lines = document.querySelectorAll('.track-line');
        // eslint-disable-next-line max-len
        //         const line = lines.find((element) => element.dataset.id === SongStore.trackInfo.id);
        //         const lineIndex = lines.indexOf(line);
        //         if (line === undefined) {
        //             return;
        //         }
        //         if (state) {
        //             playButtons[lineIndex].hidden = true;
        //             stopButtons[lineIndex].hidden = false;
        //         } else {
        //             stopButtons[lineIndex].hidden = true;
        //             playButtons[lineIndex].hidden = false;
        //         }
        //     },
        //     EventTypes.CHANGE_PLAY_STATE,
        //     this.name,
        // );
    }
}
