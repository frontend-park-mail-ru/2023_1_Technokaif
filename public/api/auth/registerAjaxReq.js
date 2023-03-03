'use strict';

import { PATH } from '../../utils/urls.js';
import { loginAjax } from './loginAjaxReq.js';
import { Ajax } from '../../modules/ajax.js';

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
