import { BaseComponent } from '../../BaseComponent';
import './playerDummy.less';
import template from './playerDymmy.handlebars';
import Router from '../../../router/Router';

/**
 * Class for dummy instead of player
 */
export class PlayerDummy extends BaseComponent {
    #parent;

    /** Default values with parent */
    constructor(parent) {
        super(parent, 'playerDummy', template);
        this.#parent = parent;
    }

    // todo remove later
    /**
     * Append element to parent
     */
    render() {
        this.#parent.innerHTML += template();
        this.#addEvents();
    }

    /** Add events to buttons inside */
    #addEvents() {
        document.querySelector('.js__button__dummy').addEventListener('click', () => {
            Router.go('/login');
        });
    }
}
