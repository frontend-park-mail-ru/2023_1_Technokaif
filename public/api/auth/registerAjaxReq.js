'use strict';

import { PATH } from '../../utils/urls.js';
import { loginAjax } from './loginAjaxReq.js';

/**
 * Api-oriented register function.
 * @param {json} userData User data, that wll be sent to server to check existence of account.
 */

export function registerAjax (userData) {
    window.Ajax.post({
        url: PATH.auth,
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
