import { BaseComponent } from '@components/BaseComponent';
import API from '@store/API';
import { EventTypes } from '@config/EventTypes';
import unsubscribeFromAllStoresOnComponent from '@functions/unsubscribeFromAllStores';

import templateHTML from './listWithCoversAndNames.handlebars';
import './listWithCoversAndNames.less';
import Router from '@router/Router';
import { routingUrl } from '@config/routingUrls';

/**
 * Create element with track-oriented line with img, title, duration, optionally (listens).
 */
export class ListWithCoversAndNames extends BaseComponent {
    /** config */
    private elementConfig;

    /**
     * Create Line component.
     * @param {HTMLElement} parent - place where to render
     * @param {JSON} config - to template
     * @param name
     */
    constructor(parent, config, name) {
        super(parent, config, templateHTML, name);
        this.elementConfig = config;
    }

    /**
     * Function to unrender modal window
     * @private
     */
    private unrenderElement() {
        unsubscribeFromAllStoresOnComponent(this.name);
        const element: HTMLElement|null = document.querySelector(`.${this.name}`);
        if (!element) {
            console.error('Cannot get element on listWithCover');
            return;
        }

        element.remove();
    }

    /**
     * Function to add subscribes
     * @private
     */
    private addSubscribes() {
        API.subscribe(
            (message) => {
                if (message !== 'OK') {
                    console.error('bad response from server during logout');
                } else {
                    this.unrenderElement();
                }
            },
            EventTypes.LOGOUT_STATUS,
            this.name,
        );

        const element: HTMLElement|null = document.querySelector(`.${this.name}`);
        if (!element) {
            console.error('Cannot get element on listWithCover');
            return;
        }

        element?.addEventListener('click', (event) => {
            const targetElement: HTMLElement|null = event?.target as HTMLElement;
            if (!targetElement) {
                console.error('Bad target on menu click event');
                return;
            }

            const item: HTMLDivElement|null = targetElement?.closest(`.${this.elementConfig.blockOfItem}`);
            if (!item) {
                console.error('Bad target on menu click event');
                return;
            }

            const { id } = item.dataset;
            Router.go(routingUrl.PLAYLIST_PAGE(id));
        });
    }

    /**
     * Function to render Modal Window
     */
    override appendElement() {
        super.appendElement();
        this.addSubscribes();
    }
}
