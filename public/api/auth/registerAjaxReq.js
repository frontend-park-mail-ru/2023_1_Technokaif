import { PATH } from '../../utils/config/urls.js';
import { loginAjax } from './loginAjaxReq.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented register function.
 * @param {json} userData User data, that wll be sent to server to check existence of account.
 */
export function registerAjax(userData) {
    Ajax.post({
        url: PATH.auth,
        body: userData,
        resolve: () => {
            loginAjax(userData.email, userData.password);
        },
        reject: (message) => {
            const element = document.getElementsByClassName('title__error-text')[0];
            element.hidden = false;
            element.innerText = message;
        },
    });
}
