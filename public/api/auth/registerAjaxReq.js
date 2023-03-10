'use strict';

import { PATH } from '../../utils/config/urls.js';
import { loginAjax } from './loginAjaxReq.js';
import { Ajax } from '../../modules/ajax.js';

/**
 * Api-oriented register function.
 * @param {json} userData User data, that wll be sent to server to check existence of account.
 */

export function registerAjax (userData) {
    const AjaxReq = new Ajax();
    AjaxReq.post({
        url: PATH.auth,
        body: userData,
        whatRender: ({ status, context }) => {
            if (status === 200) {
                // skipped id in context without error
                loginAjax(userData.email, userData.password);
                return;
            }

            alert(context);
        }
    });
}
