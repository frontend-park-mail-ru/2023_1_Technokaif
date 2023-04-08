import { apiUrl } from '../../utils/config/apiUrls.js';
import Ajax from '../../modules/Ajax';

/**
 * Api-oriented user function.
 * @param id
 */
export async function userAjax(id) {
    let profileData;
    await Ajax.get({
        url: apiUrl.USER_API(id),
        reject: (message) => {
            console.error('Artist request api error:', message);
        },
    }).then((data) => {
        profileData = data;
    });

    return profileData;
}
