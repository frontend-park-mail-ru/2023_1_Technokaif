import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented login function.
 * @param {string} login Login argument, that wll be sent to server.
 * @param {string} password Password argument, that wll be sent to server.
 */
export async function loginAjax(login, password) {
    let mes;
    await Ajax.post({
        url: apiUrl.LOGIN,
        body: { username: login, password },
        resolve: (data) => {
            localStorage.setItem('jwt', data.jwt);
        },
    }).then(() => {
        mes = 'OK';
    }).catch((message) => {
        mes = message;
    });

    return mes;
}
