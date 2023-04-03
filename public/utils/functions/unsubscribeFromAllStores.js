import ComponentsStore from '../../stores/ComponentsStore';
import UserInfoStore from '../../stores/UserInfoStore';
import API from '../../stores/API';
import ContentStore from '../../stores/ContentStore';

/**
 * Function for unsubscribing from all stores in project on component
 */
export default function unsubscribeFromAllStoresOnComponent(nameOfComponent) {
    ComponentsStore.unsubscribeAllOnComponent(nameOfComponent);
    ContentStore.unsubscribeAllOnComponent(nameOfComponent);
    API.unsubscribeAllOnComponent(nameOfComponent);
    UserInfoStore.unsubscribeAllOnComponent(nameOfComponent);
}
