'use strict';

import { redirect } from '../../modules/redirects.js';
import { sidebarConfig } from '../../utils/config.js';
import { clearBars, prePageRender } from '../../utils/prePageRender.js';
import { Ajax } from '../../modules/ajax.js';

export function logoutAjax () {
    const AjaxReq = new Ajax();
    AjaxReq.get({
        url: '/api/auth/logout',
        whatRender: ({ status, context }) => {
            if (status !== 200) {
                alert(context);
            }

            localStorage.removeItem('jwt');
            clearBars();
            prePageRender();
            redirect(sidebarConfig.feed);
        }
    });
}
