'use strict';

import {redirect} from "../../modules/redirects.js";
import {sidebarConfig} from "../../utils/config.js";
import {clearBars, prePageRender} from "../../utils/prePageRender.js";

/**
 * Api-oriented logout function.
 */

export function logoutAjax () {
    window.Ajax.get({
        url: '/api/auth/logout',
        callback: ({status, context}) => {
            if (status !== 200) {
                alert(context);
                return;
            }

            localStorage.removeItem('jwt');
            clearBars();
            redirect(sidebarConfig.feed);
        }
    });
}
