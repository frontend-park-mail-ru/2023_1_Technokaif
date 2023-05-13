import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';

interface registerRequest {
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    sex: string,
    birthDate: string,
    password: string,
}

/**
 * Api-oriented register function.
 * @param {json} userData User data, that wll be sent to server to check existence of account.
 */
export async function registerAjax(userData: registerRequest) {
    let mes;
    await Ajax.post({
        url: apiUrl.AUTH,
        body: userData,
    }).then(() => {
        mes = 'OK';
    }).catch((message) => {
        mes = message;
    });

    return mes;
}
