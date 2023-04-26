import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax.ts';

/**
 * Api-oriented csrf get function.
 */
export async function csrfAjax() {
    let csrf;
    await Ajax.get({
        url: apiUrl.CSRF_REQ,
        resolve: (data) => {
            csrf = data.csrf;
        },
        reject: (message) => {
            console.error('User csrf api error:', message);
        },
    });

    return csrf;
}
