import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax.ts';

/**
 * Api-oriented check state function.
 */
export async function checkAuthAjax() {
    let value;
    await Ajax.get({
        url: apiUrl.CHECK_AUTH,
        reject: (message) => {
            console.error('Check api auth error:', message);
        },
    }).then((data) => {
        value = data.auth;
    });

    return value;
}
