import { csrfAjax } from '../api/auth/csrfAjaxReq';
import { apiUrl } from '../utils/config/apiUrls';

const AJAX_METHODS = {
    GET: 'GET',
    POST: 'POST',
};

/** Don't do anything */
const noop = () => {};

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
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
        body = null,
        resolve = noop,
        reject = noop,
    }) {
        if (apiUrl.AVATAR_REGEX.test(url)) {
            return csrfAjax().then((csrf) => fetch(url, {
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
                }));
        }
        if (url !== apiUrl.AUTH && url !== apiUrl.LOGIN) {
            return csrfAjax().then((csrf) => fetch(url, {
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
                }));
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
