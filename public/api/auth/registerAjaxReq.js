'use strict';

import { PATH } from '../../utils/urls.js';
import { loginAjax } from './loginAjaxReq.js';

export function registerAjax (userData) {
    console.log(userData);
    window.Ajax.post({
        url: PATH.auth,
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
