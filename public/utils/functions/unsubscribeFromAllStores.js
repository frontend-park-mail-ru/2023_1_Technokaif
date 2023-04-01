import ComponentsStore from '../../stores/ComponentsStore';
import UserInfoStore from '../../stores/UserInfoStore';
import API from '../../stores/API';

/**
 * Function for unsubscribing from all stores in project
 */
export default function unsubscribeFromAllStores() {
    ComponentsStore.unsubscribeAll();
    ComponentsStore.unsubscribeAll();
    API.unsubscribeAll();
    UserInfoStore.unsubscribeAll();
}
