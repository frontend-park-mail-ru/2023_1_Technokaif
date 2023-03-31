import { PATH } from '../../utils/config/urls.js';
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
        url: PATH.logout,
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
