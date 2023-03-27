import IStore from './IStore';

/**
 * Class for user data storing.
 */
class UserInfoStore extends IStore {
    dispatch(action) {
        super.dispatch();
        switch (action.type) {
        case 1:
            break;
        default:
        }
    }
}
