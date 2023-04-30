import { BaseComponent } from '../../BaseComponent';
import { checkAuth } from '../../../utils/functions/checkAuth';
import { AudioPlayer } from '../player/player';
import { PlayerDummy } from '../playerDummy/playerDummy';
import Actions from '../../../actions/Actions';
import { componentsNames } from '../../../utils/config/componentsNames';
import API from '../../../stores/API';
import { EventTypes } from '../../../utils/config/EventTypes';

/**
 * Class for dummy instead of player
 */
export class PlayerWithDummy extends BaseComponent {
    /** Where to place */
    #parent;

    /** Default values with parent */
    constructor(parent) {
        super(parent, '', () => 'nop', componentsNames.PLAYER);
        this.#parent = parent;
        this.#subscribe();
    }

    // todo remove later
    /**
     * Append element to parent
     */
    override render() {
        if (checkAuth()) {
            const player = new AudioPlayer(this.#parent);
            player.render();
        } else {
            const playerDummy = new PlayerDummy(this.#parent);
            playerDummy.render();
        }
    }

    /** Add events to buttons inside */
    #subscribe() {
        API.subscribe(
            (message) => {
                if (message === 'OK') {
                    const pr = new Promise((resolve) => {
                        Actions.removeElementFromPage(componentsNames.PLAYER);
                        resolve('');
                    });

                    pr.then(() => {
                        this.render();
                        Actions.addElementOnPage(componentsNames.PLAYER);
                    });
                }
            },
            EventTypes.LOGOUT_STATUS,
            componentsNames.PLAYER,
        );
    }

    override unRender() {
        super.unRender();
        Actions.removeElementFromPage(componentsNames.PLAYER);
    }
}
