import ComponentsStore from '../../stores/ComponentsStore';
import UserInfoStore from '../../stores/UserInfoStore';
import API from '../../stores/API.ts';
import ContentStore from '../../stores/ContentStore';
import SongStore from '../../stores/SongStore';

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
