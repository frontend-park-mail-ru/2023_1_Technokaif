'use strict'

import {sidebarConfig} from "./config.js";
import {loginAjax} from "./loginAjaxReq.js";

export function registerAjax(...data) {
    Ajax.post({
        url: '/auth/signup',
        body: data.values(),
        callback: ({status, context}) => {
            if (status === 200) {
                // todo: skipped id in context without error
                loginAjax(data['email'], data['password']);
                return;
            }

            alert(context);
        }
    });
}
