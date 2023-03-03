'use strict';

import { loginAjax } from './loginAjaxReq.js';

export function registerAjax (userData) {
    window.Ajax.post({
        url: '/api/auth/signup',
        body: userData,
        callback: ({ status, context }) => {
            if (status === 200) {
                // skipped id in context without error
                loginAjax(userData.email, userData.password);
                return;
            }

            alert(context);
        }
    });
}
