import { PATH } from '../../utils/config/urls.js';
import Ajax from '../../modules/Ajax';

const logout = () => {
    localStorage.removeItem('jwt');
};

/**
 * Api-oriented logout function.
 */
export function logoutAjax() {
    let mes;
    Ajax.get({
        url: PATH.logout,
        resolve: () => {
            mes = 'OK';
            logout();
        },
        reject: (message) => {
            mes = message;
            logout();
        },
    });

    return mes;
}
