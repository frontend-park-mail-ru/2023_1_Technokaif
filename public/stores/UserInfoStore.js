import IStore from './IStore';

/**
 * Class for user data storing.
 */
class UserInfoStore extends IStore {
    /**
     * Constructor for user store.
     */
    constructor() {
        super('userInfo');
    }

    /**
     * Function to handle dispatcher behaviour.
     * @param action
     */
    dispatch(action) {
        super.dispatch();
        switch (action.type) {
        case 1:
            break;
        default:
        }
    }
}

export default new UserInfoStore();
