import { BaseView } from './BaseView';
import Actions from '../actions/Actions';
import { pageNames } from '../utils/config/pageNames';
import Router from '../router/Router';

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
