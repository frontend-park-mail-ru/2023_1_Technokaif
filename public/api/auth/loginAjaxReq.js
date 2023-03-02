'use strict';

import { sidebarConfig } from '../../utils/config.js';
import { redirect } from '../../modules/redirects.js';

import { contentElement } from '../../index.js';
import { NAMES, PATH } from '../../utils/urls.js';

export function loginAjax (login, password) {
    window.Ajax.post({
        url: PATH.login,
        body: { username: login, password },
        callback: ({ status, context }) => {
            if (status === 200) {
                localStorage.setItem(NAMES.jwtInLocal, context.jwt);

                // const mainElement = document.getElementsByName('main');
                redirect(sidebarConfig.feed, contentElement);
                return;
            }

            alert(context);
        }
    });
}
