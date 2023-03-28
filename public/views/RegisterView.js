import { BaseView } from './BaseView';

/**
 * Class for feed page view.
 */
export class RegisterView extends BaseView {
    /**
     * Constructor for feed page view.
     */
    constructor() {
        super(pageNames.REGISTER);
    }

    /**
     * Function to create a callback on event.
     */
    callEventListener() {

    }

    /**
     * Render all view by components.
     */
    render() {
        super.render();
        this.callEventListener();
    }
}
