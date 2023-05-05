import { pageNames } from '@config/pageNames';
import Actions from '@actions/Actions';
import { BaseView } from './BaseView';

/**
 * Class for feed page view.
 */
class Page404View extends BaseView {
    /**
     * Constructor for Page404View.
     */
    constructor() {
        super(pageNames.PAGE404);
    }

    /**
     * Render all view by components.
     */
    render() {
        super.render();
        Actions.whatRender(super.name);
    }
}

export default new Page404View();
