import { BaseView } from './BaseView';

import Actions from '../actions/Actions';

import { pageNames } from '../utils/config/pageNames';
import unsubscribeFromAllStores from '../utils/functions/unsubscribeFromAllStores';
import Router from '../router/Router';

/**
 * Class for feed page view.
 */
class Page404View extends BaseView {
    /**
     * A variable to save feed component beyond two events - render and api request
     */
    #feedComponent;

    /**
     * Constructor for Page404View.
     */
    constructor() {
        super(pageNames.PAGE404);
    }

    /**
     * Function to subscribe Routing links to feed by logo and button
     */
    #subscribeComponents() {
        const header = document.querySelector('.header');
        header.addEventListener('click', (event) => {
            event.preventDefault();
            Router.go('/');
        });

        const button = document.querySelector('.primary');
        button.addEventListener('click', (event) => {
            event.preventDefault();
            Router.go('/');
        });
    }

    /**
     * Render all view by components.
     */
    render() {
        unsubscribeFromAllStores();
        super.render();
        Actions.whatRender(super.name);
        this.#subscribeComponents();
    }
}

export default new Page404View();
