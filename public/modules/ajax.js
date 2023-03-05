'use strict';

const AJAX_METHODS = {
    GET: 'GET',
    POST: 'POST'
};

const noop = () => {};

export class Ajax {
    get ({ url, whatRender }) {
        this._ajax({
            method: AJAX_METHODS.GET,
            url,
            whatRender
        });
    }

    post ({ url, body, whatRender }) {
        this._ajax({
            method: AJAX_METHODS.POST,
            url,
            body,
            whatRender
        });
    }

    _ajax ({ method, url, body = null, whatRender = noop }) {
        let request = {};
        // url = '/api' + url;
        if (body === null) {
            request = new Request(
                url, {
                    method,
                    credentials: 'include',
                    headers: {
                        'content-type': 'application/json;',
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
        } else {
            request = new Request(
                url, {
                    method,
                    credentials: 'include',
                    headers: {
                        'content-type': 'application/json;'
                    },
                    body: JSON.stringify(body)
                });
        }

        // if (localStorage.getItem('jwt') != null && method === AJAX_METHODS.GET) {
        //      =
        // }

        fetch(request).then(
            responseRaw => responseRaw.json().then(
                responseJson => {
                    let error;
                    const status = responseRaw.status;
                    if (status !== 200) {
                        error = responseJson.error;
                        whatRender({ status, error });
                        return;
                    }

                    whatRender({ status, context: responseJson });
                }
            )
        );
    }

    PromiseGet (url) {
        return new Promise(function (resolve, reject) {
            this.get(url, function (err, response) {
                if (err !== 200) {
                    reject(err);
                }

                resolve(response);
            });
        });
    }

    PromisePost (url, userData) {
        return new Promise(function (resolve, reject) {
            this.post(url, userData, function (err, response) {
                if (err !== 200) {
                    reject(err);
                }

                resolve(response);
            });
        });
    }
}
