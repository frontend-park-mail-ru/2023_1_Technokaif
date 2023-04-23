import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax.ts';

const logout = () => {
    localStorage.setItem('isAuth', 'false');
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
