import BaseView from './BaseView';

/**
 * Class for feed page view.
 */
class FeedView extends BaseView {
    /**
     * Element
     */
    #parent;

    /**
     * Constructor for feed page.
     * @param parent
     */
    constructor(parent) {
        super();
        this.#parent = parent;
    }

    /**
     *
     */
    callEventListener() {

    }

    /**
     * Render all view by components.
     */
    render() {
        super.render();
        this.#renderMenu();
        this.#renderNavbar();
        this.#renderFooter();

        this.callEventListener();
    }

    #renderNavbar() {
        if (checkElementExist('js__navbar')) {

        }
    }

    #renderMenu() {

    }

    #renderFooter() {

    }

    #renderTracksTape() {

    }

    #renderArtistsTape() {

    }

    #renderAlbumsTape() {

    }
}
