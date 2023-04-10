import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented user update function.
 * @param id
 * @param userData
 */
export async function userUpdateAjax(id, userData) {
    let mess;
    await Ajax.post({
        url: apiUrl.USER_UPDATE_API(id),
        body: userData,
        reject: (message) => {
            console.error('User update request api error:', message);
        },
    }).then(() => {
        mess = 'OK';
    }).catch((message) => {
        mess = message;
    });

    return mess;
}
