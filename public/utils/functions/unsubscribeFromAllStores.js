import ComponentsStore from '../../stores/ComponentsStore';
import UserInfoStore from '../../stores/UserInfoStore';
import API from '../../stores/API';
import ContentStore from '../../stores/ContentStore';

/**
 * Function for unsubscribing from all stores in project
 */
export default function unsubscribeFromAllStores() {
    ComponentsStore.unsubscribeAll();
    ContentStore.unsubscribeAll();
    API.unsubscribeAll();
    UserInfoStore.unsubscribeAll();
}
