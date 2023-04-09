import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented user update avatar function.
 * @param id
 * @param avatar
 */
export async function userUpdateAvatarAjax(id, avatar) {
    let mess;
    await Ajax.post({
        url: apiUrl.USER_UPDATE_AVATAR_API(id),
        body: avatar,
        reject: (message) => {
            console.error('User update avatar request api error:', message);
        },
    }).then(() => {
        mess = 'OK';
    }).catch((message) => {
        mess = message;
    });

    return mess;
}
