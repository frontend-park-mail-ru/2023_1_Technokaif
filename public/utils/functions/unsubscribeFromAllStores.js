import ComponentsStore from '../../stores/ComponentsStore';
import UserInfoStore from '../../stores/UserInfoStore';
import API from '../../stores/API';
import ContentStore from '../../stores/ContentStore';

/**
 * Function for unsubscribing from all stores in project
 */
export default function unsubscribeFromAllStores(nameOfStore) {
    ComponentsStore.unsubscribeAll(nameOfStore);
    ContentStore.unsubscribeAll(nameOfStore);
    API.unsubscribeAll(nameOfStore);
    UserInfoStore.unsubscribeAll(nameOfStore);
}
