import { BaseView } from './BaseView';

/**
 * Class for feed page view.
 */
export class LoginView extends BaseView {
    /**
     * Constructor for feed page view.
     */
    constructor() {
        super(pageNames.LOGIN);
    }

    /**
     * Function to create a callback on event.
     */
    callEventListener() {

    }

    // TODO methods for register error messages

    /**
     * Render all view by components.
     */
    render() {
        super.render();
        this.callEventListener();
    }
}
