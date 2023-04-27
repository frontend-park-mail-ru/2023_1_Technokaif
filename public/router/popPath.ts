import {
    ACTION_ON_PATH, BLACKLIST_AUTH, BLACKLIST_UNAUTH, DIRECTIONS,
} from '../utils/config/config';

/**
 * Get action on pop in auth user
 * @param path path to take
 * @param direction what direction is taken
 */
export function popAuthUser(path:string, direction:string):string {
    if (!BLACKLIST_AUTH.includes(path)) {
        return ACTION_ON_PATH.canBeAccessed;
    }

    if (direction === DIRECTIONS.backward) {
        return ACTION_ON_PATH.goBackward;
    }

    if (direction === DIRECTIONS.forward) {
        return ACTION_ON_PATH.goForward;
    }
    console.warn('ERROR IN popAuthUser: ', path, ' ', direction);
    return ACTION_ON_PATH.login;
}

/**
 * Get action on pop in NoAuth user
 * @param path path to take
 * @param direction what direction is taken
 */
export function popNoAuthUser(path:string, direction:string):string {
    const canBeAccessed = BLACKLIST_UNAUTH.find((regExp) => {
        const reg = new RegExp(regExp);
        return reg.test(path);
    });
    if (!canBeAccessed) {
        return ACTION_ON_PATH.canBeAccessed;
    }

    if (direction === DIRECTIONS.backward) {
        return ACTION_ON_PATH.goBackward;
    }

    if (direction === DIRECTIONS.forward) {
        return ACTION_ON_PATH.goForward;
    }
    console.warn('ERROR IN popAuthUser: ', path, ' ', direction);
    return ACTION_ON_PATH.login;
}
