import Dispatcher from '@dispatcher/Dispatcher';
import ActionTypes from '@actions/ActionTypes';

class ApiSearchActions {
    /** search server */
    search(searchString) {
        Dispatcher.dispatch({
            type: ActionTypes.SEARCH_WITH_NAME,
            searchString,
        });
    }
}

export default new ApiSearchActions();
