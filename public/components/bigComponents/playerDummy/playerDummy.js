import { BaseComponent } from '../../BaseComponent';
import './playerDummy.less';
import template from './playerDymmy.handlebars';
import Router from '../../../router/Router';
import { componentsNames } from '../../../utils/config/componentsNames';
import unsubscribeFromAllStoresOnComponent from '../../../utils/functions/unsubscribeFromAllStores';

/**
 * Class for dummy instead of player
 */
export class PlayerDummy extends BaseComponent {
    #parent;

    /** Default values with parent */
    constructor(parent) {
        super(parent, '', template, componentsNames.PLAYER);
        this.#parent = parent;
    }

    // todo remove later
    /**
     * Append element to parent
     */
    render() {
        super.render();
        this.#addEvents();
    }

    unRender() {
        super.unRender();
        unsubscribeFromAllStoresOnComponent(componentsNames.PLAYER);
    }

    /** Add events to buttons inside */
    #addEvents() {
        document.querySelector('.js__button__dummy').addEventListener('click', () => {
            Router.go('/login');
        });
    }
}
