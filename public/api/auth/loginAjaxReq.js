'use strict';

import { sidebarConfig } from '../../utils/config.js';
import { redirect } from '../../modules/redirects.js';
import { PATH } from '../../utils/urls.js';
import { Ajax } from '../../modules/ajax.js';

export function loginAjax (login, password) {
    const AjaxReq = new Ajax();
    AjaxReq.post({
        url: PATH.login,
        body: { username: login, password },
        whatRender: ({ status, context }) => {
            if (status === 200) {
                localStorage.setItem('jwt', context.jwt);

                redirect(sidebarConfig.feed);
                return;
            }

            alert(context);
        }
    });
}
