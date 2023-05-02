import { csrfAjax } from '../api/auth/csrfAjaxReq';
import { apiUrl } from '../utils/config/apiUrls';

const AJAX_METHODS = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
};

/**
 * Default function doing nothing
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (data: unknown = true) => data;

/**
 * Requests class for all server-api request work.
 */
class Ajax {
    /**
     * Get data from server
     * @param {string, function} url -- url where Get method is used
     * @param {function} resolve -- function to render page and make actions in ok case
     * @param {function} reject -- function to handle an error
     */
    get({ url, resolve = noop, reject = noop }) {
        return fetch(url, {
            method: AJAX_METHODS.GET,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then((response) => response.json().then((data) => {
                if (response.ok) {
                    resolve(data);

                    return data;
                }

                throw data.message;
            }))
            .catch((error) => {
                reject(error);

                throw error;
            });
    }

    /**
     * DELETE data from server
     * @param {string, function} url -- url where Get method is used
     * @param {function} resolve -- function to render page and make actions in ok case
     * @param {function} reject -- function to handle an error
     */
    delete({ url, resolve = noop, reject = noop }) {
        return fetch(url, {
            method: AJAX_METHODS.DELETE,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then((response) => response.json().then((data) => {
                if (response.ok) {
                    resolve(data);

                    return data;
                }

                throw data.message;
            }))
            .catch((error) => {
                reject(error);

                throw error;
            });
    }

    /**
     * Post data to server
     * @param {string} url -- url where Post method is used
     * @param {object} body -- body object with parameters
     * @param {function} resolve -- function to render page and make actions in ok case
     * @param {function} reject -- function to handle an error
     */
    post({
        url,
        body,
        resolve = noop,
        reject = noop,
    }) {
        if (apiUrl.AVATAR_REGEX.test(url) || apiUrl.COVER_REGEX.test(url)) {
            return csrfAjax().then((csrf) => {
                if (!csrf) {
                    console.error('error in undefined csrf');
                    return;
                }
                fetch(url, {
                    method: AJAX_METHODS.POST,
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'X-CSRF-Token': csrf,
                    },
                    body,
                })
                    .then((response) => response.json()
                        .then((data) => {
                            if (response.ok) {
                                resolve(data);

                                return data;
                            }

                            throw data.message;
                        }))
                    .catch((error) => {
                        reject(error);

                        throw error;
                    });
            });
        }
        // eslint-disable-next-line max-len
        if (url !== apiUrl.AUTH && url !== apiUrl.LOGIN && url !== apiUrl.ALBUM_SEARCH_API && url !== apiUrl.ARTIST_SEARCH_API && url !== apiUrl.TRACK_SEARCH_API) {
            return csrfAjax().then((csrf) => {
                if (!csrf) {
                    console.error('error in undefined csrf');
                    return;
                }

                return fetch(url, {
                    method: AJAX_METHODS.POST,
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'X-CSRF-Token': csrf,
                    },
                    body: JSON.stringify(body),
                })
                    .then((response) => response.json().then((data) => {
                        if (response.ok) {
                            resolve(data);

                            return data;
                        }

                        throw data.message;
                    }))
                    .catch((error) => {
                        reject(error);

                        throw error;
                    });
            });
        }

        return fetch(url, {
            method: AJAX_METHODS.POST,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json()
                .then((data) => {
                    if (response.ok) {
                        resolve(data);

                        return data;
                    }

                    throw data.message;
                }))
            .catch((error) => {
                reject(error);

                throw error;
            });
    }
}

export default new Ajax();
