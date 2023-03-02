(function () {
    const AJAX_METHODS = {
        GET: 'GET',
        POST: 'POST'
    };

    const noop = () => {};

    class Ajax {
        get ({ url, callback }) {
            this._ajax({
                method: AJAX_METHODS.GET,
                url,
                callback
            });
        }

        post ({ url, body, callback }) {
            this._ajax({
                method: AJAX_METHODS.POST,
                url,
                body,
                callback
            });
        }

        _ajax ({ method, url, body = null, callback = noop }) {
            let request = {};
            // url = '/api' + url;
            if (body === null) {
                request = new Request(
                    url, {
                        method,
                        credentials: 'include',
                        headers: {
                            'content-type': 'application/json; charset=utf8'
                        }
                    });
            } else {
                request = new Request(
                    url, {
                        method,
                        credentials: 'include',
                        headers: {
                            'content-type': 'application/json; charset=utf8'
                        },
                        body: JSON.stringify(body)
                    });
            }

            if (localStorage.getItem('jwt') != null && method === AJAX_METHODS.GET) {
                request.headers.Authorization = 'Bearer ' + localStorage.getItem('jwt');
            }

            fetch(request).then(
                responseRaw => responseRaw.json().then(
                    responseJson => {
                        let error;
                        const status = responseRaw.status;
                        if (status !== 200) {
                            error = responseJson.error;
                            callback({ status, error });
                            return;
                        }

                        console.log({ status, context: responseJson });
                        callback({ status, context: responseJson });
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

    window.Ajax = new Ajax();
})();
