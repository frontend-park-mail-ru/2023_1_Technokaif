'use strict'

import {sidebarConfig} from "./config.js";

export function loginAjax(login, password) {
    Ajax.post({
        url: '/auth/login',
        body: {login, password},
        callback: ({status, message}) => {
            if (status === 200) {
                if (message.jwt !== undefined) {
                    localStorage.setItem('jwt', message.jwt);
                }

                alert('Nice');
                const element = document.getElementsByName('main');
                redirect(sidebarConfig['feed'], element);
                return;
            }

            alert(message);
        }
    });
}
