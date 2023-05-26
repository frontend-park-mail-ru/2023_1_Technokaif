import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';

/** Search Actions */
class ApiSearchActions {
    /** search server */
    search(searchString) {
        Dispatcher.dispatch({
            type: ActionTypes.SEARCH_WITH_NAME,
            searchString,
        });
    }

    /** Empty search */
    emptySearch() {
        Dispatcher.dispatch({
            type: ActionTypes.EMPTY_SEARCH,
        });
    }

    /** Search for tracks with value */
    searchTracks(searchString:string) {
        Dispatcher.dispatch({
            type: ActionTypes.SEARCH_FOR_TRACKS,
            searchString,
        });
    }
}

export default new ApiSearchActions();
