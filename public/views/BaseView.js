import ComponentsStore from '../stores/ComponentsStore';
import Actions from '../actions/Actions';

/**
 * Base View class to handle render functions.
 */
export class BaseView {
    /**
     * Name of view.
     */
    #viewName;

    /**
     * Constructor for base view.
     */
    constructor(name) {
        this.#viewName = name;
    }

    /**
     * Render element in parent. Clear parent before.
     */
    render() {
        ComponentsStore.addChangeListener((list) => {
            list.forEach((el) => {
                el.render();
            });
        }, EventTypes.ON_NOT_RENDERED_ITEMS);

        Actions.whatRender(this.#viewName);
    }
}
