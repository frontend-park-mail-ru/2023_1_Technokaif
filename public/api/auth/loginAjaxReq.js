import { sidebarConfig } from '../../utils/config/config.js';
import { redirect } from '../../modules/redirects.js';
import { PATH } from '../../utils/config/urls.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented login function.
 * @param {string} login Login argument, that wll be sent to server.
 * @param {string} password Password argument, that wll be sent to server.
 */
export function loginAjax(login, password) {
    Ajax.post({
        url: PATH.login,
        body: { username: login, password },
        resolve: (data) => {
            localStorage.setItem('jwt', data.jwt);
            redirect(sidebarConfig.feed);
        },
        reject: (message) => {
            const element = document.getElementsByClassName('title__error-text')[0];
            element.hidden = false;
            element.innerText = message;
        },
    });
}
