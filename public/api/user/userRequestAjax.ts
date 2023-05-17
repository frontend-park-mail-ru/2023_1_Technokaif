import { apiUrl } from '@config/apiUrls';
import Ajax from '@modules/Ajax';

/**
 * Api-oriented user function.
 * @param id
 */
export async function userAjax(id: string) {
    let profileData;
    await Ajax.get({
        url: apiUrl.USER_API(id),
        reject: (message) => {
            console.error('User request api error:', message);
        },
    }).then((data) => {
        profileData = data;
    });

    return profileData;
}
