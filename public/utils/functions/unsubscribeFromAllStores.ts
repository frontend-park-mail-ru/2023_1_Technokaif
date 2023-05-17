import ComponentsStore from '@store/ComponentsStore';
import UserInfoStore from '@store/UserInfoStore';
import API from '@store/API';
import ContentStore from '@store/ContentStore';
import SongStore from '@store/SongStore';

/**
 * Function for unsubscribing from all stores in project on component
 */
export default function unsubscribeFromAllStoresOnComponent(nameOfComponent) {
    ComponentsStore.unsubscribeAllOnComponent(nameOfComponent);
    ContentStore.unsubscribeAllOnComponent(nameOfComponent);
    API.unsubscribeAllOnComponent(nameOfComponent);
    UserInfoStore.unsubscribeAllOnComponent(nameOfComponent);
    SongStore.unsubscribeAllOnComponent(nameOfComponent);
}
