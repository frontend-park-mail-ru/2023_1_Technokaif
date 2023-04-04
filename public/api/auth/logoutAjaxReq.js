import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax';

const logout = () => {
    localStorage.removeItem('jwt');
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
