import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented user password update function.
 * @param userData
 */
export async function userUpdatePasswordAjax(userData) {
    let mess;
    await Ajax.post({
        url: apiUrl.USER_UPDATE_PASSWORD,
        body: userData,
        reject: (message) => {
            console.error('User update password request api error:', message);
        },
    }).then(() => {
        mess = 'OK';
    }).catch((message) => {
        mess = message;
    });

    return mess;
}
