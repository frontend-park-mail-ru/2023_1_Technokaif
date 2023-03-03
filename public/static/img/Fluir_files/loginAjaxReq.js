'use strict';

import { sidebarConfig } from '../../utils/config.js';
import { redirect } from '../../modules/redirects.js';

export function loginAjax (login, password) {
    window.Ajax.post({
        url: '/auth/login',
        body: { username: login, password },
        callback: ({ status, context }) => {
            if (status === 200) {
                localStorage.setItem('jwt', context.jwt);

                // const mainElement = document.getElementsByName('main');
                redirect(sidebarConfig.feed);
                return;
            }

            alert(context);
        }
    });
}
