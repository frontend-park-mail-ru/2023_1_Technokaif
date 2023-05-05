import { BLACKLIST_AUTH, BLACKLIST_UNAUTH } from '@config/config';

/**
 * Get path to take if user is AUTH
 * @param path
 */
export function getPermittedByAuthUser(path:string): string {
    if (BLACKLIST_AUTH.includes(path)) {
        return '/';
    }
    return path;
}

/**
 * Get path to take if user is UNAUTH
 * @param path
 */
export function getPermittedByUnAuthUser(path:string): string {
    const canBeAccessed = BLACKLIST_UNAUTH.find((regExp) => {
        const reg = new RegExp(regExp);
        return reg.test(path);
    });
    if (canBeAccessed) {
        return '/login';
    }
    return path;
}
