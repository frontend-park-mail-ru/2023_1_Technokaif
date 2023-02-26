'use strict'

import {sidebarConfig} from "./config.js";
import {loginAjax} from "./loginAjaxReq.js";

export function registerAjax(...data) {
    Ajax.post({
        url: '/auth/signup',
        body: data.values(),
        callback: ({status, message}) => {
            if (status === 200) {
                loginAjax(data['email'], data['password']);
                return;
            }

            alert(message);
        }
    });
}
