const AJAX_METHODS = {
    GET: 'GET',
    POST: 'POST',
};

const noop = () => {};

/**
 * Requests class for all server-api request work.
 */
export class Ajax {
    // TODO check for good doc
    /**
     * Get data from server
     * @param {string, function} url -- url where Get method is used
     * @param {function} whatRender -- function to render page
    */
    get({ url, whatRender }) {
        this.ajax({
            method: AJAX_METHODS.GET,
            url,
            whatRender,
        });
    }

    // TODO check for good doc
    /**
     * Post data to server
     * @param {string} url -- url where Post method is used
     * @param {object} body -- body object with parameters
     * @param {function} whatRender -- function to render page
    */
    post({ url, body, whatRender }) {
        this.ajax({
            method: AJAX_METHODS.POST,
            url,
            body,
            whatRender,
        });
    }

    // TODO check for good doc
    /**
     * @param {string} method -- what method used
     * @param {string} url -- url where method is used
     * @param {object} body -- body object with parameters
     * @param {function} whatRender -- function to render page
     */
    ajax({
        method, url, body = null, whatRender = noop,
    }) {
        let request = {};
        if (body === null) {
            request = new Request(url, {
                method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json;',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
        } else {
            request = new Request(url, {
                method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json;',
                },
                body: JSON.stringify(body),
            });
        }

        fetch(request).then(
            (responseRaw) => responseRaw.json().then(
                (responseJson) => {
                    const { status } = responseRaw;
                    if (!responseRaw.ok) {
                        const error = responseJson.message;
                        whatRender({ status, context: error });
                        return;
                    }

                    whatRender({ status, context: responseJson });
                },
            ),
        );
    }

    // TODO think about implementation of method
    /**
     *
     * @param {*} url
     * @returns
     */
    PromiseGet(url) {
        return new Promise((resolve, reject) => {
            this.get(url, (err, response) => {
                if (err !== 200) {
                    reject(err);
                }

                resolve(response);
            });
        });
    }

    // TODO think about implementation of method
    /**
     *
     * @param {*} url
     * @param {*} userData
     * @returns
     */
    PromisePost(url, userData) {
        return new Promise((resolve, reject) => {
            this.post(url, userData, (err, response) => {
                if (err !== 200) {
                    reject(err);
                }

                resolve(response);
            });
        });
    }
}
