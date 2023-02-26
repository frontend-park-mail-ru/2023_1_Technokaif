'use strict'

import {sidebarConfig} from "./config.js";

function loginAjax(login, password) {
    Ajax.post({
        url: '/auth/login',
        body: {login, password},
        callback: ({jwt, status, message}) => {
            if (status === 200) {
                localStorage.setItem('jwt', jwt);
                alert('Nice');
                const element = document.getElementsByName('main');
                redirect(sidebarConfig['feed'], element);
                return;
            }

            alert(message);
        }
    });
}
