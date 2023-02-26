(function() {
    const AJAX_METHODS = {
        GET: 'GET',
        POST: 'POST'
    };

    const noop = () => {};

    class Ajax {
        get({url, callback}) {
            this._ajax({
                method: AJAX_METHODS.GET,
                url,
                callback
            })
        }

        post({url, body, callback}) {
            this._ajax({
                method: AJAX_METHODS.POST,
                url,
                body,
                callback
            })
        }

        _ajax({method, url, body = null, callback = noop}) {
            const request = new Request(
                url, {
                    method,
                    credentials: "include",
                    headers: {
                        'content-type': 'application/json; charset=utf8'
                    },
                });

            if (body !== null) {
                request.body = JSON.stringify(body);
            }
            if (localStorage.getItem("jwt") !== null) {
                request.authorization = localStorage.getItem("jwt");
            }

            fetch(request).then(
                response_raw => response_raw.json().then(
                      response_json => {
                          callback(response_json.method, response_json.message)
                      }
                )
            );
        }
    }

    window.Ajax = new Ajax();
})()
