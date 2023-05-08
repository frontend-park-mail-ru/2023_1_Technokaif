import { checkAuth } from '@functions/checkAuth';
import { componentsNames } from '@config/componentsNames';
import { EventTypes } from '@config/EventTypes';
import ComponentsActions from '@Actions/ComponentsActions';
import API from '@store/API';
import { BaseComponent } from '@components/BaseComponent';
import { AudioPlayer } from '../player/player';
import { PlayerDummy } from '../playerDummy/playerDummy';

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
                        ComponentsActions.removeElementFromPage(componentsNames.PLAYER);
                        resolve('');
                    });

                    pr.then(() => {
                        this.render();
                        ComponentsActions.addElementOnPage(componentsNames.PLAYER);
                    });
                }
            },
            EventTypes.LOGOUT_STATUS,
            componentsNames.PLAYER,
        );
    }

    override unRender() {
        super.unRender();
        ComponentsActions.removeElementFromPage(componentsNames.PLAYER);
    }
}
