import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';
import { loginResponse } from '@api/ApiAnswers';

/**
 * Api-oriented login function.
 * @param {string} login Login argument, that wll be sent to server.
 * @param {string} password Password argument, that wll be sent to server.
 */
export async function loginAjax(login: string, password: string) {
    let mes;
    await Ajax.post({
        url: apiUrl.LOGIN,
        body: { username: login, password },
        resolve: (data) => {
            const dataObj = data as loginResponse;
            if ('id' in dataObj) localStorage.setItem('userId', dataObj.id);
            localStorage.setItem('isAuth', 'true');
        },
    }).then(() => {
        mes = 'OK';
    }).catch((message) => {
        mes = message;
    });

    return mes;
}
