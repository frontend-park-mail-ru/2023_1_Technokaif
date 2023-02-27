'use strict';

import { loginAjax } from './loginAjaxReq.js';

export function registerAjax (data) {
    console.log(data);
    window.Ajax.post({
        url: '/auth/signup',
        body: data,
        callback: ({ status, context }) => {
            if (status === 200) {
                // todo: skipped id in context without error
                loginAjax(data.email, data.password);
                return;
            }

            alert(context);
        }
    });
}
