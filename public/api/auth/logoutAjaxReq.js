'use strict';

import { redirect } from '../../modules/redirects.js';
import { sidebarConfig, unAuthNavConfig } from '../../utils/config/config.js';
import { clearBars } from '../../utils/functions/prePageRender.js';
import { Ajax } from '../../modules/ajax.js';

/**
 * Api-oriented logout function.
 */

export function logoutAjax () {
    const AjaxReq = new Ajax();
    AjaxReq.get({
        url: '/api/auth/logout',
        whatRender: ({ status, context }) => {
            if (status < 300) {
                alert(context);
                localStorage.removeItem('jwt');
                redirect(unAuthNavConfig.login);
                return;
            }

            localStorage.removeItem('jwt');
            clearBars();
            redirect(sidebarConfig.feed);
        }
    });
}
