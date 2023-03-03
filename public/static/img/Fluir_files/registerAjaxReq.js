'use strict';

import { Ajax } from './ajax.js';
import { loginAjax } from './loginAjaxReq.js';

export function registerAjax (userData) {
    console.log(userData);
    const AjaxReq = new Ajax();
    AjaxReq.post({
        url: '/auth/signup',
        body: userData,
        callback: ({ status, context }) => {
            if (status === 200) {
                // todo: skipped id in context without error
                loginAjax(userData.email, userData.password);
                return;
            }

            alert(context);
        }
    });
}
