import { BaseComponent } from '@components/BaseComponent';
import './playerDummy.less';
import Router from '@router/Router';
import { componentsNames } from '@config/componentsNames';
import unsubscribeFromAllStoresOnComponent from '@functions/unsubscribeFromAllStores';
import template from './playerDymmy.handlebars';

/**
 * Class for dummy instead of player
 */
export class PlayerDummy extends BaseComponent {
    /** Default values with parent */
    constructor(parent) {
        super(parent, '', template, componentsNames.PLAYER);
    }

    /**
     * Append element to parent
     */
    override render() {
        super.render();
        this.#addEvents();
    }

    /**
     * Method to unrender dummy player
     */
    override unRender() {
        super.unRender();
        unsubscribeFromAllStoresOnComponent(componentsNames.PLAYER);
    }

    /** Add events to buttons inside */
    #addEvents() {
        const dummyLoginButton: HTMLButtonElement|null = document.querySelector('.js__button__dummy');
        if (!dummyLoginButton) {
            console.error('Error in dummy player component render');
            return;
        }

        dummyLoginButton.addEventListener('click', () => {
            Router.goToLogin();
        });
    }
}
