'use strict';

import {redirect} from "../../modules/redirects.js";
import {sidebarConfig} from "../../utils/config.js";
import {clearBars, prePageRender} from "../../utils/prePageRender.js";

export function logoutAjax () {
    window.Ajax.get({
        url: '/api/auth/logout',
        callback: ({status, context}) => {
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
