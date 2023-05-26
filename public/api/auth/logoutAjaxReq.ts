import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';

const logout = () => {
    localStorage.setItem('isAuth', 'false');
    localStorage.removeItem('userId');
};

/**
 * Api-oriented logout function.
 */
export async function logoutAjax() {
    let mes;
    await Ajax.get({
        url: apiUrl.LOGOUT,
        resolve: () => {
            logout();
        },
        reject: () => {
            logout();
        },
    }).then(() => {
        mes = 'OK';
    }).catch((message) => {
        mes = message;
    });

    return mes;
}
