'use strict'

function checkAuth() {
    Ajax.get({
        url: '/user/isAuth',
        callback: () => {}
    });
}
