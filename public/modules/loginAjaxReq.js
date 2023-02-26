'use strict'

import {sidebarConfig} from "./config.js";

export function loginAjax(login, password) {
    Ajax.post({
        url: '/auth/login',
        body: {login, password},
        callback: ({status, context}) => {
            if (status === 200) {
                localStorage.setItem('jwt', context);

                alert('Nice');
                const element = document.getElementsByName('main');
                redirect(sidebarConfig['feed'], element);
                return;
            }

            alert(context);
        }
    });
}
