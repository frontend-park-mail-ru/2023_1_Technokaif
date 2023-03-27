import IStore from './IStore';

/**
 * Store for
 */
class ComponentsStore extends IStore {
    /**
     * Constructor for ComponentsStore.
     */
    constructor() {
        super('ComponentsStore');
    }
}

export default new ComponentsStore();
