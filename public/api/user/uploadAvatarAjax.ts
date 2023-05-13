import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';

/**
 * Api-oriented user update avatar function.
 * @param id
 * @param avatar
 */
export async function userUpdateAvatarAjax(id: string, avatar: FormData) {
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
