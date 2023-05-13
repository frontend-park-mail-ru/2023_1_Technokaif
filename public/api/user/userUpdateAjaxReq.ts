import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';

interface userRequest {
    email: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    sex: string,
}

/**
 * Api-oriented user update function.
 * @param id
 * @param userData
 */
export async function userUpdateAjax(id: string, userData: userRequest) {
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
