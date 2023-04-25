import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax.ts';

/**
 * Api-oriented user update avatar function.
 * @param id
 * @param avatar
 */
export async function userUpdateAvatarAjax(id, avatar) {
    let status;
    await Ajax.post({
        url: apiUrl.USER_UPDATE_AVATAR_API(id),
        body: avatar,
        reject: (message) => {
            console.error('User update avatar request api error:', message);
        },
    }).then(() => {
        status = 'OK';
    }).catch((message) => {
        status = message;
    });

    return status;
}
