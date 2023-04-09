import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented csrf get function.
 */
export async function csrfAjax() {
    await Ajax.get({
        url: apiUrl.CSRF_REQ,
        resolve: (data) => {
            localStorage.setItem('csrf', data.csrf);
        },
        reject: (message) => {
            console.error('User csrf api error:', message);
        },
    });
}
