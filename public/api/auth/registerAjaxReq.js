import { PATH } from '../../utils/config/urls.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented register function.
 * @param {json} userData User data, that wll be sent to server to check existence of account.
 */
export async function registerAjax(userData) {
    let mes;
    await Ajax.post({
        url: PATH.auth,
        body: userData,
    }).then(() => {
        mes = 'OK';
    }).catch((message) => {
        mes = message;
    });

    return mes;
}
