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
            let request = {};
            if (body === null) {
                const request = new Request(
                    url, {
                        method,
                        credentials: "include",
                        headers: {
                            'content-type': 'application/json; charset=utf8'
                        },
                    });
            } else {
                const request = new Request(
                    url, {
                        method,
                        credentials: "include",
                        headers: {
                            'content-type': 'application/json; charset=utf8'
                        },
                        body: JSON.stringify(body),
                    });
            }

            if (method === AJAX_METHODS.GET) {
                request.headers['Authorization'] = "Bearer " + localStorage.getItem("jwt");
            }

            fetch(request).then(
                response_raw => response_raw.json().then(
                      response_json => {
                          let error;
                          const status = response_raw.status;
                          if (status !== 200) {
                              error = response_json['error'];
                              callback({status, error});
                              return;
                          }

                          callback({status: status, context: response_json['jwt']});
                      }
                )
            );
        }
    }

    window.Ajax = new Ajax();
})()
