(function() {
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

                        callback({ status, context: responseJson.jwt });
                    }
                )
            );
        }
    }

    window.Ajax = new Ajax();
})()
