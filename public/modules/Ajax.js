const AJAX_METHODS = {
    GET: 'GET',
    POST: 'POST',
};

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
                } else {
                    throw data.message;
                }
            }))
            .catch((error) => {
                reject(error);
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
        return fetch(url, {
            method: AJAX_METHODS.POST,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json().then((data) => {
                if (response.ok) {
                    resolve(data);
                } else {
                    throw data.message;
                }
            }))
            .catch((error) => {
                reject(error);
            });
    }
}

export default new Ajax();
