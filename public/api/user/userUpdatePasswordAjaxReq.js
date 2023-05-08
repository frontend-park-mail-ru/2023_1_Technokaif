import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';

/**
 * Api-oriented user password update function.
 * @param userData
 */
export async function userUpdatePasswordAjax(userData) {
    let msg;
    await Ajax.post({
        url: apiUrl.USER_UPDATE_PASSWORD,
        body: userData,
        reject: (message) => {
            console.error('User update password request api error:', message);
        },
    }).then(() => {
        msg = 'OK';
    }).catch((message) => {
        msg = message;
    });

    return msg;
}
