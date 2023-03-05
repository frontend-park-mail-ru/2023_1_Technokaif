'use strict';

import { sidebarConfig } from '../../utils/config.js';
import { redirect } from '../../modules/redirects.js';
import { PATH } from '../../utils/urls.js';

/**
 * Api-oriented login function.
 * @param {string} login Login argument, that wll be sent to server.
 * @param {string} password Password argument, that wll be sent to server.
 */

export function loginAjax (login, password) {
    window.Ajax.post({
        url: PATH.login,
        body: { username: login, password },
        callback: ({ status, context }) => {
            if (status === 200) {
                localStorage.setItem('jwt', context.jwt);

                redirect(sidebarConfig.feed);
                return;
            }

            alert(context);
        }
    });
}
