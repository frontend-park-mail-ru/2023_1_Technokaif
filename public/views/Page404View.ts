import { pageNames } from '@config/pageNames';
import ComponentsActions from '@Actions/ComponentsActions';
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
    override render() {
        super.render();
        ComponentsActions.whatRender(super.name);
    }
}

export default new Page404View();
