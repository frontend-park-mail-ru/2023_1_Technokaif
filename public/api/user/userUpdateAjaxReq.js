import { apiUrl } from '@config/apiUrls';
import Ajax from '../../modules/Ajax.ts';

/**
 * Api-oriented user update function.
 * @param id
 * @param userData
 */
export async function userUpdateAjax(id, userData) {
    let msg;
    await Ajax.post({
        url: apiUrl.USER_UPDATE_API(id),
        body: userData,
        reject: (message) => {
            console.error('User update request api error:', message);
        },
    }).then(() => {
        msg = 'OK';
    }).catch((message) => {
        msg = message;
    });

    return msg;
}
