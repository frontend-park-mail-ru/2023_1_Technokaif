import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';
import { csrfResponse } from '@api/ApiAnswers';

/**
 * Api-oriented csrf get function.
 */
export async function csrfAjax() {
    let csrf;
    await Ajax.get({
        url: apiUrl.CSRF_REQ,
        resolve: (data) => {
            const dataObj = data as csrfResponse;
            if ('csrf' in dataObj) csrf = dataObj.csrf;
        },
        reject: (message) => {
            console.error('User csrf api error:', message);
        },
    });

    return csrf;
}
