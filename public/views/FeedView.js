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
        #renderNavbar();
        #renderMenu();


        this.callEventListener();
    }

    #renderNavbar() {
        if () {

        }
    }

    #renderMenu() {

    }

    #renderFooter() {

    }

    #renderTracksComp() {

    }

    #renderArtistsComp() {

    }

    #renderAlbumsComp() {

    }
}
