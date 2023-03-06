'use strict';

import { sidebarConfig } from '../../utils/config/config.js';
import { redirect } from '../../modules/redirects.js';
import { PATH } from '../../utils/config/urls.js';
import { Ajax } from '../../modules/ajax.js';

/**
 * Api-oriented login function.
 * @param {string} login Login argument, that wll be sent to server.
 * @param {string} password Password argument, that wll be sent to server.
 */

export function loginAjax (login, password) {
    const AjaxReq = new Ajax();
    AjaxReq.post({
        url: PATH.login,
        body: { username: login, password },
        whatRender: ({ status, context }) => {
            if (status < 300) {
                localStorage.setItem('jwt', context.jwt);

                redirect(sidebarConfig.feed);
                return;
            }

            document.getElementById('serverErrors').style.display = 'block';
            document.getElementsByClassName('error-text')[0].innerText = context;
        }
    });
}
