'use strict'

function registerAjax(login, password) {
    Ajax.post({
        url: '/auth/login',
        body: {login, password},
        callback: ({jwt, status, message}) => {
            if (status === 200) {
                localStorage.setItem('jwt', jwt);
                alert('Nice');
                redirectToMain();
                return;
            }

            alert(message);
        }
    });
}
