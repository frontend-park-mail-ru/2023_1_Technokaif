const AJAX_METHODS = {
    GET: 'GET',
    POST: 'POST',
};

const noop = () => {};

/**
 * Requests class for all server-api request work.
 */
export class Ajax {
    get({ url, whatRender }) {
        this.ajax({
            method: AJAX_METHODS.GET,
            url,
            whatRender,
        });
    }

    post({ url, body, whatRender }) {
        this.ajax({
            method: AJAX_METHODS.POST,
            url,
            body,
            whatRender,
        });
    }

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

    // eslint-disable-next-line class-methods-use-this
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

    // eslint-disable-next-line class-methods-use-this
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
